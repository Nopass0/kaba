from django.urls import path
from .views import *

urlpatterns = [
    # login register
    path("verify", verifyAPIViews.as_view()),
    # Подтверждение кода, создание токенов
    path('verify_code', verify_codeAPIViews.as_view()),
    # Проверка работает ли сервер с апи 
    path('check', check_api.as_view()),
    # Проверка токена
    path('check_token', check_tokenAPIViews.as_view()),
    # Get all companies for user
    path('getCompanies', getCompaniesAPIViews.as_view()),
    # Create profile
    path('createProfile', createProfileAPIViews.as_view()),
    # Get profile
    path('getProfile', getProfileAPIViews.as_view()),
    # path('try_sms', try_sms, name='try_sms'),
]