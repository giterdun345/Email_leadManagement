from django.urls import path
from .views import TargetView, WithEmailViewSet, WithoutEmailViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_bulk.routes import BulkRouter

# router = DefaultRouter() removed for bulk
router = BulkRouter()
router.register(r'target', TargetView, basename='allTargets')
router.register(r'withEmail', WithEmailViewSet, basename='withemail')
router.register(r'withoutEmail', WithoutEmailViewSet, basename='withoutemail')

urlpatterns = router.urls
