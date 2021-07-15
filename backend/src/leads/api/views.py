from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from leads.models import Target
from .serializers import TargetSerializer

class TargetViewSet(viewsets.ModelViewSet):
  """Retrieves all of the targets for upload from scraper and for additional use in gui"""
  queryset= Target.objects.all()
  serializer_class= TargetSerializer

class WithEmailViewSet(viewsets.ModelViewSet):
  """Retrieves all of the targets with an email address for gui"""
  queryset= Target.objects.exclude(email__exact= '')
  serializer_class= TargetSerializer
  
class WithoutEmailViewSet(viewsets.ModelViewSet):
  """Retrieves all of the targets without an email adress for gui"""
  queryset= Target.objects.filter(email__exact = '')
  serializer_class= TargetSerializer

