from django.db import models


# Модель пользователей
class accountModel(models.Model):
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    login = models.CharField('Логин', max_length=30, unique=True, blank=False)
    avatar = models.ImageField('Аватар', upload_to='account/avatar/', default='index_img/lk/avatar/default.svg')
    name_first = models.CharField('Имя', max_length=100, blank=False)
    # Сделал фамилию необязательным полем тк в макете регестрации это поле отсудствует
    name_last = models.CharField('Фамилия', max_length=100, blank=True)
    phone_number = models.CharField('Номер телефона', max_length=20, blank=False)
    isBlogger = models.BooleanField('Блогер', default=False)

    def __str__(self):
        return str(self.pk) + ', ' + self.login + ', ' + self.name_first + ', ' + self.name_last

    class Meta:
        verbose_name = 'Аккаунт'
        verbose_name_plural = 'Аккаунты'