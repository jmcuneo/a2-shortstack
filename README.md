#### Edison Zhang : https://a2-edisonzhang.glitch.me/

## RPE Calculator
A RPE (Rating of Perceived Exertion) calculator to help determine what weight you should be lifting for your next set. For example, if lifting 225 lb for 3 reps felt around an RPE 8 and I want to lift an rpe 9 for a single, I can input it into the calculator and get suggested weight of 240 lb.

## Technical Achievements
- **Tech Achievement 1**: Used post request to send data (weight, rpe, and reps) to the backend server and return a response containing updated data app. After the response is received, ``loadTable`` is called to display the data.
- **Tech Achievement 2**: The user can select how many reps they want for the suggested weight by clicking the rep button and it will show the weight and rpe for that desired weight. 
- **Tech Achievement 3**: The data can be modified by changing the weight, rpe, or reps and click calculate again. The server holds all the necessary information to calculate the tables.

#### HTML:
- 2 HTML forms are used with appropriate tags and a select is used to input the data.
- All the data is represented on the table
- All pages validate
- One Page

#### CSS:
- Used CSS to group the input section
- Used CSS grid for layout
- Used element selector, ID selectors
- Defined fonts
- CSS defined in a external stylesheet

#### JavaScript:
- Front-end JavaScript is used to read the data and display them in the data

#### Node.js:
- An HTTP Server that delivers all necessary files and data for the application, and also creates the required Derived Fields in your data. A starting point is provided in this repository.

## Design/Evaluation Achievements
Task for them to complete: Input a weight that you can bench for x reps at y rpe (user can choose rpe, weight, and reps if they know it. Default is: 135 lb for 4 reps at RPE 7). Find the weight you can bench at rpe 9 for 2 reps.

#### User 1: Tom
- Problems: They are not sure which rep is currently selected. They assumed it is defaulted to 1.
- Comment: They like the basic color. They like how values are temporary and do not have to clear it before entering anything.They like how the input is grouped into one container and the table in another. 
- Changes: I would make the selected button change color.
#### User 2: MacNevin
- Problems: Should have a text to explain what RPE is and what the calculator might be used for.
- Comment: The UI is easy to understand and navigate and easy on the eyes.
- Changes: I would add a button to bring the user to an about page that explains what an RPE is and the purpose of an RPE calculator.