from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token


class CustomUser(AbstractUser):
    email = models.EmailField(max_length = 250, unique=True)
    username = models.CharField(max_length=20,null=True,blank=True,unique=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']