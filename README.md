Luca Wol
Link: https://a2-lucawol.glitch.me

I made a web app to help you keep track of any chores you may forget to do. Using an input form, you can write down the name of the chore, rate how much you dislike doing said chore, the amount of time since you've last completed said chore, and if you have completed the chore. It then goes onto a table displaying all the information, and includes a calculated priority by multiplying the rating and the time since last completed. The larger the number, the higher the chore should be on your priority list.

## Technical Achievements
- **Contact between Client and Server**: Table persists on refresh by calling server to grab json of chore objects and display them on table when the page is refreshed
- **Styled Page With CSS**: Added rules for body, table, th, td, h1, button, and input
body: changed background color and font to Courier New
table, th, td: changed border color, added border onto all sides, and centered text
h1: aligned to center and changed font to Courier New
button: changed font to Courier New, changed color of background and border
input: changed border color and font
**Priority Derived Field**: Created a new derived field, called priority by multiplying the chore's hatred rating and length.
