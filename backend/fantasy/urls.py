from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FantasyTeamViewSet, WatchlistViewSet

router = DefaultRouter()
router.register(r'fantasy-teams', FantasyTeamViewSet, basename='fantasyteam')
router.register(r'watchlist', WatchlistViewSet, basename='watchlist')

urlpatterns = [
    path('', include(router.urls)),
]
