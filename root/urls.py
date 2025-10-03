from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from apps.views import home, register, verify_email_code, save_user, user_login, user_logout, tweet_create

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('register/', register, name='register'),
    path('user_login/', user_login, name='user_login'),
    path('logaut/', user_logout, name='logaut'),
    path('verify-code/', verify_email_code, name='verify'),
    path('save-user/', save_user, name='saveuser'),
    path('tweet/create/', tweet_create, name='tweet_create'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
