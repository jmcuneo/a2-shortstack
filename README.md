Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: March 24th, by 11:59 PM.

Szymon Mamro
http://a2-szymonmamro.glitch.me

---

## Student Database
My website is a "student database", where you can input a student's name and how many credits they have and is stored 
automatically in a table along with an automatically calculated Class Standing (Freshman, Sophomore, etc.) and what 
year they are expected to graduate.<br>
To create a student, you input a name and the number of credits. <br>
To update a student, you input a name already shown in the table and input the credits you wish to change to. <br>
To delete a student, you simply click the delete button next to the corresponding one.

## Technical Achievements
- I created a single-page app the provides both a form for users to submit, update, or delete data and also always shows the current state of the server-side data. 
This is done by always calling a function fetchStudentData() at the end of each function for a button press, creating/updating, or deleting, so that the information shown is always the up to date.
I also added the fetchStudentData() in the window.onload() because I realized that if I refreshed all the data disappeared, until a submission was done, in which time all of the data saved would appear
- I added the server creating derived fields and storing them
- I added catches and alerts for whether you tried submitting the form with a blank input, or if you submit something other than a number in the credits field
- The table is created in main.js so that the data is populated correctly
- I also have a catch in the server side so that the table doesn't appear until there is actual data for it to display
- I have the ability to create a student, which sends the student name and credits to the server which calculates the class standing and class of and then pushes it to the end of a list of all the students
before sending the list back to the front end to create the table
- I created the ability to update a student which uses the same button as creating the student, but the submit first checks the list of students and sees if the name is already there, if it is there, 
then the server only updates the credits and then updates the derived fields as well before sending the student data back
- I created a delete button in main.js as well so that a new delete button is created for every single row in the table there is. The delete button calls a separate function, which goes through the list until it finds
the corresponding name with which the delete button was attached to and then deletes the student from the list and sends back the data

### Design/Evaluation Achievements
- I did use element, id, and class selectors in formatting the page so that every thing is spaced correctly apart and the table had borders and headers a background
- I also changed the style of the default buttons
- Also added a hover feature where the buttons change colors if you hover over them
- I didn't end up having the time to do the peer test
