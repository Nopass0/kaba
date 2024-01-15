from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from django.core.serializers import serialize
import urllib.parse
import requests

from ad_advertiser.models.site.site import siteModel


from .permissions import isValidToken
from .serializers import *

from a_setting.settings.base import *

from account.models.action import actionModel
from account.models.account import accountModel
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
    

# add ad_companyModel (private PUT) TODO


# create profile (private POST)
class createProfileAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        
        # check is already exist
        if profileModel.objects.filter(profile=user.id).exists():
            return Response({'error': 'profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # data_legal_country = models.CharField('Юр.данные. Страна', max_length=65, choices=DATA_LEGAL_COUNTRY_CHOICES)
        # data_legal_currency  = models.CharField('Юр.данные. Валюта', max_length=40, choices=DATA_LEGAL_CURRENCY_CHOICES)
        # data_legal_form  = models.CharField('Юр.данные. Организационно-правовая форма', max_length=40, choices=DATA_LEGAL_FORM_CHOICES, blank=False)
        # data_legal_id  = models.CharField('Юр.данные. Идентификатор организации', max_length=10, choices=DATA_LEGAL_ID_CHOICES, blank=False)
        
        profile = profileModel(profile=user,
            data_legal_country=request.data.get('data_legal_country', ''),
            data_legal_currency=request.data.get('data_legal_currency', ''),
            data_legal_form=request.data.get('data_legal_form', ''),
            data_legal_id=request.data.get('data_legal_id', ''),)
        profile.save()
        return Response({'status': 'ok', 'user_id': user.id, 'profile_id': profile.id}, status=status.HTTP_200_OK)
    

# get profile (private POST)
class getProfileAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        
        # check if profile exists
        if not profileModel.objects.filter(account=user).exists():
            return Response({'error': 'profile does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # retrieve profile
        profile = list(profileModel.objects.filter(account=user).values())
        
        return Response(profile, status=status.HTTP_200_OK)
    

# Ниже вьюшки ListCreateAPIView для всех моделей в проекте (GET - получение записей, POST - добавление новой записи)
# Не работают без передачи токена
class accountModellListCreateView(generics.ListCreateAPIView):
    queryset = accountModel.objects.all()
    serializer_class = accountSerializer
    permission_classes = [isValidToken]


class actionModellListCreateView(generics.ListCreateAPIView):
    queryset = actionModel.objects.all()
    serializer_class = actionSerializer
    permission_classes = [isValidToken]


class social_networkModelListCreateView(generics.ListCreateAPIView):
    queryset = social_networkModel.objects.all()
    serializer_class = social_networkSerializer
    permission_classes = [isValidToken]


class ad_companyModelListCreateView(generics.ListCreateAPIView):
    queryset = ad_companyModel.objects.all()
    serializer_class = ad_companySerializer
    permission_classes = [isValidToken]


class ad_audienceModelListCreateView(generics.ListCreateAPIView):
    queryset = ad_audience.ad_audienceModel.objects.all()
    serializer_class = ad_audienceSerializer
    permission_classes = [isValidToken]


class ad_bannerModelListCreateView(generics.ListCreateAPIView):
    queryset = ad_banner.ad_bannerModel.objects.all()
    serializer_class = ad_bannerSerializer
    permission_classes = [isValidToken]


class ad_companyModelListCreateView(generics.ListCreateAPIView):
    queryset = columns_ad_company.columns_ad_companyModel.objects.all()
    serializer_class = columns_ad_companySerializer
    permission_classes = [isValidToken]


class ad_audienceModelListCreateView(generics.ListCreateAPIView):
    queryset = columns_ad_audience.columns_ad_audienceModel.objects.all()
    serializer_class = columns_ad_audienceSerializer
    permission_classes = [isValidToken]


class ad_bannerModelListCreateView(generics.ListCreateAPIView):
    queryset = columns_ad_banner.columns_ad_bannerModel.objects.all()
    serializer_class = columns_ad_bannerSerializer
    permission_classes = [isValidToken]


class finance_operationModelListCreateView(generics.ListCreateAPIView):
    queryset = finance_operation.finance_operationModel.objects.all()
    serializer_class = finance_operationSerializer
    permission_classes = [isValidToken]


class notificationModelListCreateView(generics.ListCreateAPIView):
    queryset = notification.notificationModel.objects.all()
    serializer_class = notificationSerializer
    permission_classes = [isValidToken]


class statisticsModelListCreateView(generics.ListCreateAPIView):
    queryset = statistics.statisticsModel.objects.all()
    serializer_class = statisticsSerializer
    permission_classes = [isValidToken]


class setting_notificationModelListCreateView(generics.ListCreateAPIView):
    queryset = setting_notification.setting_notificationModel.objects.all()
    serializer_class = setting_notificationSerializer
    permission_classes = [isValidToken]


class profileModelListCreateView(generics.ListCreateAPIView):
    queryset = profile.profileModel.objects.all()
    serializer_class = profileSerializer
    permission_classes = [isValidToken]

class siteModelListCreateView(generics.ListCreateAPIView):
    queryset = site.siteModel.objects.all()
    serializer_class = siteSerializer
    permission_classes = [isValidToken]


class site_ratingModelListCreateView(generics.ListCreateAPIView):
    queryset = site_rating.site_ratingModel.objects.all()
    serializer_class = site_ratingSerializer
    permission_classes = [isValidToken]


class site_profileModelListCreateView(generics.ListCreateAPIView):
    queryset = site_profile.site_profileModel.objects.all()
    serializer_class = site_profileSerializer
    permission_classes = [isValidToken]


class banner_profileModelListCreateView(generics.ListCreateAPIView):
    queryset = banner_profile.banner_profileModel.objects.all()
    serializer_class = banner_profileSerializer
    permission_classes = [isValidToken]


class banner_chosenModelListCreateView(generics.ListCreateAPIView):
    queryset = banner_chosen.banner_chosenModel.objects.all()
    serializer_class = banner_chosenSerializer
    permission_classes = [isValidToken]


class channelModelListCreateView(generics.ListCreateAPIView):
    queryset = channel.channelModel.objects.all()
    serializer_class = site_ratingSerializer
    permission_classes = [isValidToken]


class channel_profileModelListCreateView(generics.ListCreateAPIView):
    queryset = channel_profile.channel_profileModel.objects.all()
    serializer_class = channel_profileSerializer
    permission_classes = [isValidToken]


class tokenModelListCreateView(generics.ListCreateAPIView):
    queryset = tokenModel.objects.all()
    serializer_class = tokenSerializer
    permission_classes = [isValidToken]
    

class verificationModelListCreateView(generics.ListCreateAPIView):
    queryset = verificationModel.objects.all()
    serializer_class = verificationSerializer
    permission_classes = [isValidToken]