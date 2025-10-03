from django.shortcuts import redirect

class RegistrationRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # ✅ Static va admin sahifalarga teginmaymiz
        # Accept both '/admin' and '/admin/' (and any admin subpaths) so CommonMiddleware
        # can append the slash or admin can handle the path. Previously '/admin' (no
        # trailing slash) didn't match '/admin/' and was redirected to register.
        if request.path.startswith('/static/') or request.path.startswith('/admin'):
            return self.get_response(request)

        # ✅ Login bo‘lgan foydalanuvchi register sahifaga kirmasligi kerak
        if request.user.is_authenticated:
            if request.path in ['/register/', '/user_login/', '/verify-code/', '/save-user/']:
                return redirect('home')  # Asosiy sahifaga yo‘naltiramiz

        # ❌ Login bo‘lmagan foydalanuvchi faqat register sahifaga kira oladi
        else:
            if request.path not in ['/register/', '/user_login/', '/verify-code/', '/save-user/']:
                return redirect('register')  # Ro‘yxatdan o‘tish sahifasiga

        return self.get_response(request)
