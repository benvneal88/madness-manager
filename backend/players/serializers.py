from rest_framework import serializers
from .models import Player
from teams.serializers import TeamSerializer


class PlayerSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    team_seed = serializers.IntegerField(source='team.seed', read_only=True)
    team_region = serializers.CharField(source='team.region', read_only=True)
    tournament_ppg = serializers.ReadOnlyField()
    
    class Meta:
        model = Player
        fields = [
            'id', 'name', 'team', 'team_name', 'team_seed', 'team_region',
            'position', 'jersey_number', 'height', 'weight', 'year',
            'points_per_game', 'rebounds_per_game', 'assists_per_game',
            'steals_per_game', 'blocks_per_game', 'field_goal_percentage',
            'three_point_percentage', 'free_throw_percentage',
            'tournament_points', 'tournament_games', 'tournament_ppg',
            'is_drafted', 'drafted_at', 'created_at', 'updated_at'
        ]


class PlayerDetailSerializer(PlayerSerializer):
    team = TeamSerializer(read_only=True)
    
    class Meta(PlayerSerializer.Meta):
        pass
