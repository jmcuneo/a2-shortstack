Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Billing System
The web application is a billing system that can add, view, update, and delete purchase data. 
Tha data is stored on the server as array of objects and data is persisted on the client and server until the server is restarted.   
The form aligned to the left allows the user to fill the data for a product and clicking on submit saves the data in the server and asynchronously displays on the frontend.
The table aligned to the right shows the purchase data added, which is fetched from the server. The table displays product information entered, total price for each product, discount, total price after discount, and total price of the entire purchase data. 
The table also has buttons to delete any purchase data asynchronously and update data asynchronously. 
To delete any data, the user needs to click on the delete button in the corresponding row. 
To update any data, the user needs to click on the update button in the corresponding row, which opens a popup with a form with the existing row data populated. 
The user can make required changes and hit update button for the popup form to close and the changes made will be immediately visible in the table and saved in the server. 

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

**Server**:
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
- The web page uses flexbox positioning technique
- 

**HTML**:

**JavaScript**:


## Technical Achievements
- **Tech Achievement 1**: Using a combination of...

### Design/Evaluation Achievements
- **Design Achievement 1**: 
