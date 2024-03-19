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
    var namecell = row.insertCell();
    var agecell = row.insertCell();
    var bdaycell = row.insertCell();
    var cakecell = row.insertCell();
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

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
  loadData();
}