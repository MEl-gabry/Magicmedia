from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('register', index),
    path('login', index),
    path('reset-password', index),
    path('password/reset/confirm/<str:uid>/<str:token>', index),
    path('activate/<str:uid>/<str:token>', index)
]