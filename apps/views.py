from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
from django.conf import settings
import random

from .models import User, Post


def home(request):
    user = None
    if request.user.is_authenticated:
        user = request.user  # ✅ xavfsizroq
    posts = Post.objects.all().order_by('-id')

    context = {
        'post': posts,
        'user': user,
    }
    return render(request, 'twitter/home.html', context)


def register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        email = request.POST.get('email')
        month = request.POST.get('month')
        day = request.POST.get('day')
        year = request.POST.get('year')

        # ✅ Email bazada mavjudmi - TEKSHIRISH
        if User.objects.filter(email=email).exists():
            messages.error(request, "Bu email allaqachon ro'yxatdan o'tgan.")
            return render(request, 'user/register.html', {
                'form_modal_show': True
            })

        request.session['register_data'] = {
            'first_name': first_name,
            'email': email,
            'month': month,
            'day': day,
            'year': year,
        }

        verification_code = str(random.randint(100000, 999999))
        request.session['verification_code'] = verification_code

        try:
            send_mail(
                subject='Ro‘yxatdan o‘tish kodi',
                message=f'Sizning tasdiqlash kodingiz: {verification_code}',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False
            )
        except Exception as e:
            return render(request, 'user/register.html', {
                'email': email,
                'show_email_modal': True,
                'error': f"Email yuborishda xato: {e}"
            })

        return render(request, 'user/register.html', {
            'email': email,
            'show_email_modal': True
        })

    return render(request, 'user/register.html')


def verify_email_code(request):
    if request.method == 'POST':
        entered_code = request.POST.get('code')
        code = request.session.get('verification_code')
        if entered_code == code:
            return render(request, 'user/register.html', {
                'show_username_modal': True
            })
        else:
            messages.error(request, "Noto‘g‘ri kod!")
            email = request.session.get('register_data', {}).get('email', '')
            return render(request, 'user/register.html', {
                'email': email,
                'show_email_modal': True
            })
    return redirect('register')


def save_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        data = request.session.get('register_data')
        if not data:
            return redirect('register')
        if User.objects.filter(username=username).exists():
            return render(request, 'user/register.html', {
                'show_username_modal': True,
                'username_error': "Bu username allaqachon mavjud."
            })

        user = User(
            first_name=data['first_name'],
            email=data['email'],
            month=data['month'],
            day=data['day'],
            year=data['year'],
            username=username,
        )
        user.set_password(password)
        user.save()
        
        login(request, user)
        
        request.session.pop('register_data', None)
        request.session.pop('verification_code', None)
        return redirect('/')
    return redirect('register')


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username_login')
        password = request.POST.get('password_login')

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return redirect('/')
        else:
            messages.error(request, "Login yoki parol xato")
            return render(request, "user/register.html", {
                'show_login_modal': True
            })

    return render(request, "user/register.html")

@login_required
def tweet_create(request):
    if request.method == "POST":
        text = request.POST.get("content")
        img = request.FILES.get("image")
        emoji = request.POST.get("emoji")

        Post.objects.create(
            user=request.user,
            text=text,
            img=img,
            emoji=emoji
        )
        return redirect("home")  # post yozilgandan keyin bosh sahifaga qaytaradi

    return redirect("home")

def user_logout(request):
    logout(request)
    return redirect('/')