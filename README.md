Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
Era Kalaja

## Assignment 2 - Short Stack: Two Tier Web Application for GPA calculation 
This project is a short stack: two tier web application for GPA calculations. Given classes, grades, and credits by a user, the web application is able to calculate the GPA and produce a table of each entry provided. The user may choose to either add to the table via the calculate button (they must enter all fields in that row- everything above the first dashed line), delete from the table using the delete button (the table gives each entry an ID, the user should identify the ID from the table that they'd like to delete and enter it in before clicking the button), or modify an entry from the table using the modify class button (all fields must be filled out regardless of whether its changing or not). The table generates a derived field in the table as well which indicates the change in gpa with the addition of any classes, as well as a final cumulative gpa. 
To style this web page I used CSS flexbox to ensure positioning. 
Ensure that when performing an actions, that all (and only) the fields that are in the same row as the button are filled out. 


## Technical Achievements
- **Tech Achievement 1**: Created a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To do this I created some fields and buttons in which users can submit their desired data through, then that data is taken and stored within a table displayed back to the user. The table returns both the users entry and 2 derived fields along with a cumulative GPA displayed underneath the table.  When the user submits its class/grade data, the server responds sending back the updated data (including the 2 derived fields calculated on the server) and the client then updates its data display. It was challenging to create a table on the fly since it involved very little HTML and a lot more JavaScript than I expected. I had never worked with dynamic tables before and it was a challenge to do so successfully, it took me many tries to be satisfied with the end product. Furthermore, it was challenging to keep the table always updated with the server side array state even upon refreshing. 
- **Tech Achievement 2**: Created a form that enables adding and deleting class/grade data on the server, and also added the ability to modify existing data through the modify class button. To modify a class the user must fill out all the fields that are in the same row as the modify class button, keeping only the ID consistent (all other information can be modified or unmodified so long the ID is the same as the one in the table). The server will search for the ID in its array and change all fields according to the users input along with recalculations, then send it back to the client for the client to display it. This was challenging at first while I figured out how to search the array properly for the id and edit all data in the row according to the users input. 

### Design/Evaluation Achievements
- **Design Achievement 1**: Tested my user interface with 2 other students by telling them to calculate their GPA and to make use of all functionalities on the page. The following questions/answers resulted from my study: 

Student 1:
1. Provide the last name of each student you conduct the evaluation with.
Fede
2. What problems did the user have with your design?
At first the user didn't know which fields needed to be filled in and which didn't to add to the table. They didn't seem to read the instructions right away (didn't stand out enough).
3. What comments did they make that surprised you?
I was surprised to hear that they had a harder time adding to the table rather than deleting or modifying. I was also surprised that they didnt fully understnd the vocabulary of modifying rather than editing. 
4. What would you change about the interface based on their feedback?
I think I'd make it more obvious to use, perhaps giving more obvious instructions. I think I get a little too compfortable with my wording on these assignments because I know that the graders understand the scope of the project and the common phrases used like modify and ID. 

Student 2:
1. Provide the last name of each student you conduct the evaluation with.
Gilman
2. What problems did the user have with your design?
They did not understand which fields they had to fill out and the relevance of some the fields. They also seemed to be confused by the order and ID# correspondance. They also had a hard time with the instructions. 
instructions could be more attention grabbing
3. What comments did they make that surprised you?
I was surprised that they didn't find the order of tasks on the page accomodating, they would've preferred to see modify before delete with the ID# somehow made more obvious. I was also surprised by their interpretation of the instructions. 
4. What would you change about the interface based on their feedback?
I would instead make the interface more clear on the order in which things should be filled out, with more of a separation between which fields should be filled out for the task at hand. I'd also add an alert that informed the user that they still have field to fill in. 