import json
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from django.core.serializers import serialize
import urllib.parse
import requests

from ad_advertiser.models.site.site import siteModel
from ad_advertiser.models.ad.ad_audience import ad_audienceModel
from ad_advertiser.models.ad.ad_banner import ad_bannerModel

from datetime import datetime, timedelta
import random
from rest_framework import status

from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.db.models import Prefetch

from .permissions import isValidToken
from .serializers import *

from a_setting.settings.base import *

from account.models.action import actionModel
from account.models.account import accountModel, walletModel, walletOperationsModel
from account.models.social_network import social_networkModel
from account.models.verification import verificationModel
from account.models.social_network import social_networkModel
from ad_advertiser.models.ad.ad_company import ad_companyModel, ad_statusModel
from ad_advertiser.models.profile.profile import profileModel
from .models import tokenModel

from a_module.scripts.sigmasms_voice_api import send_smsDef
import random
import secrets


def normalize_phone_number(pNumber: str) -> str | None:
    pNumber = pNumber.strip()
    if pNumber.startswith('8') or pNumber.startswith('7'):
        pNumber = '+7' + pNumber[1:]
        return pNumber
    elif pNumber.startswith('+'):
        return pNumber
    else:
        return None
    

class check_api(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'status': 'ok'})
    
# class social_networkModel(models.Model):

#     SOCIAL_NETWORK_CHOICES = (
#         ('vk', 'ВК'),
#         ('yandex', 'Яндекс'),
#         ('google', 'Google'),
#         ('telegram', 'Telegram'),
#         ('public_services', 'Госуслуги'),
#         ('classmates', 'Одноклассники'),
#         ('my_world', 'Мой мир'),
#     )

#     # Аккаунт
#     account = models.ForeignKey(accountModel, on_delete=models.CASCADE)

#     date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
#     social_network = models.CharField('Соцсеть', max_length=20, choices=SOCIAL_NETWORK_CHOICES)
#     token = models.CharField('Токен', max_length=255)

#     def __str__(self):
#         return str(self.pk) +', '+ self.social_network

#     class Meta:
#         verbose_name = 'Подключенная соцсеть'
#         verbose_name_plural = 'Подключенные соцсети'


class verifyAPIViews(APIView):
    """
    Параметры:
    - `phone_number` (строка): Номер телефона пользователя.
    - `type` (строка): Тип запроса (возможные значения: "register", "login").
    - `login` (строка): Уникальный логин (Указывается в случае type=register)
    - `firstname` (строка): Имя пользователя (Указывается в случае type=register)

    Отправит код, в случае type=register создаст запись в accountModel
    """
    def post(self, request, *args, **kwargs):
        # Получаю данные
        phone_number = request.data.get('phone_number', '')
        phone_number = normalize_phone_number(str(phone_number))
        type = request.data.get('type', '')


        # Проверка
        if phone_number is None:
            return Response({'error': 'Invalid phone number.'}, status=status.HTTP_400_BAD_REQUEST)
        if not phone_number or not type:
            return Response({'error': 'Phone number and request type are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if type not in ['register', 'login']:
            return Response({'error': 'Invalid request type.'}, status=status.HTTP_400_BAD_REQUEST)


        if type == 'register':
            # Получение доп данных для регистрации
            firstname = request.data.get('firstname', '')
            login = request.data.get('login', '')

            # Проверка
            if not firstname or not login:
                return Response({'error': 'Firstname and login are required.'}, status=status.HTTP_400_BAD_REQUEST)
            if accountModel.objects.filter(login=login).exists():
                return Response({'error': 'User with this login already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            if accountModel.objects.filter(phone_number=phone_number).exists():
                return Response({'error': 'User with this phone number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                # Создаю аккаунт
                account = accountModel(login=login, name_first=firstname, phone_number=phone_number)
                account.save()

                # Отправляю код
                code = str(random.randint(100000, 999999))
                verify_code = verificationModel(account=account, code_verification=code)
                verify_code.save()
                send_smsDef(recipient=phone_number, verify_code=code)

                data = {
                    'status': 'success', 
                    'user_id': account.id
                }
            except Exception as ex:
                return Response({'error': f'{ex}'}, status=status.HTTP_400_BAD_REQUEST)


        elif type == 'login':
            try:
                account_instance = accountModel.objects.get(phone_number=phone_number)
            except accountModel.DoesNotExist:
                return Response({'error': f'User with phonenumber {phone_number} not found'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                code = str(random.randint(100000, 999999))
                verify_code = verificationModel(account=account_instance, code_verification=code)
                verify_code.save()
                answer = send_smsDef(recipient=phone_number, verify_code=code)
            except Exception as ex:
                return Response({'error': f'{ex}'}, status=status.HTTP_400_BAD_REQUEST)

            data = {
                'status': 'success', 
                'user_id': account_instance.id
            }

        return Response(data, status=status.HTTP_200_OK)
    
class vk_authAPIViews(APIView):
    def post(self, request):
        debug = True  # Переменная для включения режима отладки

        code = request.data.get('code', '')
        if not code:
            return Response({'error': 'code is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if debug:
            print("1-----------------------------------------------------------\nCode received:", code)

        # Параметры для URL
        params = {
            "client_id": VK_CLIENT_ID,
            "client_secret": VK_SECRET_KEY,
            "redirect_uri": VK_REDIRECT,
            "code": code
        }

        # URL для запроса
        url = "https://oauth.vk.com/access_token"

        try:
            # Отправка GET-запроса
            response = requests.get(url, params=params)
            response.raise_for_status()  # Проверка на ошибки HTTP

            if debug:
                print("2------------------------------------------------\nAccess token response:", response.json())

            token_data = response.json()
        except requests.RequestException as e:
            print("[1]--------------------------Error during access token request:", e)
            return Response({'error': 'Failed to get access token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            user_id = token_data['user_id']
            access_token = token_data['access_token']
            email = token_data.get('email')  # Email может отсутствовать

            if debug:
                print("3------------------------------------------------\nToken data:")
                print("User ID:", user_id)
                print("Access Token:", access_token)
                print("Email:", email if email else "No email")

            vk_api_url = "https://api.vk.com/method/users.get"
            params = {
                "user_ids": user_id,
                "access_token": access_token,
                "fields": "photo_200",
                "v": "5.199"
            }
            
            api_response = requests.get(vk_api_url, params=params)
            api_response.raise_for_status()  # Проверка на ошибки HTTP
            user_data = api_response.json()

            if debug:
                print("4------------------------------------------------\nVK API response:", user_data)

            first_name = user_data['response'][0]['first_name']
            last_name = user_data['response'][0]['last_name']
            photo = user_data['response'][0]['photo_200']

        except requests.RequestException as e:
            print("[2]-------------------------------------Error during VK API request:", e)
            return Response({'error': 'Failed to get user data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except (KeyError, IndexError) as e:
            print("[3]---------------------------------------Error parsing VK API response:", e)
            return Response({'error': 'Invalid data received from VK API'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # Проверка существования социального аккаунта
            t_social_account = social_networkModel.objects.filter(vk_id=user_id)
            if debug:
                print("5-----------------------------------------------\nSocial account:",
                      t_social_account, t_social_account.exists(), t_social_account.first(), access_token)
            if t_social_account.exists():
                # Получение аккаунта
                account = t_social_account.first().account
                if debug:
                    print("6-----------------------------------------------------------\nSocial account exists:", account)

                # Создание токена и ответ
                token = str(secrets.token_hex(32))
                tokenModel(account=account, token=token).save()
                response_data = {
                    'status': 'success',
                    'user_id': account.id,
                    'token': token,
                    'name': account.name_first + ' ' + account.name_last,
                    'avatar': account.avatar,
                    'isBlogger': account.isBlogger
                }
            else:
                # Создание нового аккаунта
                
                # Устанавка аватара локально
                
                
                account = accountModel.objects.create(
                    name_first=first_name,
                    name_last=last_name,
                    avatar=photo
                )
                if debug:
                    print("7---------------------------------------------------------\nCreated new account:", account)

                account.save()
                social_networkModel.objects.create(
                    token=access_token,
                    account=account,
                    social_network=social_networkModel.SOCIAL_NETWORK_CHOICES[0][0],
                    vk_id=user_id
                )
                token = str(secrets.token_hex(32))
                tokenModel(account=account, token=token).save()
                response_data = {
                    'status': 'success',
                    'user_id': account.id,
                    'token': token,
                    'name': account.name_first + ' ' + account.name_last,
                    'avatar': account.avatar,
                    'isBlogger': account.isBlogger
                }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            print("[4]---------------------------------------Error processing or creating account:", e)
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class yandex_authAPIViews(APIView):
    def post(self, request):
        debug = True
        code = request.data.get('code', '')
        if not code:
            return Response({'error': 'code is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if debug:
            print("Yandex code:", code)
        
        yandex_api_url = "https://oauth.yandex.ru/token"
        params = {
            "grant_type": "authorization_code",
            "code": code,
            "client_id": YANDEX_CLIENT_ID,
            "client_secret": YANDEX_SECRET_KEY
        }
        
        try:
            api_response = requests.post(yandex_api_url, data=params)
            #create request with form data
            
            api_response.raise_for_status()  # Проверка на ошибки HTTP
            token_data = api_response.json()
            
            if debug:
                print("0------------------------------------------------\nYandex API response:", api_response)
            
            access_token = token_data['access_token']
            
            if debug:
                print("1------------------------------------------------\nYandex API response:", token_data)
                
            yandex_api_url = "https://login.yandex.ru/info"
            params = {
                "format": "json",
                "oauth_token": access_token
            }
            
            api_response = requests.get(yandex_api_url, params=params)
            api_response.raise_for_status()  # Проверка на ошибки HTTP
            user_data = api_response.json()
            
            if debug:
                print("2------------------------------------------------\nYandex API response:", user_data, api_response)
                
            user_id = user_data['id']
            first_name = user_data['first_name']
            last_name = user_data['last_name']
            photo = user_data['default_avatar_id']
            avatar = f"https://avatars.yandex.net/get-yapic/{photo}/islands-200"
            phone = user_data['default_phone'].get('number', '')
            login = user_data['login']
            
            if debug:
                print("3------------------------------------------------\nYandex API response:", user_id, first_name, last_name, avatar, phone, login)
                
        except Exception as e:
            print("[2]---------------------------------------Error parsing Yandex API response:", e)
            return Response({'error': 'Invalid data received from Yandex API'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Проверка существования социального аккаунта
        # Replace 'social_account' with the appropriate model name
        t_social_account = social_networkModel.objects.filter(ya_id=user_id)
        if t_social_account.exists():
            # Social account exists
            # Получение аккаунта
            account = t_social_account.first().account
            if debug:
                print("3-----------------------------------------------------------\nSocial account exists:", account)

            # Создание токена и ответ
            token = str(secrets.token_hex(32))
            tokenModel(account=account, token=token).save()
            #get or create wallet
            walletModel.objects.get_or_create(account=account)
            response_data = {
                'status': 'success',
                'user_id': account.id,
                'token': token,
                'name': account.name_first + ' ' + account.name_last,
                'avatar': account.avatar,
                'isBlogger': account.isBlogger
            }
        else:
            # Создание нового аккаунта
                
            # Устанавка аватара локально
            
            
            account = accountModel.objects.create(
                name_first=first_name,
                name_last=last_name,
                avatar=avatar,
                login=login,
                phone_number=phone
            )
            if debug:
                print("7---------------------------------------------------------\nCreated new account:", account)

            account.save()
            social_networkModel.objects.create(
                token=access_token,
                account=account,
                social_network=social_networkModel.SOCIAL_NETWORK_CHOICES[0][0],
                ya_id=user_id
            )
            token = str(secrets.token_hex(32))
            tokenModel(account=account, token=token).save()
            walletModel.objects.create(account=account)
            response_data = {
                'status': 'success',
                'user_id': account.id,
                'token': token,
                'name': account.name_first + ' ' + account.name_last,
                'avatar': account.avatar,
                'isBlogger': account.isBlogger
            }

        return Response(response_data, status=status.HTTP_200_OK)
    

class verify_codeAPIViews(APIView):
    """
    Параметры:
    - `user_id` (целое число): ID пользователя.
    - `code` (строка): Код подтверждения.

    Сверит код, создаст токен
    """
    def post(self, request):
        # Получение данных
        user_id = request.data.get('user_id', '')
        verify_code = request.data.get('code', '')


        # Проверки 
        if not user_id or not verify_code:
            return Response({'error': 'user_id and code are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        current_account = accountModel.objects.filter(id=int(user_id))
        if not current_account.exists():
            return Response({'error': 'User with this id not found.'}, status=status.HTTP_400_BAD_REQUEST)
        
        current_verification = verificationModel.objects.filter(account=current_account.first())
        if not current_verification.exists():
            return Response({'error': 'Verification code was not sent.'}, status=status.HTTP_400_BAD_REQUEST)
        
        saved_code = current_verification.last().code_verification


        # id: 1,
		# name: 'Test User',
		# avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
		# permission: {
		# 	id: 0,
		# 	name: 'Просмотр',
		# } as IPermission,
		# nick: '@testuser',
		# isBlogger: false,

        # Проверка кода верификации
        if str(verify_code) == str(saved_code):
            # Создание токена и его сохранение
            token = str(secrets.token_hex(8))
            tokenModel(account=current_account.first(), token=token).save()
            data = {
                'status': 'success',
                'token': token,
                'user_id': current_account.first().id,
                'name': current_account.first().name_first + ' ' + current_account.first().name_last,
                'avatar': current_account.first().avatar,
                # 'permission': current_account.first().permission,
                'nick': current_account.first().login,
                'isBlogger': current_account.first().isBlogger,
            }
        else:
            return Response({'error': 'Invalid code.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(data, status=status.HTTP_200_OK)
    

class check_tokenAPIViews(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'status': 'ok', 'user_id': current_token.first().account.id}, status=status.HTTP_200_OK)


# all private data can be accessed by user token
# get ad_companyModel (private POST)
class getCompaniesAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        companies = list(ad_companyModel.objects.filter(account=user.id).values())
        
        #create one object with all data
        for company in companies:
            site = siteModel.objects.filter(id=company["site_id"])
            if not site.exists():
                return Response({'error': 'site not found.'}, status=status.HTTP_400_BAD_REQUEST)

            site = site.first()
            
            #JSON serialization
            company["site"] = {}
            company["site"]["id"] = site.id
            company["site"]["domain"] = site.domain
            company["site"]["date_creation"] = site.date_creation
            
            # ad_statusModel and ad_companyModel many-to-many relation. Get all ad_statusModel objects for this company
            company["ad_status"] = list(ad_statusModel.objects.filter(companies=company["id"]).values())
        
            print(companies, user, site)
        return Response(companies, status=status.HTTP_200_OK)
    

# get balance (private POST)
class getBalanceAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        balance = walletModel.objects.filter(account=user.id).first().balance
        currency = walletModel.objects.filter(account=user.id).first().currency_sign
        return Response({'balance': balance, 'currency': currency, 'status': 'ok'}, status=status.HTTP_200_OK)

# get wallet operations (private POST)
class getWalletOperationsAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        wallet = walletModel.objects.filter(account=user.id).first()
        operations = list(walletOperationsModel.objects.filter(wallet=wallet).values())
        return Response(operations, status=status.HTTP_200_OK)

class AddCompany(APIView):

    def post(self, request):
        # Debug mode
        debug = True

        # Debug data
        debug_data = {
            'company_name': ['Test Company 1', 'Test Company 2'],
            'site_domain': ['google.com', 'yandex.ru'],
            'phrase_plus': ['keyword1', 'keyword2'],
            'phrase_minus': ['phrase1', 'phrase2'],
            'auditor_name': ['Auditoria 1', 'Auditoria 2'],
            'geography': ['Russia', 'USA'],
            'device': ['mobile', 'PC'],
            'banner_name': ['Banner 1', 'Banner 2'],
            'banner_link': ['http://example.com', 'http://example2.com'],
        }

        # Get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        # Extracting and parsing data from request
        try:
            company_data = json.loads(request.data.get('Company', '{}'))
            auditor_data = json.loads(request.data.get('Auditor', '{}'))
            banner_data = json.loads(request.data.get('Banner', '{}'))
        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON data.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve or create the site
        site, _ = siteModel.objects.get_or_create(
            domain=company_data.get('cLink', random.choice(debug_data['site_domain']) if debug else '')
        )
        
        #Create random data_start

        # Generate random data_start
        data_start_temp = datetime.now() - timedelta(days=random.randint(1, 30))
        
        # Generate random data_end
        data_end_temp = data_start_temp + timedelta(days=random.randint(1, 30))
        
        #status text random variants
        status_text_temp = ["Активная", "На модерации", "Отклонена", "Завершена"]

        # Create ad_company
        company = ad_companyModel.objects.create(
            name=company_data.get('cName', random.choice(debug_data['company_name']) if debug else ''),
            site=site,
            date_start=parse_datetime(company_data.get('cDateStart', '')) if company_data.get('cDateStart', '') else data_start_temp,
            date_finish=parse_datetime(company_data.get('cDateEnd', '')) if company_data.get('cDateEnd', '') else data_end_temp,
            budget_week=int(company_data.get('cWeekBudget', 0)),
            channel_taboo=company_data.get('cSettingsLink', []),
            phrase_plus=company_data.get('cKeyWord', []),
            phrase_minus=company_data.get('cKeyWordDel', []),
            status_text=random.choice(status_text_temp),  # Assuming a default or empty status text
            views=0,  # Assuming default views count
            account=current_token.first().account,  # Assuming account is linked with token
        )

        # Create ad_audience
        audience = ad_audienceModel.objects.create(
            name=auditor_data.get('aName', random.choice(debug_data['auditor_name']) if debug else ''),
            site=site,
            ad_company=company,
            geography=auditor_data.get('aGeography', []),
            category=auditor_data.get('aFavor', []),
            interest=[],
            gender_age=auditor_data.get('aGenderNAge', []),
            device=auditor_data.get('aDevice', []),
            solvency=[],
            account=current_token.first().account,  # Assuming account is linked with token
        )

        # Create ad_banner
        banner = ad_bannerModel.objects.create(
            account=current_token.first().account,  # Assuming account is linked with token
            site=site,
            ad_company=company,
            ad_audience=audience,
            name=banner_data.get('bName', random.choice(debug_data['banner_name']) if debug else ''),
            link=banner_data.get('bLink', random.choice(debug_data['banner_link']) if debug else ''),
            title_option=[],  # Assuming title options are not provided in your data
            description_option=banner_data.get('bOptionDescText', []),
            image_option=[],
            video_option=[],
            audio_option=[],
            channel_private_bool=banner_data.get('bUnvirfied', True if debug else False)
        )

        return Response({'message': 'Company, Auditor, and Banner created successfully!'}, status=status.HTTP_201_CREATED)
    
class GetAudience(APIView):

    def get(self, request):
        token = request.GET.get('token', '')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token).first()
        if not current_token:
            return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        audiences = ad_audienceModel.objects.filter(account=current_token.account)
        audience_data = [{'name': audience.name, 'geography': audience.geography, 'device': audience.device} for audience in audiences]

        return Response({'audiences': audience_data}, status=status.HTTP_200_OK)

class GetBanners(APIView):

    def get(self, request):
        token = request.GET.get('token', '')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token).first()
        if not current_token:
            return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        banners = ad_bannerModel.objects.filter(account=current_token.account)
        banner_data = [{'name': banner.name, 'link': banner.link, 'title_option': banner.title_option} for banner in banners]

        return Response({'banners': banner_data}, status=status.HTTP_200_OK)

class GetSites(APIView):

    def get(self, request):
        token = request.GET.get('token', '')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token).first()
        if not current_token:
            return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch related banners and companies
        banners = ad_bannerModel.objects.filter(account=current_token.account)
        companies = ad_companyModel.objects.filter(account=current_token.account)

        # Extract unique site ids from banners and companies
        site_ids = set(banners.values_list('site', flat=True)) | set(companies.values_list('site', flat=True))

        # Fetch unique sites by ids and prefetch related companies
        unique_sites = siteModel.objects.filter(id__in=site_ids).distinct().prefetch_related(
            Prefetch('ad_companyModel_siteModel', queryset=companies, to_attr='related_companies')
        )

        # Construct site data with associated companies
        site_data = []
        for site in unique_sites:
            site_companies = [{
                'id': company.id,
                'name': company.name,
                'date_start': company.date_start,
                'date_finish': company.date_finish,
                'status_text': company.status_text,
                # Include other company fields as needed
            } for company in getattr(site, 'related_companies', [])]

            site_data.append({
                'id': site.id,
                'domain': site.domain,
                'date_creation': site.date_creation,
                'companies': site_companies
            })

        return Response({'sites': site_data}, status=status.HTTP_200_OK)

