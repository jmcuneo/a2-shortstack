## To Not-Do List
User manages a list of tasks they don't want to do. User can add/edit/delete tasks.

https://a2-gabrielshiu.glitch.me/

Used flexboxes to center and space elements.

## Technical Achievements
- **Tech Achievement 1**: Built a single-page app. Data is stored to the server and rendered on the client. Data is updated on the server when the user adds, edits, or deletes a task. Data is updated on the client on load and when changes are made. Because data is on the server, it will persist as long as the server is running. I used HTTP GET, POST, PUT, and DELETE requests to interact with the server. When changes are made, the response sends the updated data. I was relatively familiar with these features from software engineering, but a new thing I did was using a PUT request. Also it was challenging having to do this in vanilla HTML/JS because in SWE we used React.
- **Tech Achievement 2**: I added the ability to modify data. I did this through an edit button which allows you to edit the entry in-line in the table. This is also what I did for adding entries. I wanted the UI to be simple and minimal. This challenged my vanilla HTML/JS skills and I learned from it.
- **Tech Achievement 3**: My "priority" field sorts the tasks by priority. I originally had some bugs because I didn't parse the JSON for the priority into a Number, I just left it as a string, and that broke my sorting but I figured it out.
- **Tech Achievement 4**: I added a "Done" field with checkboxes. When you try to complete a task, it actually doesn't let you because this is a To **Not-Do** list. It was slightly challenging to figure out but it worked.

### Design/Evaluation Achievements
- **Design Achievement 1**: Test for Fusha: Add a task. Edit that task. Delete that task.
  - Problems he had: Couldn't see the current days not done while editing the task
  - Surprising comments: He liked the theming surprisingly
  - What I'd change: Make it so you can calculate and see the current days not done while editing the task\
- **Design Achievement 2**: Test for Sunku: Add a task. Edit that task. Delete that task.
  - Problems he had: No problems with it, just that I could style the buttons more
  - Surprising comments: He was impressed by the functionality of the table
  - What I'd change: Add more styling for the add, edit, and delete buttons
