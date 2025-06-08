from django.contrib import admin
from .models import Team


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'seed', 'region', 'record', 'eliminated']
    list_filter = ['region', 'eliminated', 'conference']
    search_fields = ['name', 'school', 'conference']
    ordering = ['seed']
