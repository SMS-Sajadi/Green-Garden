from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManger(BaseUserManager):
    def create_user(self, email, password=None):
        if not email or len(email) <= 0:
            raise ValueError("Email field is required !")
        if not password:
            raise ValueError("Password is must !")
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserBase (AbstractUser):
    class Types(models.TextChoices):
        GardenOwner = "GARDEN OWNER", 'Garden Owner'
        Customer = "CUSTOMER", 'Customer'
        Admin = "ADMIN", 'Admin'

    type = models.CharField(max_length=12, choices=Types.choices, default=Types.Admin)
    email = models.EmailField(max_length=200, unique=True)
    username = models.CharField(max_length=50)
    phone_number = models.IntegerField(null= True, blank=True)
    profile_photo = models.ImageField()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManger()

    def save(self, *args, **kwargs):
        if not self.type or self.type is None:
            self.base_type = UserBase.Types.Admin
        return super().save(*args, **kwargs)


class GardenOwnerManger(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        queryset = super().get_queryset(*args, **kwargs)
        queryset = queryset.filter(type=UserBase.Types.GardenOwner)
        return queryset


class GardenOwnerProfile(models.Model):
    user = models.OneToOneField(UserBase, on_delete=models.CASCADE)
    national_id = models.IntegerField()
    business_id = models.IntegerField()
    license = models.ImageField()
    is_verified = models.BooleanField(default=False)
    #garden = models.ForeignKey(Garden, on_delete=models.CASCADE)
    location = models.URLField()


class GardenOwner(UserBase):
    class Meta:
        proxy = True

    objects = GardenOwnerManger()

    def save(self, *args, **kwargs):
        self.base_type = UserBase.Types.GardenOwner
        return super().save(*args, **kwargs)


@receiver(post_save, sender=GardenOwner)
def customer_creator(sender, instance, created, **kwargs):
    if created and instance.type == UserBase.Types.GardenOwner:
        GardenOwnerProfile.objects.create(user=instance)


class CustomerManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        queryset = super().get_queryset(*args, **kwargs)
        queryset = queryset.filter(type=UserBase.Types.Customer)
        return queryset


class CustomerProfile(models.Model):
    user = models.OneToOneField(UserBase, on_delete=models.CASCADE)
    city = models.CharField(max_length=50)
    # liked_plants = models.ManyToManyField(Plant)
    # bookmark_plants = models.ManyToManyField(Plant)


class Customer(UserBase):
    class Meta:
        proxy = True

    objects = CustomerManager()

    def save(self, *args, **kwargs):
        self.base_type = UserBase.Types.Customer
        return super().save(*args, **kwargs)


@receiver(post_save, sender=Customer)
def customer_creator(sender, instance, created, **kwargs):
    if created and instance.type == UserBase.Types.Customer:
        CustomerProfile.objects.create(user=instance)
