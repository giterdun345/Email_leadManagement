from django.urls import path
from .views import WithEmailViewSet, WithoutEmailViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'target', TargetViewset, basename='allTargets')
router.register(r'withEmail', WithEmailViewSet, basename='withemail')
router.register(r'withoutEmail', WithoutEmailViewSet, basename='withoutemail')

urlpatterns = router.urls
