## Storm Report Form
Simple website for reporting various weather events (tornadoes, lightning, hail, wind) and viewing previous reports.

Used css grid for styling both main content of page and the submission form.

Users can add reports, modify them, and delete them.

## Technical Achievements
- **Tech Achievement 1**: This app is a single page app that live updates with new data every five seconds, as wll as when the user adds, modifies, or deletes a report. When other users interact with data, changes can be seen. Figuring out how to achieve this live updating without any sort of unintentional duplication of items was somewhat difficult at first, but I was able to figure it out.

- **Tech Achievement 2**: Added the ability to modify data. Race conditions arising from two users trying to delete or modify at the same time are resolved through a unique id that is assigned to every report. ID's are unchangable and never assigned twice.

Creating UI that would allow for easy modification of data on the client side was difficult at first. I decided to reuse the original submission form for this.

### Design/Evaluation Achievements
- **Design Achievement 1**: User interface test with Shiu:

1. Problems: did not like that form can be submitted with empty details - suggested adding required fields. Did not like that form didn't clear on submit.

2. No particularly suprising comments, but he liked that the modification and submit form were the same.

3. Make the submission form clear on submission. (I did implement this) Some CSS styling changes to make the website more visually appealing. Perhaps make the description field and date field mandatory for submission.
