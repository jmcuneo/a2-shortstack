**Name: Ronak Wani**  
**Email: rvwani@wpi.edu**  
**CS 4241: WebWare (Assignment 2)**

Ronak Wani: https://a2-ronakwani.glitch.me

## Technical Achivements   
   
**HTML Features:**   
- Used HTML forms for user input  
- Displayed all the data currently available on the server.  
- Validated HTML pages  
- Changed the title, h1 header, body. Added Google Fonts.  
- Created a dropdown menu for choosing the transportation mode.
- Created Submit and Confirm buttons.
- Created a div container for the table.
- Created HTML footer.
- Added the main.js file to the HTML page.     
       
**CSS Styles:**
- Used various CSS selectors like Element selectors, ID selectors, and Class selectors
for styling.
- Used #F08080FF for background color
- Used #000000FF for body and table text
- Used #DEB887FF for table row styling
- Used #FF0000E2 for submit button background
- Used #FFFFFFFF for submit button text color
- Used Outfit Google font for h1 header
- Used Libre Franklin Google font for body text
- Used flexbox layout for div container of table and footer
- Used justify-content to evenly space the rows in table
- Used justify-content and align-items to center the footer

**Javascript:**   
- Implemented GET in asynchronous window.onload to show the data
is persistent even on page reload and is erased only when the server is restarted
- Used JavaScript to handle the form submission without a page reload.
- Created a JSON object (json) containing the extracted form data. 
- Stringify the JSON object using JSON.stringify() to prepare it 
for sending via HTTP request.   
- All the functions (submit, del, modify, NewData, display, and window.onload)
utilize asynchronous operations using async and await keywords. T
that allows the code to perform tasks of fetching data 
from the server without blocking the main thread.

**Server/Node.js:**
- Besides implementing GET and POST request handler
- Also incorporated PUT and DELETE request handlers
- Created server logic and derived field by calculating the cost for transportation
- I found implementing PUT and DELETE requests challenging as they were not
specifically covered in the class
- I do not allow the user to change the First, Middle and Last Names.
- For PUT request implementation, I use custom data attributes and linear search
- I find the entry to be updated in the table by searching for it using FirstName and LastName of the user

## Design Achievements

### Design Achievement #1:

**Last Name:** Sunku  
  
**Task:** Book a commuter rail ticket to travel from Worcester to Boston  
  
**Problems:** Need to use scroll bar to go towards the bottom of the page due to huge table size.
Need to type each part of name in a different form input 
instead should have just one input asking for the full name .  
  
**Comments:**  The color scheme is decent. A little javascript animation 
to the website would make it more interactive.  
  
**Future Modifications based on Feedback:** Next time onwards, I will try to ask only relevant 
info from the user and make it more compact. I will strive to add some form of animation to keep
the user engaged.

### Design Achievement #2:

**Last Name:** Fusha  

**Task:**  Book an Uber to travel from Worcester to Boston    

**Problems** Need to press on the drop-down menu and choose the transport mode,
instead it would be more convenient if the user could just hover, and it shows a list. 
Another possible thing, it could do is give a search option for the user. So as the user types
the transport mode, it auto populates making it much easier and convenient to choose
rather than scrolling through the whole list.  

**Comments:** Suggestion to stick the footer to the bottom of the page rather than it 
moving to the bottom as the table entries increase.

**Future Modifications based on Feedback:** I will strive to ensure that the footer sticks to the bottom of the page 
by making its position absolute rather than relative. I will work to incorporate interesting features
like search option in the drop-down menu.