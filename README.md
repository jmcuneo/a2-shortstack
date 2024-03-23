README
---
Olivia Perez: a2-oliviaperez.glitch.me/

## Medical Center Application Form
Summary: Inspired by the SoftEng project, I made an incredibly oversimplified application form for Very Real Medical Center.
Instructions: Fill in the 6 fields and press "Submit". To delete a submission, press "Delete" in the results table.
- **Fields**: first/last name, dob, sex, email, phone#
- **Derived Fields**:
  - fullName: combined from firstName and lastName
  - age: calculated from current date and dob - dob and age both in final results table (age calculation code from javapoint)
- **CSS**:
  - Positioning: grid 
  - Element Selectors: header, body, div, etc.
  - Id selectors: the sex marker (#sex) and submit button (#submit)
  - class selectors: input fields (.longInput) and button (.btn) 
  - Google Fonts: I used Mendali for h1, h2, and h3, and Noto Sans Soyombo for the rest.
- **JavaScript**: 
I found and modified code from Stack Overflow to insert cells into the results table. I also found code on JavaPoint to calculate age from a user date input. Figuring out how to add the DELETE Method and functionaltiy was the most difficult part for me, but through reasearch videos and articles I found IIFE. With trial and error with sample code from Udacity, I was able to figure out a working solution.

## Technical Achievements
- **Single Page App**: I just have an empty table in index.html beneath the form. The table is filled and shows 
itself when the user submits an application. From there the user can view and modify submitted applications if needed.

## Design/Evaluation Achievements
- **Design UX**: 
