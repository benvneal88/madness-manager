from django.db import models
from django.contrib.auth.models import User
from players.models import Player


class FantasyTeam(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fantasy_teams')
    total_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-total_points', 'name']

    def __str__(self):
        return f"{self.name} ({self.owner.username})"

    def calculate_total_points(self):
        """Calculate total points from all drafted players"""
        total = sum(draft.player.tournament_points for draft in self.drafts.all())
        self.total_points = total
        self.save()
        return total


class Draft(models.Model):
    fantasy_team = models.ForeignKey(FantasyTeam, on_delete=models.CASCADE, related_name='drafts')
    player = models.OneToOneField(Player, on_delete=models.CASCADE, related_name='draft')
    draft_order = models.IntegerField()
    drafted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['draft_order']
        unique_together = ['fantasy_team', 'draft_order']

    def __str__(self):
        return f"{self.fantasy_team.name} - {self.player.name} (Pick #{self.draft_order})"

    def save(self, *args, **kwargs):
        # Mark player as drafted
        self.player.is_drafted = True
        self.player.drafted_at = self.drafted_at
        self.player.save()
        super().save(*args, **kwargs)


class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlists')
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='watchers')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'player']
        ordering = ['-added_at']

    def __str__(self):
        return f"{self.user.username} watching {self.player.name}"
