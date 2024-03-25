
---

## Text Combiner Application
My website is very simple. I simply have two input boxes which take in any string. Upon clicking the "Combine!" button, the two strings are concatenated together with an added ' ' between them. The number of combined characters are then counted and logged as well. These two things, as well as the entry number, are then reported out in a table format.

## Technical Achievements
- **Tech Achievement 1**: 
The application utilizes a single-page approach to view and store the user input data. The bulk of the work is handled in the main.js file. The user input is taken in, concatenated, stringified, and then passed into the body. On a post, there is a table element which is accessed and edited. This is done by creating new cell elements, populating them with apporpriate data, and then appending them onto the table. This allows for the table to be shown and modified all on the same page.

- **Tech Achievement 2**: 
The modification button kind of stumped me. I think my issue was a misuse of the appdata array. My idea was to create an "edit" button associated with each row of the table. The button would then open a popup window, gather user input, and change the associated values. However, while the new input was taken in, the table did not update to reflect the change in value.

### Design/Evaluation Achievements
- **Design Achievement 1**:
I performed a user study with Connor Chartier. The task I gave him was very simple, to just provide 5 unique inputs to combine. He did view an earlier prototype of my site but I think that gave me the opportunity to actually make some of the design choices he recommended. Most of his issues were styistic in nature. One thing he caught was a redundancy in my labelling where I had the entry column restate "Entry x" when really that isn't grammatically needed. I never would have caught that on my own. He also suggested centering some of the elements, as well as changing the button text to be more fitting.

