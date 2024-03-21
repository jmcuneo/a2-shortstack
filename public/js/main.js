// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const name = document.querySelector( "#yourname" ),
        bday = document.querySelector( "#yourbday" ),
        cake = document.querySelector( "#yourcake" ),
        json = { name: name.value, birthday: bday.value, preferredCake: cake.value},
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })
  const text = await response.text()
  console.log(text)
  emptyForms()
  loadData()
}



/**
 * function to get app data from server
 */
async function loadData() {
 
  const response = await fetch( "/appdata", {
    method:"GET"
  })
  const text = await response.text()
  console.log("loaded data")

  // if data is sent back fill table with data
  fillTable(text);
}



/**
 * function to empty submit and update forms
 */
async function emptyForms() {
  const sname = document.querySelector( "#yourname" ),
        sbday = document.querySelector( "#yourbday" ),
        scake = document.querySelector( "#yourcake" )

  sname.value = ''
  sbday.value = ''
  scake.value = ''

  const uid = document.querySelector( "#id" ),
        uname = document.querySelector( "#name" ),
        uage = document.querySelector( "#age" ),
        ubday = document.querySelector( "#bday" ),
        ucake = document.querySelector( "#cake" )

  uid.value = ''
  uname.value = ''
  uage.value = ''
  ubday.value = ''
  ucake.value = ''
}



/**
 * function to fill table with data
 * @param {*} text the app data sent from server in string form
 */
async function fillTable(text) {

  // get table and empty it
  var table = document.querySelector(" #datatable ");
  table.innerHTML = '';

  // parse data
  const data = JSON.parse(text);

  // iterate over each entry and add a new table row for each entry, new table cell for each attribute
  for(const elt of data) {

    var row = table.insertRow();
    var idcell = row.insertCell();
    idcell.id = "idcell";
    var namecell = row.insertCell();
    namecell.id = "namecell";
    var agecell = row.insertCell();
    agecell.id = "agecell";
    var bdaycell = row.insertCell();
    bdaycell.id = "bdaycell";
    var cakecell = row.insertCell();
    cakecell.id = "cakecell";

    // for each entry add a delete button for that entry
    var del = document.createElement('button');
    del.type = "button";
    del.innerHTML = "delete";

    // set onclick event to call delete function
    del.onclick = (function(elt) {return function() {delEntry(elt);}})(elt);

    // add new elements and set their values
    row.appendChild(del);

    idcell.innerHTML = elt.id;
    namecell.innerHTML = elt.name;
    agecell.innerHTML = elt.age;
    bdaycell.innerHTML = elt.birthday;
    cakecell.innerHTML = elt.preferredCake;

    // set on click for each id cell to call fill entry function
    idcell.onclick = (function(elt) {return function() {fillEntry(elt);}})(elt);
  }
}



/**
 * function to delete an entry from app data
 * @param {*} elt the entry to delete
 */
const delEntry = async function(elt) {

  // get the id to delete, add it to request, and make delete request to server
  const id = elt.id,
        json = { "id": id },
        body = JSON.stringify( json )

  const response = await fetch( "", {
    method:"DELETE",
    body 
  })

  // get server response and reload updated data
  const text = await response.text()
  console.log(text)
  emptyForms()
  loadData()
}



/**
 * function to fill the update form with an entry
 * @param {*} elt the entry to fill into the update form
 */
const fillEntry = async function(elt) {

  // get the html elements of the form
  const id = document.querySelector( "#id" ),
        name = document.querySelector( "#name" ),
        age = document.querySelector( "#age" ),
        bday = document.querySelector( "#bday" ),
        cake = document.querySelector( "#cake" )

  // update the element values to the selected entry values
  id.value = elt.id
  name.value = elt.name
  age.value = elt.age
  bday.value = elt.birthday
  cake.value = elt.preferredCake
}



/**
 * function to udpate an entry in app data
 * @param {*} event 
 */
const updateEntry = async function( event ) {

  // don't allow enter to reload page
  event.preventDefault();

  // get the html elements of the update form, then create a new object and stringify it
  const id = document.querySelector( "#id" ),
        name = document.querySelector( "#name" ),
        age = document.querySelector( "#age" ),
        bday = document.querySelector( "#bday" ),
        cake = document.querySelector( "#cake" ),
        json = { id: parseInt(id.value), name: name.value, age: parseInt(age.value), birthday: bday.value, preferredCake: cake.value},
        body = JSON.stringify( json )

  // send string as a PATCH request to server
  const response = await fetch( "", {
    method:"PATCH",
    body 
  })

  // get reponse from server and reload updated data
  const text = await response.text()
  console.log(text)
  emptyForms()
  loadData()
}



// on window load, set submit and update button onclick events, then load the app data
window.onload = function() {
  const submitBtn = document.querySelector("button#submit");
  submitBtn.onclick = submit;
  const updateBtn = document.querySelector("button#update");
  updateBtn.onclick = updateEntry;
  loadData();
}