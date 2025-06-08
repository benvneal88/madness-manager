from rest_framework import serializers
from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    record = serializers.ReadOnlyField()
    
    class Meta:
        model = Team
        fields = [
            'id', 'name', 'school', 'seed', 'region', 'logo_url', 
            'conference', 'wins', 'losses', 'eliminated', 'record',
            'created_at', 'updated_at'
        ]
