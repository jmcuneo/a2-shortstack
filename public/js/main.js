// FRONT-END (CLIENT) JAVASCRIPT HERE
let appData = [];

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const val1 = document.querySelector("#chore"),
        val2 = document.querySelector("#rating"),
        val3 = document.querySelector("#length"),
        val4 = document.querySelector("#finished").checked,
        val5 = calculatePriority(val2, val3),
        json = {chore: val1.value, rating: val2.value, length: val3.value, finished: val4, priority: val5},
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  localStorage.setItem("dataRow", body);
  //dataArray.push(body);
  //console.log(body);
  appData.push(json);
  //console.log(appData.length);
  displayData()
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
  displayTable()
}

function displayData() {
  let tbody = document.getElementById("trow");
  const table = document.getElementById("table");

  let taskObject = localStorage.getItem("dataRow");
  let parsedObject = JSON.parse(taskObject);

    tbody.innerHTML += "<tr><td>" + parsedObject.chore + "</td><td>" + parsedObject.rating 
    + "</td><td>" + parsedObject.length + "</td><td>" 
    + parsedObject.finished + "</td><td>" + parsedObject.priority +"</td></tr>";
    
}

function calculatePriority(rating, length) {
  // calculate rating * length
  // sort the chores based on that calculation somehow
  // then make the priority like 1st, 2nd, 3rd, etc.
  // this probably requires some sort of array
  return rating * length;

}

function displayTable() {
  
  let tbody = document.getElementById("trow");
  const table = document.getElementById("table");

  let taskObject = localStorage.getItem("dataRow");
  let parsedObject = JSON.parse(taskObject);
  appData.forEach((element) => {
    tbody.innerHTML += "<tr><td>" + element.chore + "</td><td>" + element.rating 
    + "</td><td>" + element.length + "</td><td>" 
    + element.finished + "</td><td>" + element.priority +"</td></tr>";
  });
}

