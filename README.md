## Basic To-Do Application

This is a simple to-do application that allows users to add, edit, and delete tasks. Users can add new tasks, mark tasks as completed, and delete tasks.

The front-end utilizes HTML, CSS, and JavaScript, with a focus on Flexbox for CSS positioning to create a responsive layout. The back-end is built with Node.js and Express, offering RESTful APIs to interact with the to-do list.

## Technical Achievements

- **Single-Page Application (SPA):** Implemented a single-page application that interacts with the server via asynchronous JavaScript (AJAX), allowing users to submit data and immediately see the updated state without reloading the page. This includes the addition, deletion, and modification of tasks.
- **Dynamic Time Calculation:** Added a server-side feature to calculate the time since each task was added, displaying this information in a human-readable format ("X minutes ago") that updates dynamically as time progresses.
- **UUID for Task Identification:** Utilized the uuid library to generate unique identifiers for each task, ensuring proper data handling and preventing ID collisions.

### Design/Evaluation Achievements

- **CSS Styling:** Applied CSS to enhance the visual appeal and usability of the application.
- **Responsive Design with Viewport Units:** Used viewport width (vw) and height (vh) units to ensure the to-do application offers a responsive and engaging user experience across different devices.
- **Conducted User Testing:** Conducted user testing with two users to gather feedback on the application's usability and design, leading to improvements in the user interface and overall user experience.

### Feedback from User Testing

**Lui:**

- **Positive Feedback:** Liked the clean and minimalistic design of the application.
- **Constructive Feedback:** Suggesting increasing the size of the task input field and add button for adding tasks to make them more prominent.
- **Changed Features:** Increased the size of the input field and the font size of the add button to improve visibility and usability.

**Hu:**

- **Positive Feedback:** Liked the quick response time when adding, editing, and deleting tasks from the server.
- **Constructive Feedback:** Suggested increasing the size of the container for tasks to make it easier to read and interact with the tasks.
- **Changed Features:** Expanded the container in the css and added vw and vh units to make the application more responsive.
