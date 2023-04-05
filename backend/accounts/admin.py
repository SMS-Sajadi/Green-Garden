from django.contrib import admin
from .models import UserBase, CustomerProfile, GardenOwnerProfile

admin.site.register(UserBase)
admin.site.register(CustomerProfile)
admin.site.register(GardenOwnerProfile)
