Andrew Salls

CS 4241 Assignment 2 (a2)

https://a2-andrewsalls.glitch.me

## Paint Live
This application is a live shared painting canvas, similar to the somewhat infamous Reddit r/place (albeit on a much smaller scale). The usage is simple: enter a name to associate with the placed color, select a color, and click one of the squares to change it to the selected color. Changing colors is limited to once a minute to prevent a single person from taking over the entire board. On the right is a list of recently changed squares (if any), listing up to the 20 most recently changed squares, the name of the user who changed the square, and when the square was changed.

For CSS, multiple types of positioning are used, including a grid layout for the colored squares, and a flexbox for the list of recent changes.

There are multiple datasets stored on the server, with the painted cells representing the requirement to allow editing values, and the recent changes sidebar covering any other requirements.

## Technical Achievements
- **Automatic Client Updates**: Because multiple people might have (theoretically) changed colors near simultaneously, submitting a color change reloads data from the server instead of just returning a confirmation that the applied color is valid. Additionally, every 10 seconds the page checks the server for updated data. This refresh timer is reset if the page is reloaded because of submitting a color change.
- **Editing form data**: By the nature of the site's design, users are able to edit squares that have already been edited by themselves or someone else.
- **Modification Cooldown**: A specific user name cannot change a color for a minute after their last color change. This is to theoretically prevent bots from taking over the board. In reality, bots could simply change the supplied user name, but creating an account system that prevents creating infinite accounts is out of scope for this project by way too much for me to do it. Also, it makes it easier for whoever's grading if they aren't forced to wait a minute between clicks.

### Design/Evaluation Achievements
- **I can't be bothered to run a survey lol**:
I took data vis last term, that was enough survey-running for the semester. 
