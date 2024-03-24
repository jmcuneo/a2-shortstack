Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Billing System
The web application is a billing system that can add, view, update, and delete purchase data. 
Tha data is stored on the server as array of objects and data is persisted on the client and server until the server is restarted.   
The form aligned to the left allows the user to fill the data for a product and clicking on submit saves the data in the server and asynchronously displays on the frontend.
The table aligned to the right shows the purchase data added, which is fetched from the server. The table displays product information entered, total price for each product, discount, total price after discount, and total price of the entire purchase data. 
The table also has buttons to delete any purchase data asynchronously and update data asynchronously.

**Instructions**:
- The following are brief instructions that guide on how to use the web application - 
- *Adding Data*:
1. Fill the form with product information
2. Click on submit
- *View Data*:
1. Look at the table to see purchase data
2. The first column displays product information
3. The second column displays price information calculated based on price of single product and quantity and price after applying discount
4. The third column has buttons to update or delete specific purchase data
5. The last row of the table displays the total price of the entire purchase records
- *Delete Data*:
1. Click on the delete button in the corresponding row of which the data should be deleted. The change should appear immediately.
- *Update Data*:
1. Click on the update button in the corresponding row and a popup form opens with the existing row data populated
2. Make the required changes
3. Click update for popup form to close and modify the data
4. The changes are made in the server and immediately displayed in the table

**Server (node.js)**:
- The server handles GET, POST, DELETE, and PUT by checking the request made.
- Server uses GET request to redirect uses to the index page and instructions page when clicked on the button.
- Server uses POST request to add data into the array of objects stored in the server 
  - Every time a purchase data added creates an object with the form elements as properties and values, which is added to the array
  - The array is returned back to frontend to display data
  - handlePost() method has server logic and derived fields. Based on the user inputted data, the server calculates total price, discount, and price after discount. 
    - The server accesses the information using object properties
    - The server calculates the total price for each purchase/product by multiplying the cost for single product with the quantity.
    - The server determines the discount based on the total price for each purchase/product. So using conditionals such as below 50, between 50 to 100, and above 500, the discount value is set.
    - The server calculates the after discount price for each product
- Server uses DELETE request to delete data from the array of objects according to the index determined by in which row did the user click the delete button. After deleting, the updated array is sent back to frontend to display.
- Server uses PUT request to update data based on the index determined by which row did the user click the update button. Using the index, the latest object is replaced and the updated array is sent back to frontend.
- Data is persistent until the server is restarted. So the data is visible even after refreshing the client. 

**CSS**:
- I have created a separate CSS file called main.css to add all the stylings and linked with html using the link tag
- The CSS properties are applied to the html elements either using classes/IDs or direct tag names
- The web page uses flexbox positioning technique
  - Using the styling rules like display, justify-content, align items, and flex-direction the flexbox technique was used to position abd align the form and table in a proper manner that's convenient for the user to use.
- Used margin and padding to space the form and table elements evenly and other html elements
- Used width, height, top, left, z-index to set top-navigation bar and footer to maximum scale and make them visible appropriately
- Used border and border-collapse to style the table and borders around table and the form
- Used text-align, font-weight, and color to align text to center wherever required, elegant text, and change font color appropriately 
- Used background to chance background color of many html elements such as table, navigation bars, footer, and pages. Also used linear-gradient for footer and top-navigation
- Used position to set positions for html elements to align correctly with other elements and the page
- Used border-radius, text-decoration, cursor, float to place the buttons properly without any underlines and make them look like buttons with pointer effect when hovered 
- Used the input tag directly to add stylings for the form
- The popup has some additional stylings - 
  - Used transform to position the popup correctly
  - Used transition to create the opening effect
  - Used visibility to hide and show the popup form
  - Used overflow to activate scroll as popup is a smaller window that does not occupy the entire space of the page
- I used Nunito Sans as the font for the entire body/content in my site.
  - I imported the font into CSS file using @import url and applied the font-family property to the entire body
  - Used font-family property to apply the font to entire body
  
**HTML**:
- All pages have been validated
- The web application contains an instruction page that can be accessible through the index page (index.html)
  - The instructions page does not perform any operations and just displays instructions on how to use this website
  - The instruction page accessed by clicking the 'a' tag on the top-navigation bar 
- Created a HTML form using form, input, label, select, option, and br tags to properly display the form with correct labellings in an understandable way for user to fill
  - The form also has a submit button to add data and reset button to clear the data entered
  - Used different attributes like placeholder, id, autofocus, autocomplete, value, type, and class to add correct functionality for the form
- The results are displayed on the same index page using table and ul tags
  - The table uses thead, tbody, tr, td, and th tags and ul uses li tags
  - The first column shows purchase data entered on the form 
  - The second column shows price values
  - The third column for buttons to update/delete
  - Each row is a purchase record, so bullet points are used to display specific product information
- The page also sues div tags to organize the html elements and apply CSS appropriately
- Uses footer and h tags for headings and footer at bottom of the page
- Uses link and script tags to connect CSS and JS
- Used different attributes for the form like 

**JavaScript**:
- The JS file contains many asynchronous functions for add, delete, and update
- Used JSON.stringify and JSON.parse to handle data
- The onload() function fetches data from server and calls helper function addItem() to displays the data
  - This function ensures that data on the client is always displayed until server is restarted
  - This function also handles submit as when the button is clicked the submit() function is called
- The submit() function fetches data from html form using DOM functions and stores it in a json object, which is then sent to the server. 
The server performs logical calculations and sends back the array of objects, which is displayed by JS using innerHTML to add data into a table
- The buttons have onclick() functions to update and delete functions written in JS
- The delete function gets the row index, which is sent to server as an object and server delete from array of objects. The updated array is sent back to JS and re-displayed.
- The update function has multiple helper functions. 
  - When update button clicked the opening of popup form is handled
  - The corresponding data is populated automatically using the table index to identify which row of data to use. Using DOM functions, setAttribute, getAttribute the populating happens
  - When update button of the form clicked, the form closing is handled by JS and using DOM functions the updated data is fetched as sent back to server. The server replaced the updated information and sends back the array which is displayed by JS again.
- await, fetch are used to send GET, POST, PUT, DELETE requests and also receive data from the server
- JS also calculates the total price of all merchandise but NOT the total price for each and after discount value 

## Technical Achievements
- **Tech Achievement 1**: This app is a single-page app because the users can see the form to add data and also view data on the same page.
  - The user can fill the form displayed on the left and clicking on submit will display the entered purchased data in the table on right immediately and asynchronously. 
The data displayed has been processed by adding discount and total price calculations done by the server. 
- **Tech Achievement 2**: This app also allows to delete and update purchase data. 
  - Clicking on the delete button in the corresponding row will immediately and asynchronously delete data by sending request to the server and it sends back the updated data, which the user can see.
  - Clicking on the update button in the corresponding row will immediately and asynchronously update data by sending request to server and it updates the data with re-performing the calculations/logic and sends back updated data, which can be seen by the user.

### Design/Evaluation Achievements
- **Design Achievement 1**:
- Task - Add a purchase record by filling the form, update the record added, see the total price, and delete the record.
- *USER 1*:
1. Provide the last name of each student you conduct the evaluation with.
Fusha
2. What problems did the user have with your design?
The footer displaying on top of the update form, which blocks the buttons for the update form. Upon clicking the instructions page, the user needs to use the browser arrow to go back, which is inconvenient. 
The discount field seems redundant. 
3. What comments did they make that surprised you?
The user really liked the gradient used for top-navigation bar and the footer. The instructions page was impressive and pretty detailed to guide the user.
4. What would you change about the interface based on their feedback?
I would add a home button on the instructions page for the user to return back to index page. I would add units for the price to make it clear. Also, fix the footer by positioning it correctly.

- *USER 2*:
1. Provide the last name of each student you conduct the evaluation with.
Shiu
2. What problems did the user have with your design?
The footer was not sticking to the bottom, which leads to blocking of buttons. The user can't navigate back home from instructions page, which was only possible through the browser back button. 
3. What comments did they make that surprised you?
The user liked the idea of having instructions page that can be visited from the index page.
4. What would you change about the interface based on their feedback?
I would add a button to go to home page from the instructions page. Also, add units for the cost like dollars or any other.
   