Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: March 24th, by 11:59 PM.

This assignment aims to introduce you to creating a prototype two-tiered web application. 
Your application will include the use of HTML, CSS, JavaScript, and Node.js functionality, with active communication between the client and the server over the life of a user session.

Baseline Requirements
---

There is a large range of application areas and possibilities that meet these baseline requirements. 
Try to make your application do something useful! A todo list, storing / retrieving high scores for a very simple game... have a little fun with it.

Your application is required to implement the following functionalities(4 pts each, total 20 pts):

- a `Server` which not only serves files, but also maintains a tabular dataset with 3 or more fields related to your application
- a `Results` functionality which shows the entire dataset residing in the server's memory
- a `Form/Entry` functionality which allows a user to add or delete data items residing in the server's memory
- a `Server Logic` which, upon receiving new or modified "incoming" data, includes and uses a function that adds at least one additional derived field to this incoming data before integrating it with the existing dataset
- the `Derived field` for a new row of data must be computed based on fields already existing in the row. 
For example, a `todo` dataset with `task`, `priority`, and `creation_date` may generate a new field `deadline` by looking at `creation_date` and `priority`

Your application is required to demonstrate the use of the following concepts:

HTML (4 pts each, total 16 pts):
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application
- A results page displaying all data currently available on the server. You will most likely use a `<table>` tag for this, but `<ul>` or `<ol>` could also work and might be simpler to work with. Alternatively, you can create a single-page app (see Technical Acheivements) but this is not a requirement.
- All pages should [validate](https://validator.w3.org)
- If your app contains multple pages, they should all be accessible from the homepage (index.html)

CSS (4 pts each, total 16 pts):
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Element selectors
    - ID selectors
    - Class selectors
- CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid or flexbox for layout
    - Rules defining fonts for all text used; no default fonts! Be sure to use a web safe font or a font from a web service like [Google Fonts](http://fonts.google.com/)
- CSS defined in a maintainable, readable form, in external stylesheets 

JavaScript (4 pts):
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository.

Node.js (4 pts):
- An HTTP Server that delivers all necessary files and data for the application, and also creates the required `Derived Fields` in your data. 
A starting point is provided in this repository.

Deliverables
---

1. (5 pts) Fork the starting project code repo. The starter code in the repo may be used or discarded as needed.
2. (60 pts, detailed above) Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page, it displays correctly.
4. (5 pts) Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.
5. (5 pts) Ensure that your project has the proper naming scheme `a2-yourGithubUsername` so we can find it.
6. (5 pts) Modify the README to the specifications below, and delete all of the instructions originally found in this README.
7. (5 pts) Create and submit a Pull Request to the original repo. Label the pull request as follows: a2-gitusername-firstname-lastname

Acheivements
---

Below are suggested technical and design achievements. You can use these to help customize the assignment to your personal interests. These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README and why it was challenging. ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM. Remember, the highest grade you can get on any individual assignment is a 100%.

*Technical*
- (5 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display.

- (5 points) In addition to a form enabling adding and deleting data on the server, also add the ability to modify existing data.

*Design/UX*
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also fine). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts, or conduct the studies in person. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title
Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.

## Technical Achievements

- **Tech Achievement 1**: Single-Page Application with Real-Time Data Display
  - This application is a single-page app (SPA), which means all interactions occur on one web page without the need for page reloads or navigation to different pages. Here are the key features:
    - **Data Submission:** Users can submit data (model, year, mpg, and gallons) using a form provided on the page.
    - **Server-Side Processing:** Upon submission, the server processes the data, calculates the derived field (`range`), and adds the new data to the server-side dataset.
    - **Real-Time Data Display:** The server responds with the updated dataset, which includes the newly added data along with the calculated `range`. The client-side JavaScript then uses this updated dataset to refresh the data display on the page, ensuring that users always see the current state of the server-side data.

- **Tech Achievement 2**: Ability to Modify Existing Data
  - In addition to adding and deleting data, the application provides the ability to modify existing data directly within the table:
    - **Editable Table Cells:** Table cells for model, year, mpg, and gallons are made editable using the `contenteditable` attribute, enabling users to make changes directly in the table.
    - **Update Functionality:** An "Update" button is provided for each row. When clicked, it triggers a function to send the updated data to the server.
    - **Server-Side Update:** The server receives the updated data, recalculates the `range` if necessary, and updates the corresponding entry in the dataset. It then responds with the updated dataset, and the client refreshes the data display to reflect the changes.

- **Tech Achievement 3**: Responsive Design
  - The application uses CSS Flexbox and media queries to ensure that the form and table are responsive and adapt to different screen sizes. This ensures a consistent user experience across various devices.

- **Tech Achievement 4**: Client-Server Communication
  - The application demonstrates effective client-server communication using asynchronous JavaScript (`fetch` API) for data retrieval and updates. This includes handling `GET` and `POST` requests to interact with the server-side data.

- **Tech Achievement 5**: Input Validation
  - The application includes input validation to ensure that users enter valid numbers for the year, mpg, and gallons fields before submitting the data for updates.

- **Tech Achievement 6**: Styling and Layout
  - The application uses CSS for styling and layout, including element, ID, and class selectors, as well as advanced layout techniques like Flexbox. The use of external stylesheets keeps the CSS maintainable and readable.

### Design/Evaluation Achievements
## Design Achievements

- **Design Achievement 1**: CSS Styling of Primary Visual Elements
  - The application features comprehensive CSS styling for primary visual elements such as forms, tables, and buttons. This enhances the visual appeal and user experience of the application.

- **Design Achievement 2**: CSS Selector Functionality
  - The application demonstrates the use of various CSS selectors to apply styles effectively:
    - **Element Selectors:** Used to style HTML elements like `body`, `table`, `th`, and `td`.
    - **ID Selectors:** Used to style specific elements with unique IDs, such as `#data-form` and `#data-table`.
    - **Class Selectors:** Used to style groups of elements with common classes, such as `.button`, `.delete-button`, and `.update-button`.

- **Design Achievement 3**: CSS Positioning and Layout
  - The application uses CSS Flexbox for layout, ensuring a flexible and responsive design. This is particularly evident in the horizontal layout of the form and the responsive behavior of the table and form on different screen sizes.

- **Design Achievement 4**: Font Rules and Typography
  - The application employs a web-safe font ('Roboto') from Google Fonts, ensuring consistent and attractive typography across different browsers and devices.

- **Design Achievement 5**: Maintainable and Readable CSS
  - The CSS is organized in an external stylesheet (`main.css`), making it easy to maintain and read. The stylesheet is well-structured with comments separating different sections, and styles are grouped logically.

## Evaluation Achievments:

## Evaluation Achievements:

### Participants:

- Peavey : User1
- Weinstein: User2

### User Feedback and Changes:

### User1 Feedback

**Problems Identified:**
- **Lack of Discoverability:** Users were not aware that they could input values other than the defaults for the car.
- **Difficulty in Updating Gallons Value:** Users had trouble updating the gallons value, indicating that the process was not intuitive.

**Surprising Comments:**
- The placement of the update button was not intuitive, making it difficult for users to understand how to confirm their changes.

**Changes Made:**
- **Improve Discoverability:** Added clear instructions to indicate that users can input values other than the defaults for the car.
- **Simplify Updating Process:** Made the update button more prominent and repositioned it closer to the fields that are being updated.
- **Intuitive Button Placement:** Conducted usability testing to find a more intuitive location for the update button.

#### User2's Feedback:

**Problems Identified:**
- **Confusion with 'Gallons' Input:** Users were unsure what the "gallons" input field represented, but eventually deduced it referred to the tank size.

**Surprising Comments:**
- The application's functionality was well-received, but the color scheme was considered too simple.

**Changes Made:**
- **Clarify Input Labels:** Changed the label of the "gallons" input to "Tank Size" for better clarity.
- **Enhance Color Scheme:** Added more vibrant colors and varied the color palette to make the interface more visually appealing.
- **Adjust Sizing:** Reviewed and adjusted the sizing of elements on the interface for better proportion and readability.
