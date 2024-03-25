Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title
This project is a simple inventory manager. The user clicks items in the item pool to move them in/out of the inventory.
Users can add items to the item pool by typing an object name and it will be displayed in the pool. Valid icons can be
found here: https://fontawesome.com/icons. Most things are left justified on this page, but grids were used to organize
the items inside the inventory and item pool.
## Technical Achievements
- **Tech Achievement 1**:
I created a single-page app that utilizes a form to send data to the server. The appdata looks like:
[
  { "item": "paperclip", "value": 1,     "weight": 1,        "inInventory": false},
  { "item": "bicycle",   "value": 50,    "weight": 120000,   "inInventory": false},
  { "item": "car-side",  "value": 20000, "weight": 1000000,  "inInventory": false},
  { "item": "guitar",    "value": 200,   "weight": 1500,     "inInventory": false},
]
When the user submits data, the inInventory field gets set to false. The server also tracks
the inventory's value and weight

let inventoryValue = 0
let inventoryWeight = 0



### Design/Evaluation Achievements
- **Design Achievement 1**: 

1. I tested my site with 2 students. Their last names are Medina and Chadbourne
2. The users ran into an issue when adding items to the pool. I didn't set the strings to lowercase
and it inserted a blank item into the pool
3. One of my users thought the value was how many of that item would be added to the pool. I also
noticed users tried dragging items into the inventory
4. I would create a tag for the items so the users know what they are called. This would help them mod/delete items
I would also make a dropdown list so users cannot put in invalid submissions