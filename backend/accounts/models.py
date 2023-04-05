from django.db import models
from django.contrib.auth.models import AbstractUser


class UserBase(AbstractUser):
    email = models.EmailField(max_length=200, unique=True)
    city = models.CharField(max_length=50, null=True)
    profile_photo = models.ImageField()
    phone_number = models.IntegerField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

