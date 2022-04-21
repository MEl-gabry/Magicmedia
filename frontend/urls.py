from django.urls import re_path, path
from .views import index

urlpatterns = [
    re_path(r'^(?P<path>.*)/$', index),
    path('', index)
]