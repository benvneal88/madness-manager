from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FantasyTeam, Draft, Watchlist
from players.serializers import PlayerSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class DraftSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    player_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Draft
        fields = ['id', 'player', 'player_id', 'draft_order', 'drafted_at']


class FantasyTeamSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    drafts = DraftSerializer(many=True, read_only=True)
    player_count = serializers.SerializerMethodField()
    
    class Meta:
        model = FantasyTeam
        fields = ['id', 'name', 'owner', 'total_points', 'drafts', 'player_count', 'created_at', 'updated_at']
    
    def get_player_count(self, obj):
        return obj.drafts.count()


class WatchlistSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    player_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Watchlist
        fields = ['id', 'player', 'player_id', 'added_at']
