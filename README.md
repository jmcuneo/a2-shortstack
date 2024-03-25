Ava Chadbourne

https://a2-avachadbourne.glitch.me

## The Worst Calculator
This project is a very simple (silly) calculator. The user inputs 2 numbers, chooses an operator, and can guess what the answer might be. A table on the right will show the correct answer and if the guess was correct. The user can modify or delete the data using buttons on the table. I used a CSS flexbox for handling positioning of the page elements.


## Technical Achievements
- **Single-page App**: All forms and data are displayed on the same page. When an item is added, modified, or deleted, the table changes immediately to reflect it. Data is saved server-side, so any entries added, changed, or deleted by any user will stay that way until another change is made or until glitch makes the project go to sleep. This was achieved by using a combination async and regular event functions for each button and then handling the returning promises. Each time the server sent the most recent data in a response, the data table was re-built to be up-to-date.
- **User Can Modify Data**: By pressing the "modify" button, the user can choose to change number values, operators, and even what the correct answer is displayed as. To achieve this, I assigned an ID to each data entry that corresponded with their position in the server-side data array. I sent this ID and the newest field changes to the server, where they were parsed to take the most recent data from each source (new and old). The most challenging parts of this section were hiding the modification form while the add-item form was visible and vice-versa, parsing the data to combine new and old on the server side, and properly handling the HTML querying of the different table's radio buttons. 

## Design/Evaluation Achievements
- **Tested with students**: I tasked 3 students with creating 2 data entries, deleting at least one data entry, and modifying at least one row.
  - *Student 1*:
    - Last name of student: Andrews
    - What problems did the user have with your design: It wasn't clear what data values were optional and what were required on both the new item and modify item forms. User commented that a highlight of what row is being modified would be helpful and prevent misclicks. User did not know that assigning a correct answer was optional and also didn't have to be "correct" 
    - What comments did they make that surprised you: User commented that they didn't like the modification table being on the right-hand side of the screen because it shifted the table. I was surprised by this because I intentionally put it there to reduce user mouse movement and keep a distinction between the new item table and the modify table.
    - What would you change about the interface based on their feedback: I would definitely add some sort of highlight to the selected row of the table during the modification section. I would add more labels to the input fields to say which are optional and which are required. If other users had issues with the modification table being on the right-hand side of the screen, I would change that.
  - *Student 2*
    - Last Name of Student: Bixler
    - What problems did the user have with your design: It wasn't clear that values were being changed during the modification section, user thought they were being re-directed back to the home page. Still encountered issues with it being unclear that modification options are optional and not every field has to be filled.
    - What comments did they make that surprised you: User commented that they liked the delete button functionality. No comments on positioning of page elements.
    - What would you change about the interface based on their feedback: I would add more descriptions of how the new item and modify forms work as well as optional/required labels to the modification fields. I would add a small transition period between data so it's clear what data has been changed and how. 
  - *Student 3*
    - Last Name of Student: Caissie
    - What problems did the user have with your design: Noted that in the modification section the guess was not saved, so they couldn't change their answer to be correct. User did not discover that modification fields were optional.
    - What comments did they make that surprised you: Nothing he said was particularly surprising, but I noted that he did not comment on the modification table being on the right-hand side or the lack of highlight on the row being modified. 
    - What would you change about the interface based on their feedback: I would add labels to more fields to show which are optional/required. Add in functionality for keeping guess scores and changing correct/incorrect values based on modification
