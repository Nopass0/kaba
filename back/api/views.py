from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.serializers import serialize

from account.models.account import accountModel
from account.models.verification import verificationModel
from ad_advertiser.models.ad.ad_company import ad_companyModel
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
        companies = list(ad_companyModel.objects.filter(profile=user.id).values())
        
        print(companies, user)
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