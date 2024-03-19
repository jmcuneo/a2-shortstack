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
  console.log("submitted data")
  loadData()
}

async function loadData() {
 
  const response = await fetch( "/appdata", {
    method:"GET"
  })
  const text = await response.text()
  console.log("loaded data")
  fillTable(text);
}

async function fillTable(text) {

  var table = document.querySelector(" #datatable ");
  table.innerHTML = '';
  const data = JSON.parse(text);

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
    var del = document.createElement('button');
    del.type = "button";
    del.innerHTML = "delete";
    del.onclick = (function(elt) {return function() {delEntry(elt);}})(elt);
    row.appendChild(del);

    idcell.innerHTML = elt.id;
    namecell.innerHTML = elt.name;
    agecell.innerHTML = elt.age;
    bdaycell.innerHTML = elt.birthday;
    cakecell.innerHTML = elt.preferredCake;

    idcell.onclick = (function(elt) {return function() {fillEntry(elt);}})(elt);
  }
}

const delEntry = async function(elt) {
  const id = elt.id,
        json = { "id": id },
        body = JSON.stringify( json )

  const response = await fetch( "", {
    method:"DELETE",
    body 
  })
  const text = await response.text()
  console.log(text)
  loadData()
}

const fillEntry = async function(elt) {
  const id = document.querySelector( "#id" ),
        name = document.querySelector( "#name" ),
        age = document.querySelector( "#age" ),
        bday = document.querySelector( "#bday" ),
        cake = document.querySelector( "#cake" )


  console.log(elt);
  id.value = elt.id
  name.value = elt.name
  age.value = elt.age
  bday.value = elt.birthday
  cake.value = elt.preferredCake
}

const updateEntry = async function( event ) {
  event.preventDefault();

  const id = document.querySelector( "#id" ),
        name = document.querySelector( "#name" ),
        age = document.querySelector( "#age" ),
        bday = document.querySelector( "#bday" ),
        cake = document.querySelector( "#cake" ),
        json = { id: id.value, name: name.value, age: age.value, birthday: bday.value, preferredCake: cake.value},
        body = JSON.stringify( json )
  console.log(json)

  const response = await fetch( "", {
    method:"PATCH",
    body 
  })
  const text = await response.text()
  console.log("updated data")
  loadData()
}

window.onload = function() {
  const submitBtn = document.querySelector("button#submit");
  submitBtn.onclick = submit;
  const updateBtn = document.querySelector("button#update");
  updateBtn.onclick = updateEntry;
  loadData();
}