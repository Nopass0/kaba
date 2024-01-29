from django.db import models
from django.contrib.postgres.fields import ArrayField

from ad_advertiser.models.profile.profile import profileModel
from ad_advertiser.models.site.site import siteModel
from account.models.account import accountModel


# 
# class ad_companyModel(models.Model):

#     # Профиль
#     profile = models.ForeignKey(profileModel, related_name='ad_companyModel_profileModel', on_delete=models.CASCADE)

#     # определить по введеной ссылке
#     # Сайт
#     site = models.ForeignKey(siteModel, related_name='ad_companyModel_siteModel', on_delete=models.CASCADE)

#     date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
#     name = models.CharField('Название', max_length=255)

#     date_start = models.DateTimeField('Дата начала')
#     date_finish = models.DateTimeField('Дата завершения', blank=False)
#     budget_week = models.PositiveIntegerField('Недельный бюджет')
#     # Запрещенные медиаресурсы
#     channel_taboo = ArrayField(models.CharField(max_length=255), blank=False, default=list, size=500)
#     # ключевые фразы 
#     phrase_plus = ArrayField(models.CharField(max_length=60), blank=False, default=list, size=500)
#     # минус фразы 
#     phrase_minus = ArrayField(models.CharField(max_length=60), blank=False, default=list, size=500)

#     def __str__(self):
#         return str(self.pk) +', '+ self.name

#     class Meta:
#         verbose_name = 'Рекламная компания'
#         verbose_name_plural = 'Рекламные компании'


class ad_companyModel(models.Model):
    account = models.ForeignKey(accountModel, related_name='ad_companyModel_profileModel', blank=True, null=True, on_delete=models.CASCADE)
    site = models.ForeignKey(siteModel, related_name='ad_companyModel_siteModel', blank=True, on_delete=models.CASCADE)
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    name = models.CharField('Название', max_length=255, blank=True)
    date_start = models.DateTimeField('Дата начала', blank=True)
    date_finish = models.DateTimeField('Дата завершения', blank=True)
    budget_week = models.PositiveIntegerField('Недельный бюджет', default=0)
    channel_taboo = ArrayField(models.CharField(max_length=255), blank=True, size=500)
    phrase_plus = ArrayField(models.CharField(max_length=60), blank=True, size=500)
    phrase_minus = ArrayField(models.CharField(max_length=60), blank=True, size=500)
    status_text = models.CharField('Статус', max_length=512, blank=True)
    views = models.PositiveIntegerField('Показы', default=0)
    
    
class ad_statusModel(models.Model):
    status = models.BooleanField('Состояние', default=True)
    text = models.CharField('Текст', max_length=512, blank=False)
    companies = models.ManyToManyField(ad_companyModel, related_name='ad_statusModel_companies', blank=True)
    
class ad_bloggerCompanyModel(models.Model):
    company = models.ForeignKey(ad_companyModel, related_name='ad_bloggerCompanyModel_company', on_delete=models.CASCADE)

