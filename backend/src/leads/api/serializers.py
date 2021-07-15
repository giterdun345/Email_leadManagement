from rest_framework import serializers
from leads.models import Target

class TargetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Target
    # fields = '__all__'
    exclude = ['date_created']