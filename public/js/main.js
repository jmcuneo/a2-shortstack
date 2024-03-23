// FRONT-END (CLIENT) JAVASCRIPT HERE


var getPeople = async function () {

  var response = await fetch ( "/getPeople", {
    method:"GET"
  })
  var text = await response.text();
  let peopleData = JSON.parse(text);

  return peopleData
}

const submitAdd = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  //Takes the first and last name of the person as well as their age
  const input = document.querySelectorAll( "#firstName, #lastName, #age" ),
        json = { firstName: input[0].value, lastName: input[1].value, age: input[2].value},
        body = JSON.stringify( json );

  const response = await fetch( "/submitAdd", {
    method:"POST",
    body 
  })

  const text = await response.text();
  addDataToTable(peopleTable);

};

const submitRemove = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  //Takes the ID to remove the user from the list
  const input = document.querySelector( "#id" ),
        json = { id: input.value},
        body = JSON.stringify( json );

  const response = await fetch( "/submitRemove", {
    method:"POST",
    body 
  });

  const text = await response.text();

  addDataToTable(peopleTable);
};

window.onload = function() {
    const buttonAdd = document.querySelector("#buttonAdd");
    buttonAdd.onclick = submitAdd;

    const buttonRemove = document.querySelector("#buttonRemove");
    buttonRemove.onclick = submitRemove;

    var peopleTable = document.querySelector("#peopleTable");
    addDataToTable(peopleTable);
};


async function addDataToTable(table){

  table.innerHTML = "";

  let peopleData = await getPeople();
  let columnNames = Object.keys(peopleData[0])
  let tableHead = table.createTHead();
  let row = tableHead.insertRow();

  for (let person of peopleData){
    let row = table.insertRow();

    for (const property in person) {
      let data = row.insertCell();
      let content = document.createTextNode(person[property]);
      data.appendChild(content);
    }
  }

  for (let name of columnNames){
    let th = document.createElement("th");
    let cName = document.createTextNode(name);
    th.appendChild(cName);
    row.appendChild(th);
  }
};

