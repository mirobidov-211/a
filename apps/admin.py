from django.contrib import admin
from .models import User, Post, Like, Bookmark

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'year', 'month', 'day', 'id')
    search_fields = ('username', 'first_name', 'id')
    

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'id')
    search_fields = ('user__username', 'id')

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'id')
    search_fields = ('user__username', 'post__id')

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'id')
    search_fields = ('user__username', 'post__id')