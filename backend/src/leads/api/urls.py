from django.urls import path
from .views import TargetViewSet, WithEmailViewSet, WithoutEmailViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'target', TargetViewSet, basename='allTargets')
router.register(r'withEmail', WithEmailViewSet, basename='withemail')
router.register(r'withoutEmail', WithoutEmailViewSet, basename='withoutemail')

urlpatterns = router.urls
