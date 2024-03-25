Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Simple To-Do List
For my project I made a fairly simple to-do list app. The user can input a task name, due date, and color, and an entry will be added to the list on the server.
The server side calculation determines the number in the priority column of the list. The priority is simply determined by sorting all the items in the list by their due date, with the item at priority 1 being the next item due.  
For styling I used CSS flexboxes and a variety of selectors as outlined in the assignment description to style all the main visual elements on the page. I also used the Nunito font from Google Fonts.

## Technical Achievements
- **Single-Page App**: Both the form for adding new tasks and the to-do list (the "results" of the form) are displayed side-by-side using CSS flexboxes. The to-do list automatically updates after a submission to the form is made (the user doesn't have to refresh the page).

### Design/Evaluation Achievements
- **Customizable Task Coloring**: The color a user selects for a task is reflected in the styling of it's row, which was a little tricky to get properly working.
- **Sound Effects!**: Little sound effects play when you add or remove a task. Isn't that neat! I'd never used audio in JavaScript before so I had to learn a little bit about that to get this working.
    - Attributions: 
        - click by 1bob -- https://freesound.org/s/717365/ -- License: Creative Commons 0
        - ui-submit.wav by StavSounds -- https://freesound.org/s/701704/ -- License: Creative Commons 0

