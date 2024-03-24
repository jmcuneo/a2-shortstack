Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Dungeons and Dragons Character Storage/Generator
Aidan MacNevin - https://a2-aidanmacnevin.glitch.me/
This web application serves as a storage point for Dungeons and Dragons Characters, as well as a starting point for newer players. Users are able to submit a character name, race, class, and select a primary type of action. On submission, the character will be added to the table, the primary modifier of the class will be displayed, and a random action will be assigned. 
You can delete entries or modify them with the buttons on the right of the table. With the edit button, you can adjust the modifier or action if the derived value is not as expected. 

## Baseline Requirements
Basic functionalities
- Server file that maintains a tabular dataset with five fields
- Results functionality that shows the entire dataset: Table on the page below the form
- Form/Entry that allows user to add or delete: Add entry at the top of the site, delete data using the button in each row. 
- Server logic for derived field: Derived fields Primary modifier based on class, and Action based on combination of class and action type (weapon/spell)

HTML
- HTML form with inputs and datalists
- Results page: Table on the main page (single page app)
- index.html validated

![img.png](img.png)
- All pages available from homepage (single page app)

CSS
- For this site, I used CSS flexboxes to position my elements. 
- To style my web app I used a variety of different tags, ids, and classes. See main.css for more details.
- I also used MedievalSharp and Noticia as fonts from Google Fonts

JavaScript and Node.js
- front-end JavaScript in main.js
- HTTP Server server.improved.js that handles Derived Fields and GET/POST requests. 

## Technical Achievements
- **Single Page App**: My web application is a single page that contains a form for users to submit data, as well as a table to display the data. This was somewhat challenging, as I had to find ways to pass the data between the client and the server. Additionally, I wanted to ensure that the user is consistently seeing updated data, so I made the table update every time any data would be changed. 
- **Modify Data**: In addition to being a single page, I added an edit functionality. Users are able to click the edit button next to a table entry. An edit form will appear, and they can adjust the information accordingly. This was difficult because not only did I have to have a way to load the existing data, but I needed a way to properly update it so we do not have multiple entries. Throughout this process I ran into a plethora of bugs but I was able to get the edit form working and the table updating properly.  

### Design/Evaluation Achievements
- **User Interface Test 1**: I connected with a fellow student over discord to perform a UI test for my site. I tasked them with creating a character, deleting an entry, and editing a saved character. 
  - **Last name of participating student**: Zhang
  - **Problems with the design**: Confusion on if selecting a class that does not exist is intentional/an issue. However, overall user found the UI to be easy to navigate and understand. 
  - **Comments that surprised me**: The participant was a fan of the site topic, and really liked the color scheme. Additionally, they liked the idea of the random action that got selected and how the primary modifier was automatic. 
  - **What I would change based on their feedback**: I would probably clarify in the site instructions that it's okay to have a custom class as your choice. Additionally, I think I would increase how much color is on the page. I was not initially sure about the colors so I used it minimally, but with some positive feedback about the colors I think I could lean into it a bit more and try out different ways to add more color.   
