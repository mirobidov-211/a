from django.contrib import admin
from .models import User, Post

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'year', 'month', 'day', 'id')
    search_fields = ('username', 'first_name', 'id')
    

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'id')
    search_fields = ('user__username', 'id')