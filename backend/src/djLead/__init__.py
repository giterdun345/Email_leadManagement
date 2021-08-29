# We need to import celery app here to register it with Django
from .celery import app as celery_app
