from django.db import models


class Team(models.Model):
    REGIONS = [
        ('EAST', 'East'),
        ('WEST', 'West'),
        ('SOUTH', 'South'),
        ('MIDWEST', 'Midwest'),
    ]
    
    name = models.CharField(max_length=100)
    school = models.CharField(max_length=100)
    seed = models.IntegerField()
    region = models.CharField(max_length=10, choices=REGIONS)
    logo_url = models.URLField(blank=True, null=True)
    conference = models.CharField(max_length=50, blank=True)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    eliminated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['seed', 'name']
        unique_together = ['seed', 'region']

    def __str__(self):
        return f"({self.seed}) {self.name}"

    @property
    def record(self):
        return f"{self.wins}-{self.losses}"
