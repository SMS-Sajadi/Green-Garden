from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("Email field is required!")
        if not password:
            raise ValueError("Password is required!")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    email = models.EmailField(max_length=200, unique=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)

    # changing AbstractUser to use email instead username
    username = None
    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
