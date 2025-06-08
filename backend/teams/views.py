from rest_framework import viewsets, filters
# from django_filters.rest_framework import DjangoFilterBackend
from .models import Team
from .serializers import TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['region', 'seed', 'eliminated', 'conference']
    search_fields = ['name', 'school', 'conference']
    ordering_fields = ['seed', 'name', 'wins', 'losses']
    ordering = ['seed']
