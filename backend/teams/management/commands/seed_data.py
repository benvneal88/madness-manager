from django.core.management.base import BaseCommand
from teams.models import Team
from players.models import Player
from django.contrib.auth.models import User
import random


class Command(BaseCommand):
    help = 'Seed the database with sample tournament teams and players'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with tournament data...')
        
        # Clear existing data
        Player.objects.all().delete()
        Team.objects.all().delete()
        
        # Create teams for each region
        teams_data = [
            # East Region
            {'name': 'Duke Blue Devils', 'school': 'Duke University', 'seed': 1, 'region': 'EAST', 'conference': 'ACC', 'wins': 28, 'losses': 6},
            {'name': 'Kentucky Wildcats', 'school': 'University of Kentucky', 'seed': 2, 'region': 'EAST', 'conference': 'SEC', 'wins': 26, 'losses': 8},
            {'name': 'Villanova Wildcats', 'school': 'Villanova University', 'seed': 3, 'region': 'EAST', 'conference': 'Big East', 'wins': 25, 'losses': 7},
            {'name': 'Texas Tech Red Raiders', 'school': 'Texas Tech University', 'seed': 4, 'region': 'EAST', 'conference': 'Big 12', 'wins': 24, 'losses': 9},
            
            # West Region
            {'name': 'Gonzaga Bulldogs', 'school': 'Gonzaga University', 'seed': 1, 'region': 'WEST', 'conference': 'WCC', 'wins': 31, 'losses': 3},
            {'name': 'Arizona Wildcats', 'school': 'University of Arizona', 'seed': 2, 'region': 'WEST', 'conference': 'Pac-12', 'wins': 28, 'losses': 7},
            {'name': 'Kansas Jayhawks', 'school': 'University of Kansas', 'seed': 3, 'region': 'WEST', 'conference': 'Big 12', 'wins': 26, 'losses': 8},
            {'name': 'Auburn Tigers', 'school': 'Auburn University', 'seed': 4, 'region': 'WEST', 'conference': 'SEC', 'wins': 25, 'losses': 9},
            
            # South Region
            {'name': 'Baylor Bears', 'school': 'Baylor University', 'seed': 1, 'region': 'SOUTH', 'conference': 'Big 12', 'wins': 29, 'losses': 5},
            {'name': 'UCLA Bruins', 'school': 'University of California, Los Angeles', 'seed': 2, 'region': 'SOUTH', 'conference': 'Pac-12', 'wins': 27, 'losses': 7},
            {'name': 'Purdue Boilermakers', 'school': 'Purdue University', 'seed': 3, 'region': 'SOUTH', 'conference': 'Big Ten', 'wins': 26, 'losses': 8},
            {'name': 'Tennessee Volunteers', 'school': 'University of Tennessee', 'seed': 4, 'region': 'SOUTH', 'conference': 'SEC', 'wins': 24, 'losses': 9},
            
            # Midwest Region
            {'name': 'North Carolina Tar Heels', 'school': 'University of North Carolina', 'seed': 1, 'region': 'MIDWEST', 'conference': 'ACC', 'wins': 27, 'losses': 7},
            {'name': 'Houston Cougars', 'school': 'University of Houston', 'seed': 2, 'region': 'MIDWEST', 'conference': 'AAC', 'wins': 29, 'losses': 5},
            {'name': 'Wisconsin Badgers', 'school': 'University of Wisconsin', 'seed': 3, 'region': 'MIDWEST', 'conference': 'Big Ten', 'wins': 24, 'losses': 8},
            {'name': 'Arkansas Razorbacks', 'school': 'University of Arkansas', 'seed': 4, 'region': 'MIDWEST', 'conference': 'SEC', 'wins': 25, 'losses': 8},
        ]
        
        teams = []
        for team_data in teams_data:
            team = Team.objects.create(**team_data)
            teams.append(team)
            self.stdout.write(f'Created team: {team.name}')
        
        # Player names for each position
        guard_names = [
            'Marcus Johnson', 'Tyler Davis', 'Chris Wilson', 'Alex Brown', 'Jordan Smith',
            'Cameron Lee', 'Devon Clark', 'Ryan Martinez', 'Justin Taylor', 'Blake Anderson',
            'Cole Thompson', 'Mason White', 'Ethan Rodriguez', 'Noah Garcia', 'Lucas Miller'
        ]
        
        forward_names = [
            'Isaiah Jackson', 'Jaylen Williams', 'Malik Thompson', 'Xavier Robinson', 'Darius Carter',
            'Zion Mitchell', 'Anthony Lewis', 'Trey Walker', 'Jamal Harris', 'Donovan Young',
            'Kevin Parker', 'Derrick Jones', 'Andre Washington', 'Terrell Adams', 'Quincy Moore'
        ]
        
        center_names = [
            'Dominique Johnson', 'Marcus Thompson', 'Tyler Washington', 'Jordan Davis', 'Andre Miller',
            'Xavier Brown', 'Malik Johnson', 'Isaiah Wilson', 'Cameron Rodriguez', 'Devon Garcia'
        ]
        
        positions = ['PG', 'SG', 'SF', 'PF', 'C']
        
        # Create players for each team
        for team in teams:
            # Create 8-12 players per team
            num_players = random.randint(8, 12)
            
            for i in range(num_players):
                position = random.choice(positions)
                
                if position in ['PG', 'SG']:
                    name = random.choice(guard_names)
                elif position in ['SF', 'PF']:
                    name = random.choice(forward_names)
                else:  # Center
                    name = random.choice(center_names)
                
                # Make name unique by adding team abbreviation
                unique_name = f"{name} ({team.name.split()[0][:3]})"
                
                # Generate realistic stats
                if position in ['PG', 'SG']:  # Guards tend to score more
                    ppg = round(random.uniform(8.0, 25.0), 1)
                    rpg = round(random.uniform(2.0, 8.0), 1)
                    apg = round(random.uniform(3.0, 10.0), 1)
                elif position in ['SF', 'PF']:  # Forwards
                    ppg = round(random.uniform(10.0, 22.0), 1)
                    rpg = round(random.uniform(5.0, 12.0), 1)
                    apg = round(random.uniform(1.0, 6.0), 1)
                else:  # Centers
                    ppg = round(random.uniform(8.0, 18.0), 1)
                    rpg = round(random.uniform(7.0, 15.0), 1)
                    apg = round(random.uniform(0.5, 4.0), 1)
                
                player = Player.objects.create(
                    name=unique_name,
                    team=team,
                    position=position,
                    jersey_number=random.randint(0, 55),
                    height=f"{random.randint(5, 7)}'{random.randint(0, 11)}\"",
                    weight=random.randint(160, 280),
                    year=random.choice(['Fr', 'So', 'Jr', 'Sr', 'Grad']),
                    points_per_game=ppg,
                    rebounds_per_game=rpg,
                    assists_per_game=apg,
                    steals_per_game=round(random.uniform(0.5, 3.0), 1),
                    blocks_per_game=round(random.uniform(0.0, 2.5), 1),
                    field_goal_percentage=round(random.uniform(35.0, 65.0), 1),
                    three_point_percentage=round(random.uniform(25.0, 45.0), 1),
                    free_throw_percentage=round(random.uniform(60.0, 90.0), 1),
                    tournament_points=random.randint(0, 45),  # Some players have played tournament games
                    tournament_games=random.randint(0, 3)
                )
                
            self.stdout.write(f'Created {num_players} players for {team.name}')
        
        # Create a test user
        if not User.objects.filter(username='testuser').exists():
            User.objects.create_user(
                username='testuser',
                email='test@example.com',
                password='testpass123',
                first_name='Test',
                last_name='User'
            )
            self.stdout.write('Created test user (username: testuser, password: testpass123)')
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully seeded database with {len(teams)} teams and {Player.objects.count()} players!'
            )
        )
