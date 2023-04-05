from django.contrib.auth import login
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import User

# Create your views here.


def login_user(request):
    if request.method == 'GET':
        return render(request, 'login.html')

    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['pass']

        user = User.objects.filter(email=email, password=password)
        if not user:
            return HttpResponse("test sign up page")

        user = user[0]
        login(request, user)
        return HttpResponse("test home page")
