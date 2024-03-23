Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Car Database
Andrew Nguyen
https://a2-andrewnguyen.glitch.me/

This project is a website that implements client-server functionality where we obtain data from the server and modify that data on the client end. This database is based around cars. You can insert data on name of the car, year, miles per gallon and fuel tank size. There is an additional derived fuel that is calculated in the server that is the total miles the car can drive on a full tank. 
The CSS styling I used, had Google Fonts for headers, and for layout, I used a grid. Almost every part has some CSS incorporated for alignment, text, fonts etc. 
My application uses three forms which can be found in the HTML. These forms are separated to be insert, delete and modify data respectively. For insert, you must fill in all the data correctly with first field as any string and the rest are integers. Delete requires one integer. And modify also uses both integers and a string however, to actually modify you need to fill the first field with a number and then the next fields can be optional but must be correct types. For example, you can modify ID 2 and only modify miles per gallon by putting a integer in that field.

**Field**
Car Model, Year, Miles per Gallon(MPG), Fuel Tank Size in Gallons

**Derived Field**
Total Miles the car can drive on a full tank
MPG * Fuel Tank

**CSS**
Grid
Uses element, id and class selectors
Google Font: Honk


## Technical Achievements
- **Tech Achievement 1**: I used a single page app with multiple forms that allows users to insert, delete and modify data which is updated in the server and on the client. The server sends back the data each time. Also when the page is refreshed the new data is still present within the server and still appears on the server.
- **Tech Achievement 2**: Added the ability to modify using a PUT HTTP request which sends the inputs to the server and the server responds with the data in the array being updated by calling getData() which sets the client array to be the same as the server array and resets the HTML tables.

### Design/Evaluation Achievements
- **Design Achievement 1**:  I asked two other students to use my application. All I asked them to do was fill out the fields in the HTML following what it says with whatever they want in the fields.

Test #1
1. Alqassar
2. Didn't have major problems, was straightforward to them
3. They enjoyed the images
4. More artistic designs, What I had was fun already but could always have more

Test #2
1. Ushman
2. No major problems, worked fine
3. Really enjoyed the font and images
4. The table location on the bottom could require scrolling when adding a lot of data, could place it elsewhere in the HTML 
