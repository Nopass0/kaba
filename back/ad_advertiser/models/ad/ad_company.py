from django.db import models
from django.contrib.postgres.fields import ArrayField

from ad_advertiser.models.profile.profile import profileModel
from ad_advertiser.models.site.site import siteModel


# 
class ad_companyModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, related_name='ad_companyModel_profileModel', on_delete=models.CASCADE)

    # определить по введеной ссылке
    # Сайт
    site = models.ForeignKey(siteModel, related_name='ad_companyModel_siteModel', on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    name = models.CharField('Название', max_length=255)

    date_start = models.DateTimeField('Дата начала')
    date_finish = models.DateTimeField('Дата завершения', blank=False)
    budget_week = models.PositiveIntegerField('Недельный бюджет')
    # Запрещенные медиаресурсы
    channel_taboo = ArrayField(models.CharField(max_length=255), blank=False, default=list, size=500)
    # ключевые фразы 
    phrase_plus = ArrayField(models.CharField(max_length=60), blank=False, default=list, size=500)
    # минус фразы 
    phrase_minus = ArrayField(models.CharField(max_length=60), blank=False, default=list, size=500)

    def __str__(self):
        return str(self.pk) +', '+ self.name

    class Meta:
        verbose_name = 'Рекламная компания'
        verbose_name_plural = 'Рекламные компании'