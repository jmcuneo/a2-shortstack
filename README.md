Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  

Alexander Beck [http://a2-alexanderbeck.glitch.me](http://a2-alexanderbeck.glitch.me)
## Todo List
For HTML, created a table to use as a way to display data. Form is used with three elements, as well as a clear button. Clicking on an item allows a user to update existing data (by resubmitting the form). Page validates properly.

For JS, added a frontend initalizer for the current date in the date selector, as well as the table headers. Used JS to update table with data from the Node.js server.

For CSS, used \[data-send] (within the JS, but inside a querySelector so it still is CSS) as a way to access elements. data-send is a custom attribute that I used to define which items to send to the server. I also used :not() and :has() for styling, and background-filter for hovering. Used  [Saraburn](https://fonts.google.com/share?preview.size=31&classification=Display) from Google Fonts. Used a flexbox for content alignment. CSS is in a external stylesheet, with all rules in order of hierarchy. Added class to header in table. Added ids to various elements in the page. Used element selectors as well.

## Technical Achievements
- **Tech Achievement 1**: Created a single-page app that updates based off of server data.
- **Tech Achievement 2**: Also made it so that you can clear all the data or update individual data rows (just click the element and submit the form again).

### Design/Evaluation Achievements
- **Design Achievement 1**: 
1. Ni
2. Only the task name changes when clicking around
3. I forgot to check for empty dates (I do check for empty names)
4. Make the tablename section uneditable after clicking on an item, and changing "submit" to "edit"

1. Greene
2. The table headers jump around when adding items to the list 
3. They aren't a huge fan of the simplistic black and white colorscheme
4. I could fix the table headers problem by adding a dummy row (only when the table is empty) and make it not clickable, but have a bunch of spaces so the table doesn't jump around when adding the first new row (since there already is one)