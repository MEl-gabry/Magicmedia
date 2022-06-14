import os
from django.conf import settings


def file_cleanup(instance, **kwargs):
    if instance.image:
        path = os.path.join(settings.MEDIA_ROOT, instance.image.name)
        os.remove(path)
    