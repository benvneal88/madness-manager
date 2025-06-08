from django.contrib import admin
from .models import FantasyTeam, Draft, Watchlist


@admin.register(FantasyTeam)
class FantasyTeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'total_points', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'owner__username']
    ordering = ['-total_points']


@admin.register(Draft)
class DraftAdmin(admin.ModelAdmin):
    list_display = ['fantasy_team', 'player', 'draft_order', 'drafted_at']
    list_filter = ['drafted_at', 'fantasy_team']
    search_fields = ['fantasy_team__name', 'player__name']
    ordering = ['fantasy_team', 'draft_order']


@admin.register(Watchlist)
class WatchlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'player', 'added_at']
    list_filter = ['added_at']
    search_fields = ['user__username', 'player__name']
    ordering = ['-added_at']
