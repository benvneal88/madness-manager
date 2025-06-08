from django.db import models
from teams.models import Team


class Player(models.Model):
    POSITIONS = [
        ('PG', 'Point Guard'),
        ('SG', 'Shooting Guard'),
        ('SF', 'Small Forward'),
        ('PF', 'Power Forward'),
        ('C', 'Center'),
    ]
    
    name = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    position = models.CharField(max_length=2, choices=POSITIONS)
    jersey_number = models.IntegerField(blank=True, null=True)
    height = models.CharField(max_length=10, blank=True)  # e.g., "6'2""
    weight = models.IntegerField(blank=True, null=True)  # in pounds
    year = models.CharField(max_length=20, blank=True)  # Fr, So, Jr, Sr, Grad
    
    # Season stats
    points_per_game = models.FloatField(default=0.0)
    rebounds_per_game = models.FloatField(default=0.0)
    assists_per_game = models.FloatField(default=0.0)
    steals_per_game = models.FloatField(default=0.0)
    blocks_per_game = models.FloatField(default=0.0)
    field_goal_percentage = models.FloatField(default=0.0)
    three_point_percentage = models.FloatField(default=0.0)
    free_throw_percentage = models.FloatField(default=0.0)
    
    # Tournament stats
    tournament_points = models.IntegerField(default=0)
    tournament_games = models.IntegerField(default=0)
    
    # Draft status
    is_drafted = models.BooleanField(default=False)
    drafted_at = models.DateTimeField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-points_per_game', 'name']
        unique_together = ['name', 'team']

    def __str__(self):
        return f"{self.name} - {self.team.name}"

    @property
    def tournament_ppg(self):
        if self.tournament_games > 0:
            return round(self.tournament_points / self.tournament_games, 1)
        return 0.0
