Readme
---
Zesheng Chen http://a2-zeshengchen.glitch.me

## Arcade Game Score Tracker
I created an arcade game score tracking application that allows users to input, view, modify, and delete scores. For positioning and layout, I employed CSS Flexbox that adjusts to different screen sizes and orientations. I also ensured accessibility by using semantic HTML elements and ARIA labels where appropriate.

In this application, users can add scores with a player's name, score, and date, and the application dynamically calculates and updates the rankings without the need for page refreshes.

## Technical Achievements
- **Single-page Application**: Allowing the application to add, delete, and modify scores without page reloads. So when the user submits data, the server sends back the updated data and the client updates its data display.


- **Ability to Modify**: Users can modify any of the existing data when clicking 'Edit' button, a form will be shown below the last dataset, which users can modify any of the fields including player's name, scores and date. They can cancel the modification or save the changes.


- **Ranking System**: The server adds a 'ranking' field to each score based on the score value and displays it on client side.


- **Real-time Data Processing**: Since the scores have the ranking system, I implemented server logic that recalculates rankings on-the-fly as scores are added, modified, or deleted. So the rankings will display in a correct order everytime there's adding/deleting/editing.


- **Form Handling**: A robust form entry system that validates user input before sending it to the server.

## Design/Evaluation Achievements
- **Test User Interface With Another Student**:


  1. Last name: 
     1. De
     

  2. What problems did the user have with your design: 
     1. The user noted that he sometimes mistook the "delete" function for the "modify" function. This caused him to accidentally delete data he didn't want to do so because the two buttons were more alike.


  3. What comments did they make that surprised you: 
     1. He suggests to make a 'confirm' pop up window for 'cancel', and also he discovered that while using 'edit' when the edit form is displayed, if he delete this data while the form is displayed, the data is deleted but the edit form still exists.


  4. What would you change about the interface based on their feedback: 
     1. I think his suggestions are really helpful for improving my UX design. I would make both changes on a 'confirm' pop up window for "cancel" functionality, and also fix the issue for 'edit' form should not display when deleted.
