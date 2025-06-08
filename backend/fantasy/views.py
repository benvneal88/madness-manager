from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
# from django_filters.rest_framework import DjangoFilterBackend
from .models import FantasyTeam, Draft, Watchlist
from .serializers import FantasyTeamSerializer, DraftSerializer, WatchlistSerializer
from players.models import Player


class FantasyTeamViewSet(viewsets.ModelViewSet):
    serializer_class = FantasyTeamSerializer
    permission_classes = [permissions.AllowAny]  # Temporarily allow unauthenticated access for testing
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['owner']

    def get_queryset(self):
        return FantasyTeam.objects.select_related('owner').prefetch_related('drafts__player__team').all()

    def perform_create(self, serializer):
        # For testing, use test user if not authenticated
        if self.request.user.is_authenticated:
            serializer.save(owner=self.request.user)
        else:
            # Use test user for unauthenticated requests during testing
            test_user = User.objects.get(username='testuser')
            serializer.save(owner=test_user)

    @action(detail=True, methods=['post'])
    def draft_player(self, request, pk=None):
        """Draft a player to this fantasy team"""
        fantasy_team = self.get_object()
        player_id = request.data.get('player_id')
        
        if not player_id:
            return Response({'error': 'player_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            player = Player.objects.get(id=player_id)
        except Player.DoesNotExist:
            return Response({'error': 'Player not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if player.is_drafted:
            return Response({'error': 'Player already drafted'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user owns this team (skip check for testing with unauthenticated users)
        if self.request.user.is_authenticated and fantasy_team.owner != self.request.user:
            return Response({'error': 'Not your team'}, status=status.HTTP_403_FORBIDDEN)
        
        # Get next draft order
        next_order = fantasy_team.drafts.count() + 1
        
        # Create draft entry
        draft = Draft.objects.create(
            fantasy_team=fantasy_team,
            player=player,
            draft_order=next_order
        )
        
        # Recalculate team points
        fantasy_team.calculate_total_points()
        
        return Response(DraftSerializer(draft).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def leaderboard(self, request):
        """Get fantasy teams leaderboard"""
        teams = self.get_queryset().order_by('-total_points')
        serializer = self.get_serializer(teams, many=True)
        return Response(serializer.data)


class WatchlistViewSet(viewsets.ModelViewSet):
    serializer_class = WatchlistSerializer
    permission_classes = [permissions.AllowAny]  # Temporarily allow unauthenticated access for testing

    def get_queryset(self):
        # For testing, return all watchlist items if not authenticated
        if self.request.user.is_authenticated:
            return Watchlist.objects.filter(user=self.request.user).select_related('player__team')
        else:
            return Watchlist.objects.select_related('player__team').all()

    def perform_create(self, serializer):
        # For testing, use test user if not authenticated
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            # Use test user for unauthenticated requests during testing
            test_user = User.objects.get(username='testuser')
            serializer.save(user=test_user)
