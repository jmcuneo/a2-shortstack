Klaudio Fusha

https://a2-klaudiofusha.glitch.me/

## Workout Calorie Calculator
I was able to come up with a workout calorie calculator application that gives users the ability to input a workout starting and ending time, type, intensity to get an estimate of how many calories they burned. Once the form is submitted, data will be dynamically displayed in a results table at the bottom of the page. In that table, users have the ability to view, edit, and delete workout data. Regarding the CSS position technique, I used flexbox and changed the default direction from row to column. I also used gaps, a Google font (Madimi One), padding, margins, changed the background colors, and defined a max width.

## Technical Achievements
- **Single-Page App**: This allows for the data to be added, deleted, and edited dynamically. This means that the user will not have to refresh the page or visit a different one in order to see their workout data, since it will be displayed live. When data is added, edited, or deleted, it sends a request to the server to update the workout data. Then, that updated data is immediately sent to the client from the server upon form submission.
- **Enabling Ability to Edit Existing Data**: This allows for the existing data to be edited by the user. For each table row, there is an 'Edit' button. Upon pressing it, the read-only data in that row will turn into input fields (respective of the input type). Even if they decide to not change anything, the input fields will maintain the previous data and they just press confirm and not changes will be reflected. The PUT command is primarily used for editing existing data in the server (and then the table on the client side). This is done through the use of an index that keeps track of which specific cell in a given row needs to be changed.

### Design/Evaluation Achievements
- **Tested UI with Other Students**: Specific task is creating a boxing workout session from 11 AM to 1:30 PM, with intensity level of 2 (Medium). Then, edit the workout to have a higher intensity level. After seeing the estimated calories burned, refresh the page to demonstrate maintained tabular data and then delete the row.

 1. Shiu
 2. Problems: Black text on dark background in the table row headers are hard on the eyes
 3. Surprising comments: They thought that I had a creative topic/website idea
 4. What to change: Colors on table headers, style input buttons more

--

 1. Sunku
 2. Problems: The edit and delete button could be included inside the table, like create a column for them as well. Can expand the table, like make it a little bigger.
 3. Surprising: They thought that I had an interesting idea and calculation of calories burnt.
 4. What to Change: Adding more fields to the form or making the table bigger
