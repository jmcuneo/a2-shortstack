
## Car Table Website

https://a2-hanzalah416.glitch.me/

This project is a web-based car data management application that allows users to interact with a dataset of cars. Users can add new car entries, delete existing ones, and update car details directly within a dynamic table. The application calculates and displays the driving range for each car based on its MPG and gallons.

CSS Positioning Techniques:
 Flexbox is utilized for creating flexible and responsive layouts, especially noticeable in form groups and the data form, which adjusts to different screen sizes using media queries. Margins and paddings are applied for spacing, while text alignment and border styling are employed for visual structure and aesthetics. These techniques collectively ensure a responsive, well-structured, and visually appealing design, with special attention to usability on both large and small screens.

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
