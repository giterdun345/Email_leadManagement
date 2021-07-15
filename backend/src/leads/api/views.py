from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from leads.models import Target
from .serializers import TargetSerializer


class WithEmailViewSet(viewsets.ModelViewSet):
  queryset= Target.objects.exclude(email__exact= '')
  serializer_class= TargetSerializer
  
  
class WithoutEmailViewSet(viewsets.ModelViewSet):
  queryset= Target.objects.filter(email__exact = '')
  serializer_class= TargetSerializer

