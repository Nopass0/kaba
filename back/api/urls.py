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

    # Пути для взаимодействия с БД. GET - получение записей, POST - добавление новой записи  
    path('accountModel', accountModellListCreateView.as_view()),
    path('actionModel', actionModellListCreateView.as_view()),
    path('social_networkModel', social_networkModelListCreateView.as_view()),

    path('ad_companyModel', ad_companyModelListCreateView.as_view()),
    path('ad_bannerModel', ad_bannerModelListCreateView.as_view()),
    path('ad_audienceModel', ad_audienceModelListCreateView.as_view()),
    path('ad_bannerModel', ad_bannerModelListCreateView.as_view()),
    path('ad_audienceModel', ad_audienceModelListCreateView.as_view()),
    path('ad_companyModel', ad_companyModelListCreateView.as_view()),
    path('profileModel', profileModelListCreateView.as_view()),
    path('setting_notificationModel', setting_notificationModelListCreateView.as_view()),
    path('statisticsModel', statisticsModelListCreateView.as_view()),
    path('notificationModel', notificationModelListCreateView.as_view()),
    path('finance_operationModel', finance_operationModelListCreateView.as_view()),
    path('site_profileModel', site_profileModelListCreateView.as_view()),
    path('site_ratingModel', site_ratingModelListCreateView.as_view()),
    path('siteModel', siteModelListCreateView.as_view()),

    path('banner_profileModel', banner_profileModelListCreateView.as_view()),
    path('banner_chosenModel', banner_chosenModelListCreateView.as_view()),
    path('channelModel', channelModelListCreateView.as_view()),
    path('channel_profileModel', channel_profileModelListCreateView.as_view()),

    path('verificationModel', verificationModelListCreateView.as_view()),
    path('tokenModel', tokenModelListCreateView.as_view()),
]