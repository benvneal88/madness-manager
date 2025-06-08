from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Player
from .serializers import PlayerSerializer, PlayerDetailSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.select_related('team').all()
    serializer_class = PlayerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'team__name', 'team__school']
    ordering_fields = ['points_per_game', 'tournament_points', 'name']
    ordering = ['-points_per_game']

    def get_queryset(self):
        queryset = Player.objects.select_related('team').all()
        
        # Manual filtering
        team = self.request.query_params.get('team', None)
        position = self.request.query_params.get('position', None)
        is_drafted = self.request.query_params.get('is_drafted', None)
        region = self.request.query_params.get('region', None)
        
        if team is not None:
            queryset = queryset.filter(team_id=team)
        if position is not None:
            queryset = queryset.filter(position=position)
        if is_drafted is not None:
            queryset = queryset.filter(is_drafted=is_drafted.lower() == 'true')
        if region is not None:
            queryset = queryset.filter(team__region=region)
            
        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PlayerDetailSerializer
        return PlayerSerializer

    @action(detail=False, methods=['get'])
    def available(self, request):
        """Get all undrafted players"""
        available_players = self.queryset.filter(is_drafted=False)
        serializer = self.get_serializer(available_players, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def drafted(self, request):
        """Get all drafted players"""
        drafted_players = self.queryset.filter(is_drafted=True)
        serializer = self.get_serializer(drafted_players, many=True)
        return Response(serializer.data)
