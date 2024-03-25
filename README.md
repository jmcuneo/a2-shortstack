# DONE

(4pts) One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application

(4pt) A results page displaying all data currently available on the server. You will most likely use a `<table>` tag for this, but `<ul>` or `<ol>` could also work and might be simpler to work with. Alternatively, you can create a single-page app (see Technical Acheivements) but this is not a requirement.

(4pt) If your app contains multple pages, they should all be accessible from the homepage (index.html)

(4pt) CSS styling of the primary visual elements in the application

(4pt) Various CSS Selector functionality must be demonstrated:
    - Element selectors (button, td, th)
    - ID selectors (everything)
    - Class selectors (days-until-due)

(4pt) CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid or flexbox for layout
    - Rules defining fonts for all text used; no default fonts! Be sure to use a web safe font or a font from a web service like [Google Fonts](http://fonts.google.com/)

(4pt) CSS defined in a maintainable, readable form, in external stylesheets 

(4pt) At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository.

(4pt) An HTTP Server that delivers all necessary files and data for the application, and also creates the required `Derived Fields` in your data. 
A starting point is provided in this repository.

(5 pts) Fork the starting project code repo. The starter code in the repo may be used or discarded as needed.

(5 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display.

# TODO

(4pt) All pages should [validate](https://validator.w3.org)

(5 pts) Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.

 (5 pts) Ensure that your project has the proper naming scheme `a2-FirstNameLastName` so we can find it.

(5 pts) Modify the README to the specifications below, and delete all of the instructions originally found in this README.

(5 pts) Create and submit a Pull Request to the original repo. Label the pull request as follows: a2-gitusername-firstname-lastname

- (5 points) In addition to a form enabling adding and **deleting** data on the server, also add the ability to modify existing data.

# REQUIREMENTS



1
2. (60 pts, detailed above) Implement your project with the above requirements.


Acheivements
---

Below are suggested technical and design achievements. You can use these to help customize the assignment to your personal interests. These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README and why it was challenging. ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM. Remember, the highest grade you can get on any individual assignment is a 100%.




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



Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## TODO App

I made a simple TODO app with flex-box styling. To use, input your task name into the text input, create a due date now or in the future, and hit submit. Every time the submit button is clicked, the updated list is retrieved from the server and displayed in a new table underneath the submit form.

## Technical Achievements
- **Tech Achievement 1**: 


### Design/Evaluation Achievements
- **Design Achievement 1**: 

## Credit

I used the sorting algorithm from [W3 schools](https://www.w3schools.com/howto/howto_js_sort_table.asp) to sort my table by days until due.