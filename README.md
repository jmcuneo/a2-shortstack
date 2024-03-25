# Webware Assignment 2

## 24 Mar 2024

## Ivy Bixler

## CAR INFORMATION WEBSITE.NET.COM.ORG

a basic and poorly designed car data website

users may add data, the make and model must be a string so 2000 is not a valid brand or model but s2000 is

## Technical Achievements

- **create a signle page app**:
  * i cheated a little bit on this one, the update is not sent in the response because i realized that it had to automatically update so on the submit and delete buttons I added a .finally block which fetches the data using another end point but the effect is the same
- **provide provisions for updating and deleting**
  * a user may modify the existing data by entering the model make and year and then they may enter new values for mpg lateral g force and 0 to 60, fields not filled will default to 0 this was pretty simple since i didnt make sure empty fields stayed the same
    * i created an object that holds the nescicary functions, i dont think they are actually anonomous though.
    * to do the average i create a function that take an array and a field as perameters then I have an array of the keys, i got frustrated trying to figure out how to make it work using Object.* methods so i just did it the cheap way. mainAvg takes a self argument which just gets passed as data because this is so fleeting in js and i got sick of trying to figure it out. A for each is used to iterate through each different field if the field happens to be a string then its length is used, if there is no data then the averages are set to zero
    * an exists function check if the model sent in exists and if it does its 3 latter fields are updated
    * delete works much the same way if the first 3 fields match that entry is deleted

## Design Achievements

- **UX Study8**
  * labrat : chadbourne
    * found my typeface illegible
      * not changing i think its funny silly
      * in the next assignment i will go for quality over goofyfactor
    * found a bug in my code where some things were made lowercase but not others meaning that it was impossible to delete or modify a car whos name or make had a capital letter
      * i did fix that
  