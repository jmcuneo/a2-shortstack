Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Jack Lafond 

http://a2-jacklafond.glitch.me

## Bday Tracker
For my project I created a web app that stores birthday information about people. This inlcudes a person's name, their birthday, and their favorite type of cake. Along with this I included 2 dervied fields, ID - an id for each entry so that they can be uniquely identified, and Age - calculated based on the birthday field entered. My app shows the up to date app data in a table at the top of the page. A user can submit new entries using the form on the left. A user can also update/modify existing entries. To do this, click on the ID of the entry in the table that you want to update. The udpate form will be filled with the corresponding entry values and you can edit the values in that form then update it (except for id and age as those are handled by the server). An entry can also be removed. In the table each entry has a delete button that can be used to remove that entry. After each change to the data, the table is updated for the user to see the most recent changes. 

For CSS I used element, class, and id identifiers. I used multiple nested flex-boxes in order to achieve this layout. I first used a flex with column direction in order to diplay the table, the first flex item, above the form container which was the second flex item. I then used a flex container with a row direction in order to place the two forms next to each other. I used the space-evenly attribute in order space them nicely on the page. Finally for each form I used a flex container with a column direction in order to place the form titles above the forms themselves. 

## Technical Achievements

- **Create a single-page app ...** - My webpage displays the most up to date dataset. After adding new values or deleting some the table is updated for the user to see the most recent changes.
- **Enabling the ability to modify existing data** - In my webpage I also include an update/modify form. A user can click on the id of an entry that they want to update. This will fill the update form and a user can change any of the name, birthday, and cake values. After clicking update, the server updates the data and sends the dataset back. The table then displays the up to date data with the most recent changes.

## Design Achievements


