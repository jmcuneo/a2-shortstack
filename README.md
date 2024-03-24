## Recipe Cookbook
Link: a2-EllysGorodisch.glitch.me

Has it been your lifelong goal to find a website to store simple information about recipes you like? Well look no further, your greatest dreams are right in front of you.

Users can enter the name of recipe, along with its prep and cook times, and the application will automatically calculate the total time needed and add it to the table.

To remove a recipe from the table, enter the name of the recipe and click 'Remove'.

To modify a recipe in the table, enter the name of the recipe as well as the new prep and cook times for it, then click 'Modify'.

(FlexBox CSS Positioning Used)

## Technical Achievements
- **Single-Page App**: When the client sends a request to the server to add, remove, or modify data, the server updates the stored appdata accordingly and sends a new table in the response. The client then updates its page with the new table.
- **Modification Functionality**: Along with adding or removing data, the client can send a request to the server to modify a piece of data. This is done by sending the recipe name along with the updated prep time and cook time. The server automatically recalculates the total time.

### Design/Evaluation Achievements
- **Peer Testing 1**:
    1. Last Name: Ushman
    2. Problems: They noticed that the Remove and Modify forms were case-sensitive for the recipe names. They also requested that the font size for the entire website be larger.
    3. Surprising Comments: They did not make any comments that suprised me.
    4. Changes: Based on their feedback, I made everything on the site larger for visibility and changed the recipe name inputs for the Remove and Modify forms to be case-insensitive.

- **Peer Testing 2**:
    1. Last Name: Chartier
    2. Problems: They said to make the headers bigger to take up more of the screen.
    3. Surprising Comments: They did not make any comments that surprised me.
    4. Changes: Based on their feedback, I made the headers larger.