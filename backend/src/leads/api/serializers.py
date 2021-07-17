from rest_framework import serializers
from leads.models import Target

from rest_framework_bulk import (
    BulkListSerializer,
    BulkSerializerMixin,
    ListBulkCreateUpdateDestroyAPIView,
)
class TargetSerializer(BulkSerializerMixin, serializers.ModelSerializer):
  class Meta:
    model = Target
    # fields = '__all__'
    exclude = ['date_created']
    list_serializer_class = BulkListSerializer