Create a Web App that for a custom "Basketball Fantasy Manager"

Project Goals:

A web app for managing NCAA Basketball "March Madness" post-season tournament.

- A "fantasy" team is drafted from all the basketball players in the tournament. 
- The amount of the points the players score during the tournament is the amount of points for the fantasy team

The app will have 3 main functions:

1.  Provide a drafting interface on "draft day" to manage the drafting of players to a user's team
2.  Fetching box scores during the tournament to update the fantasy team points and leaderboards
3.  Fetching team stats, rosters, and player stats before draft day to provide a global draft roster


More specific functions: 
3. In draft interface:
   1. View players that haven't been drafted yet
   2. Allows uers to add players that haven't been drafted yet to your "watchlist"
   3. See the drafted players list. 
   4. View other user's "Fantasy teams" and their drafted players.
4. Display Team pages which include the team's seed, region and list of players 
5. Diplay the tournament bracket including the regions and teams. Allow the teams to be clickable to view team details and players
6. User sign in with email address and password. Allow user to reset password.

Architecture:

Use Docker compose to build the stack. Use a nginx reverse proxy and postgresql db as separate container resources.

I am most familiar with Python so let's try and use python frameworks to build the web app. 
No specific framework requirements but let's discuss options as they arise - prefer to use popular community support frameworks.
Create unit tests for the various pieces of functionality
Create GitHub CICD config for building the app. Two main environemnts "prod" = main branch and "dev" = dev branch.