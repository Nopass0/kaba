import base64
import json
import string
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from django.core.serializers import serialize
import urllib.parse
import requests

from ad_advertiser.models.site.site import siteModel
from ad_advertiser.models.ad.ad_audience import ad_audienceModel
from ad_advertiser.models.ad.ad_banner import BannderImage, ad_bannerModel

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
from account.models.account import accountModel, jumpToADPage, jumpsToMaskedLink, walletModel, walletOperationsModel
from account.models.social_network import social_networkModel
from account.models.verification import verificationModel
from account.models.social_network import social_networkModel
from ad_advertiser.models.ad.ad_company import ad_bloggerCompanyModel, ad_companyModel, ad_statusModel
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
            walletModel.objects.create(account=account).save()
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
            company["site"]["shows"] = site.shows
            company["site"]["masked_domain"] = site.masked_domain
            
            # ad_statusModel and ad_companyModel many-to-many relation. Get all ad_statusModel objects for this company
            company["ad_status"] = list(ad_statusModel.objects.filter(companies=company["id"]).values())
            
            # ad_audienceModel and ad_companyModel many-to-many relation. Get all ad_audienceModel objects for this company
            company["ad_audience"] = list(ad_audienceModel.objects.filter(ad_company=company["id"]).values())
            
            # ad_bannerModel and ad_companyModel many-to-many relation. Get all ad_bannerModel objects for this company
            company["ad_banner"] = list(ad_bannerModel.objects.filter(ad_company=company["id"]).values())
        
            # print(companies, user, site)
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
        walletModel.objects.get_or_create(account=user)
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

from django.db import transaction
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
import json
from datetime import datetime, timedelta
import random
from django.utils.dateparse import parse_datetime

class AddCompany(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            # Token validation
            token = request.data.get('token', '')
            if not token:
                return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            current_token = tokenModel.objects.filter(token=token).select_related('account')
            if not current_token.exists():
                return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
            account = current_token.first().account

            # Parsing data
            try:
                company_data = json.loads(request.data.get('Company', '{}'))
                auditor_data = json.loads(request.data.get('Auditor', '{}'))
                banner_data = json.loads(request.data.get('Banner', '{}'))
            except json.JSONDecodeError:
                return Response({'error': 'Invalid JSON data.'}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve or create the site
            domain = company_data.get('cLink', '')
            price_target = company_data.get('cTarget', 0)
            ban_show = company_data.get('cBanShow', []) if company_data.get('cBanShow', []) else []
            site, _ = siteModel.objects.get_or_create(domain=domain)

            print("1-----------------------------------------------------------------------------------------------")

            # Create ad_company
            company = ad_companyModel.objects.create(
                name=company_data.get('cName', ''),
                site=site,
                # date_start=parse_datetime(company_data.get('cDateStart', '')) if company_data.get('cDateStart', '') else None,
                # date_finish=parse_datetime(company_data.get('cDateEnd', '')) if company_data.get('cDateEnd', '') else None,
                date_start=datetime.strptime(company_data.get('cDateStart', ''), '%d.%m.%Y') if company_data.get('cDateStart', '') else None,
                date_finish=datetime.strptime(company_data.get('cDateEnd', ''), '%d.%m.%Y') if company_data.get('cDateEnd', '') else None,
                price_target = price_target,
                ban_show = ban_show,
                budget_week=int(company_data.get('cWeekBudget', 0)),
                channel_taboo=company_data.get('cSettingsLink', []) if company_data.get('cSettingsLink', []) else [],
                phrase_plus=company_data.get('cKeyWord', []) if company_data.get('cKeyWord', []) else [],
                phrase_minus=company_data.get('cKeyWordDel', []) if company_data.get('cKeyWordDel', []) else [],
                status_text='На модерации',
                views=0,
                account=account,
            )
            
            print("2-----------------------------------------------------------------------------------------------")
            

            # Create ad_audience
            audience = ad_audienceModel.objects.create(
                name=auditor_data.get('aName', ''),
                site=site,
                ad_company=company,
                geography=auditor_data.get('aGeography', []),
                category=auditor_data.get('aFavor', []),
                interest=[],
                gender_age=auditor_data.get('aGenderNAge', []),
                device=auditor_data.get('aDevice', []),
                solvency=[],
                account=account,
            )

            print("3-----------------------------------------------------------------------------------------------")


            # Create ad_banner
            banner = ad_bannerModel.objects.create(
                account=account,
                site=site,
                ad_company=company,
                ad_audience=audience,
                name=banner_data.get('bName', ''),
                link=banner_data.get('bLink', ''),
                # title_option=banner_data.get('bOptionTitle', []),
                description_option=banner_data.get('bOptionDescText', []),
                video_option=[],
                audio_option=[],
                channel_private_bool=banner_data.get('bUnvirfied', True)
            )

            print("4-----------------------------------------------------------------------------------------------")


            # Handling multiple file (Image) uploads for Banner
            files = request.FILES.getlist('bImages')  # Get the list of files
            for file in files:
                file_name = default_storage.save(f'banner_images/{file.name}', ContentFile(file.read()))
                file_url = default_storage.url(file_name)
                
                # Create BannerImage instance for each image
                BannderImage.objects.create(
                    banner=banner,
                    image=file_url
                )

            return Response({'message': 'Company, Auditor, Banner, and Banner Images created successfully!'}, status=status.HTTP_201_CREATED)


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

class depositAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = current_token.first().account
        currency = walletModel.objects.filter(account=user.id).first().currency_sign
        
        pay_amount = request.data.get('pay_amount', '')
        if not pay_amount:
            return Response({'error': 'pay_amount is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        pay_amount = float(pay_amount)
        
        clientId = user.id
        service_name = "Пополнение баланса"
        
        data = {
            "clientId": str(clientId),
            "service_name": service_name,
            "pay_amount": str(pay_amount),
            "token": ""
        }
        
        url = PAYKEEPER_URL + "/change/invoice/preview/"
        
        #base64 encoded login and password (login:password) for basic auth
        encoded_login = base64.b64encode(bytes(PAYKEEPER_LOGIN + ":" + PAYKEEPER_PASSWORD, "utf-8")).decode("utf-8")
        print(encoded_login, "Encoded login")
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + encoded_login
        }
        
        token_paykeeper = ""
        
        #get token using only headers
        response = requests.post(PAYKEEPER_URL + "/info/settings/token/", headers=headers)
        if response.status_code == 200:
            print(response.json())
            token_paykeeper = response.json()["token"]
            data["token"] = str(token_paykeeper)

        #check token
        if token_paykeeper == "":
            return Response({'error': 'paykeeper token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        invoice_id = ""
        invoice_url = ""
        print(token_paykeeper, "Token paykeeper")
        
        #response to url by using token in body, and headers applyed
        # data = json.dumps(data)
        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            print(response.json(), "Data:", data)
            invoice_id = response.json()["invoice_id"]
            invoice_url = response.json()["invoice_url"]
        
        if invoice_id == "":
            return Response({'error': 'paykeeper invoice id is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if invoice_url == "":
            return Response({'error': 'paykeeper invoice url is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        wallet = walletModel.objects.filter(account=user.id).first()
        walletOperationsModel.objects.create(
            wallet=wallet,
            balance=pay_amount,
            invoice_id=invoice_id,
            isConfirm=False
        )
        
        return Response({'url': invoice_url, 'invoice_id': invoice_id, 'status': 'ok'}, status=status.HTTP_200_OK)
    
class depositApplyAPIViews(APIView):
    def post(self, request):
        # Получение пользователя по токену
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = current_token.first().account
        currency = walletModel.objects.filter(account=user.id).first().currency_sign
        
        invoice_id = request.data.get('invoice_id', '')
        
        if not invoice_id:
            return Response({'error': 'invoice_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        wallet = walletModel.objects.filter(account=user.id).first()
        
        print("Start invoice_id", invoice_id)
        
        # Кодированные логин и пароль для базовой аутентификации
        encoded_login = base64.b64encode(bytes(PAYKEEPER_LOGIN + ":" + PAYKEEPER_PASSWORD, "utf-8")).decode("utf-8")
        
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + encoded_login
        }
        
        token_paykeeper = ""
        
        body_data = {
            "token": token_paykeeper,
            "id": invoice_id
        }
        print(body_data, "body_data")
        
        # Получение токена используя только заголовки
        response = requests.get(PAYKEEPER_URL + "/info/settings/token/", headers=headers)
        if response.status_code == 200:
            token_paykeeper = response.json()["token"]
            body_data = {
                "token": token_paykeeper
            }
        
        # Проверка токена
        if token_paykeeper == "":
            return Response({'error': 'paykeeper token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        operation = walletOperationsModel.objects.filter(invoice_id=invoice_id, wallet=wallet).first()
        
        # Если операция уже была подтверждена, возвращаем статус ok
        if operation.isConfirm:
            return Response({'status': 'ok'}, status=status.HTTP_200_OK)
        
        url = PAYKEEPER_URL + "/info/invoice/byid/?id=" + invoice_id
        print(url)
        
        response = requests.get(url, headers=headers, json=body_data, data=body_data)
        if response.status_code == 200:
            print(response.json())
            if response.json()["status"] == "paid":
                isConfirm = True
            else:
                isConfirm = False
        
        if not isConfirm:
            return Response({'error': 'paykeeper error.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Пополнение баланса происходит только если операция не была подтверждена ранее.
        if not operation.isConfirm:
            wallet.balance += operation.balance
            wallet.save()
        
            operation.isConfirm = True
            operation.operationType = '+'
            operation.operation = 'Пополнение'
            operation.save()
        
        return Response({'status': 'ok'}, status=status.HTTP_200_OK)

class WalletOperationsView(APIView):
    def get(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Получение данных пользователя по токену (замените следующую строку своей логикой получения пользователя)
        current_token = tokenModel.objects.filter(token=token)
        user = current_token.first().account # Реализуйте функцию get_user_by_token(token)
        if user is None:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        wallet = walletModel.objects.filter(account=user).first()
        if not wallet:
            return Response({'error': 'Wallet not found.'}, status=status.HTTP_404_NOT_FOUND)

        operations = walletOperationsModel.objects.filter(wallet=wallet)
        
        # Формируем список операций для ответа
        operations_list = []
        for operation in operations:
            operation_data = {
                'date_creation': operation.date_creation,
                'balance': operation.balance,
                'currency_sign': operation.currency_sign,
                'operation': operation.operation,
                'operationType': operation.operationType,
                'invoice_id': operation.invoice_id,
                'isConfirm': operation.isConfirm
            }
            operations_list.append(operation_data)
        
        return Response({'operations': operations_list}, status=status.HTTP_200_OK)
    
    
class getAllActiveCompanies(APIView):

    def get(self, request):
        # Get the token from the request
        token = request.GET.get('token', '')
        user = None
        if token:
            try:
                user = tokenModel.objects.get(token=token).account
            except tokenModel.DoesNotExist:
                # If token is provided but invalid, return an error
                return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

        # Fetch all active companies, filter by user if user is not None
        if user:
            user_companies = ad_companyModel.objects.filter(account=user).values_list('id', flat=True)
            active_companies = ad_companyModel.objects.exclude(id__in=user_companies)
        else:
            active_companies = ad_companyModel.objects.all()

        active_companies = active_companies.filter(
            status_text='Активная'
        ).prefetch_related(
            Prefetch('ad_bannerModel_ad_companyModel', queryset=ad_bannerModel.objects.prefetch_related('banner_image')),
            'ad_audienceModel_ad_companyModel',
            'ad_statusModel_companies',
        ).select_related('site')
        #active_companies = active_companies.select_related('site')
        
        
        
        # Construct the response data
        companies_data = []
        for company in active_companies:
            company_info = {
                'id': company.id,
                'name': company.name,
                'date_start': company.date_start,
                'date_finish': company.date_finish,
                'status_text': company.status_text,
                'budget_week': company.budget_week,
                'views': company.views,
                'site': {
                    'id': company.site.id if company.site else None,
                    'domain': company.site.domain if company.site else '',
                    'date_creation': company.site.date_creation if company.site else None,
                    'masked_domain': company.site.masked_domain if company.site else '',
                    'shows': company.site.shows if company.site else 0,
                },
                'banners': [
                    {
                        'id': banner.id,
                        'name': banner.name,
                        'link': banner.link,
                        'title_option': banner.title_option,
                        'description_option': banner.description_option,
                        'image_option': banner.image_option,
                        'video_option': banner.video_option,
                        'audio_option': banner.audio_option,
                        'channel_private_bool': banner.channel_private_bool,
                        'images': [image.image.url for image in banner.banner_image.all()]  # Don't work
                    } for banner in company.ad_bannerModel_ad_companyModel.all()
                ],
                'audiences': [
                    {
                        'id': audience.id,
                        'name': audience.name,
                        'geography': audience.geography,
                        'category': audience.category,
                        'interest': audience.interest,
                        'gender_age': audience.gender_age,
                        'device': audience.device,
                        'solvency': audience.solvency,
                    } for audience in company.ad_audienceModel_ad_companyModel.all()
                ],
                'statuses': [
                    {
                        'id': status.id,
                        'status': status.status,
                        'text': status.text,
                    } for status in company.ad_statusModel_companies.all()
                ]
            }
            companies_data.append(company_info)

        return Response({'companies': companies_data}, status=status.HTTP_200_OK)


class addCompanyToBlogger(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = tokenModel.objects.get(token=token).account
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

        company_id = request.data.get('company_id', '')
        if not company_id:
            return Response({'error': 'company_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            company = ad_companyModel.objects.get(id=company_id)
        except ad_companyModel.DoesNotExist:
            return Response({'error': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the company is already associated with the user
        if company.account != user:
            return Response({'error': 'The company is not associated with the user.'}, status=status.HTTP_403_FORBIDDEN)

        # If you need to perform any action when a user selects a company, do it here
        # For example, you might want to mark the company as selected by the user in some way

        return Response({'status': 'ok'}, status=status.HTTP_200_OK)


    
class getCompanyBloggers(APIView):
    def post(self, request):
        token = request.GET.get('token', '')
        user = None
        if token:
            try:
                user = tokenModel.objects.get(token=token).account
            except tokenModel.DoesNotExist:
                # If token is provided but invalid, return an error
                return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

        # Fetch all active companies, filter by user if user is not None
        if user:
            # user_companies = ad_companyModel.objects.filter(account=user).values_list('id', flat=True)
            active_companies = ad_companyModel.objects.all()
        else:
            active_companies = ad_companyModel.objects.all()

        active_companies = active_companies.filter(
            status_text='Активная'
        ).prefetch_related(
            Prefetch('ad_bannerModel_ad_companyModel', queryset=ad_bannerModel.objects.prefetch_related('banner_image')),
            'ad_audienceModel_ad_companyModel',
            'ad_statusModel_companies',
        ).select_related('site')
        #active_companies = active_companies.select_related('site')
        
        
        
        # Construct the response data
        companies_data = []
        for company in active_companies:
            if not ad_bloggerCompanyModel.objects.filter(company=company).exists():
                continue
            company_info = {
                'id': company.id,
                'name': company.name,
                'date_start': company.date_start,
                'date_finish': company.date_finish,
                'status_text': company.status_text,
                'budget_week': company.budget_week,
                'views': company.views,
                'price_target': company.price_target,
                'ban_show': company.ban_show,
                'site': {
                    'id': company.site.id if company.site else None,
                    'domain': company.site.domain if company.site else '',
                    'date_creation': company.site.date_creation if company.site else None,
                    'masked_domain': company.site.masked_domain if company.site else '',
                    'shows': company.site.shows if company.site else 0,
                },
                'banners': [
                    {
                        'id': banner.id,
                        'name': banner.name,
                        'link': banner.link,
                        'title_option': banner.title_option,
                        'description_option': banner.description_option,
                        'image_option': banner.image_option,
                        'video_option': banner.video_option,
                        'audio_option': banner.audio_option,
                        'channel_private_bool': banner.channel_private_bool,
                        'images': [image.image.url for image in banner.banner_image.all()]  # Don't work
                    } for banner in company.ad_bannerModel_ad_companyModel.all()
                ],
                'audiences': [
                    {
                        'id': audience.id,
                        'name': audience.name,
                        'geography': audience.geography,
                        'category': audience.category,
                        'interest': audience.interest,
                        'gender_age': audience.gender_age,
                        'device': audience.device,
                        'solvency': audience.solvency,
                    } for audience in company.ad_audienceModel_ad_companyModel.all()
                ],
                'statuses': [
                    {
                        'id': status.id,
                        'status': status.status,
                        'text': status.text,
                    } for status in company.ad_statusModel_companies.all()
                ]
            }
            companies_data.append(company_info)

        return Response({'companies': companies_data}, status=status.HTTP_200_OK)
    
    
# class jumpToADPage(models.Model):
#     date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
#     account = models.ForeignKey('accountModel', on_delete=models.CASCADE)
#     site = models.ForeignKey('siteModel', on_delete=models.CASCADE)
    
#     shows = models.IntegerField('Показы', default=0)
    
#     masked_url = models.CharField('Маскированный URL', max_length=512)

#     def __str__(self):
#         return str(self.pk) + ', ' + str(self.isJump)
    
# class jumpsToMaskedLink(models.Model):
#     date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)

#     def __str__(self):
#         return str(self.pk) + ', ' + str(self.isJump)

class generateMaskedURL(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        user = current_token.first().account
        if user is None:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        domain = request.data.get('domain', '')
        if not domain:
            return Response({'error': 'domain is required.'}, status=status.HTTP_400_BAD_REQUEST)

        #generate random string (64 chars) unique and create jumpToADPage model
        masked_domain = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(64))
        jumpToADPage.objects.create(account=user, site=siteModel.objects.get(domain=domain), masked_url=masked_domain)

        return Response({'masked_domain': masked_domain}, status=status.HTTP_200_OK)
    
class checkTransition(APIView):
    def post(self, request):
        masked_domain = request.data.get('masked_domain', '')
        print(masked_domain)
        if not masked_domain:
            return Response({'error': 'masked_domain is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        jump = jumpToADPage.objects.filter(masked_url=masked_domain).first()
        if not jump:
            return Response({'error': 'jump not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        #add to jumpToADPage shows +1
        jump.shows += 1
        jump.save()

        #create jumpsToMaskedLink
        jumpsToMaskedLink.objects.create(jump=jump)
        
        normal_url = jump.site.domain
        
        #return normal_url
        return Response({'normal_url': normal_url}, status=status.HTTP_200_OK)