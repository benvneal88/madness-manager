from django.contrib import admin
from .models import Player


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['name', 'team', 'position', 'points_per_game', 'tournament_points', 'is_drafted']
    list_filter = ['position', 'is_drafted', 'team__region', 'year']
    search_fields = ['name', 'team__name', 'team__school']
    ordering = ['-points_per_game']
    list_editable = ['is_drafted']
