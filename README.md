# Code Runner
This project runs user sumbited code in a isolated javascript instance and then shows that result to the user. Simply put your varible name and code in the form and press add. If the varible already exists, the button will change to modify. You can also hit the buttons to recalculate, modify, or delete varibles. You can also refreh the data with the refresh button. When a varible name is not allowed, it is replaced with noname# where # starts at 1 and increases as to not override other nonames. Varibles are cloned when passed to other calculations so varibles can't be modified, though their clones can be returned. The code entered is run in eval, so code can be interpreted weirdly. Most notably objects are interpreted as a block with labels inside, so: {name:value} => {*name:* return value;} This can be fixed by putting the object in parentheses: ({name:value})

## Technical Achievements
- **Single-Page App**: made the project as single page application where anytime the data is changed on the client, new data is sent
- **Refresh Button**: made a refresh button so sthat new data can be fetched without adding or changing data 
- **Recalculate Button**: made a button to recalculate a varible
- **Modify Button**: made a button to modify a varible, this puts the varible name and code in the form 
- **Delete Button**: made a button to delele a varible
- **Isolation**: made the user submitted code run in an isolated javascript instance as to protect the server. this uses the isolated-vm npm package. I tried the sandcastle package before that but it didn't work as it kept timing the code out. 
- **Names**: the server code checks the validity of varible names. Bad names are replaced with noname# where # starts at 1 and increases.
- **Hosting**: Glitch did not like the isolated-vm package and failed to install it. I then tried to install it on my raspberry pi running my webserver. The isolated-vm package tried to install infinitely, and crashed the device. I am now running the server 
- **Glitch**: The glitch project now redirects to my new hosting

## Design/Evaluation Achievements
- **Gradient**: used same gradient from last project and my website
- **Used Roboto**: used roboto from google fonts like last project
- **TextArea**: made the code input a \<textarea> so the user could expand the input box
- **Colors**: made the buttons different colors. the buttons flip colors on hover
- **Readme Page**: made a page to host the project description and instructions
- **Feedback**: V down below V


## Feedback
1. Provide the last name of each student you conduct the evaluation with.
    Milo Jacobs
2. What problems did the user have with your design?
    They did not understand that the name field was for varible names. My script was a little confusing in that aspect as I put varible names in quotes and also had the him enter a human name. They did not see the readme button either until I told them about it. After they read the readme page, they understood how to use it better.
3. What comments did they make that surprised you?
    I was kinda suprised about his iterpretation of the form labels, but looking back I agree it was confusing.
4. What would you change about the interface based on their feedback?
    I would make the readme button bigger and change it's location. I would chnge the labels to more descripitve names.

## Feedback Script
1. add varibles *firstName*, *lastName*, *middleName* with values
2. add varible *Name* where they are concatenated
3. change *middleName*
4. fix varible name
5. delete lastname
6. Challenge: make me a self referential object

## Check List

### HTML (4 pts each, total 16 pts):
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application ✅
- A results page displaying all data currently available on the server. You will most likely use a `<table>` tag for this, but `<ul>` or `<ol>` could also work and might be simpler to work with. Alternatively, you can create a single-page app (see Technical Acheivements) but this is not a requirement. ✅
- All pages should [validate](https://validator.w3.org) ❌
- If your app contains multple pages, they should all be accessible from the homepage (index.html) ✅

### CSS (4 pts each, total 16 pts):
- CSS styling of the primary visual elements in the application ✅
- Various CSS Selector functionality must be demonstrated:
    - Element selectors ✅
    - ID selectors ✅
    - Class selectors ✅
- CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid ✅ or flexbox for layout 
    - Rules defining fonts for all text used; no default fonts! Be sure to use a web safe font or a font from a web service like [Google Fonts](http://fonts.google.com/)
- CSS defined in a maintainable, readable form, in external stylesheets ✅

### JavaScript (4 pts):
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; ✅

### Node.js (4 pts):
- An HTTP Server that delivers all necessary files and data for the application, and also creates the required `Derived Fields` in your data. ✅

### Deliverables
1. (5 pts) Fork the starting project code repo. The starter code in the repo may be used or discarded as needed. ✅
2. (60 pts, detailed above) Implement your project with the above requirements. ✅
3. Test your project to make sure that when someone goes to your main page, it displays correctly. ❌
4. (5 pts) Deploy your project to Glitch, and fill in the appropriate fields in your package.json file. ❌
5. (5 pts) Ensure that your project has the proper naming scheme `a2-FirstnameLastname` so we can find it. ❌
6. (5 pts) Modify the README to the specifications below, and delete all of the instructions originally found in this README. ❌
7. (5 pts) Create and submit a Pull Request to the original repo. Be sure to include your name in the pull request. ❌

### Technical*
- (5 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display. ✅

- (5 points) In addition to a form enabling adding and deleting data on the server, also add the ability to modify existing data. ✅

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