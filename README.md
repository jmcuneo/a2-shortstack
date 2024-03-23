## Car Club
My project including submitting name, displaying data, adding data, deleting data, and updating data on the server memory. I used grid to divide the layout into left and right. I used margin, board, padding and so on to layout.


Baseline Requirements
---

- `Server`: Including GET（results function), POST(submit function, add function), DELETE(delete function), PUT(update function). Create a new field "Age" of appData, defined by currentYear - year.
- `Results`: Display all data in the memory as a table
- `Form/Entry`: Users can receive, add, delete, update data items residing in the server's memory
- `Server Logic`: A new field named "Age" defined by the function currentYear - year
- `Derived field`: Age is computed by "year" 



HTML:
- Displaying all data currently available on the server by using `<table>` tag 
- Users can input data items with inputBox
- Users can modify data items with buttons

CSS :
- Element selectors: gird, body, h1, input, button, p, table, th, td
- ID selectors: #left, #right, #yourname, #model, #year, #mpg
- Class selectors: .grid-container
- CSS positioning and styling of the primary visual elements in the application:
    - Use a CSS grid for layout
    - Use google font: "Tahoma","Century", sans-serif as font family
- CSS defined in a maintainable, readable form, in external stylesheets 

JavaScript:
- Fetch '/submit' '/add' '/result' '/delete' 'update' , method "GET" "POST" "DELETE" "PUT"

Node.js:
- Including "GET" "POST" "DELETE" "PUT", with link '/submit' '/add' '/result' '/delete' 'update'
- New Field "Age" defined by currentYear and year



Acheivements
---

*Technical*
- Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. 

- Including Submitting, Adding, Deleting, and Updating

s designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 




