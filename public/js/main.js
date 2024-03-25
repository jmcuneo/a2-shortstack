// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  if (validateForm()){
  const studentName = document.getElementById("student-name"),
        //credits = credits earned
        credits = document.getElementById("credits"),
        //grade = credits needed
        grade = document.getElementById("grade"),
        json = { studentName: studentName.value, credits: credits.value, grade: grade.value, },
        body = JSON.stringify( json );
  const response = await fetch( "/submit", {
    method:"POST",
    body 
  }).then(function(response){
    createTable();
  })

  return true;
}
}



window.onload = function() {
  createTable();
  const button = document.querySelector("button");
  button.onclick = submit;
}

const histCtr = 0;

const createTable = function(){
  let table = document.getElementById("students");
  // Create table header row
  let headerRow = table.insertRow(-1);
  headerRow.insertCell(0).innerHTML = "Name";
  headerRow.insertCell(1).innerHTML = "Credits Earned";
  headerRow.insertCell(2).innerHTML = "Credits Needed";
  headerRow.insertCell(3).innerHTML = "Credits Left";
  headerRow.insertCell(4).innerHTML = "Delete?";

  fetch("/getAppdata", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (json) {
      //loop all of students 
      let index = 0;
      for (let response of json) {
        //create row
        let row = table.insertRow(-1);
        //create cells
        row.insertCell(0).innerHTML = response.studentName;
        row.insertCell(1).innerHTML = response.credits;
        row.insertCell(2).innerHTML = response.grade;
        row.insertCell(3).innerHTML = response.creditsLeft;
        row.insertCell(4).innerHTML =`<button class='deleteButton' onclick=deleteStudent(${index})>Delete</button>`;
        index++;
      }

      let emptyRow = table.insertRow(-1);
      emptyRow.insertCell(0);
      emptyRow.insertCell(1);
      emptyRow.insertCell(2).innerHTML = "History Counter: " + histCtr;
      emptyRow.insertCell(3);
      emptyRow.insertCell(4);
    });

    
}

const deleteStudent = function(rowIndex) {
  let confirmDelete = confirm(
    "Are you sure you want to delete this student?"
  );
  if (confirmDelete) {
    const json = {
      deletingResponse: rowIndex,
    };

    let body = JSON.stringify(json);
    fetch("/delete", {
      method: "POST",
      body,
    }).then(function () {
      createTable();
    });
  }

}

const validateForm = function() {
  const studentName = document.getElementById("student-name").value;
  const credits = document.getElementById("credits").value;
  const grade = document.getElementById("grade").value;


  if (studentName === '' || credits === '' || grade === '') {
      alert('Please fill in all fields.');
      return false;
  } else if(isNaN(grade)||isNaN(credits)){
    alert ('Credits Needed and Credits Needed have to be a Number');
    return false;
  } else if(credits < 0 || grade < 0){
    alert("Credits Needed and Credits Earned have to be positive");
    return false;
  }else if (credits > grade){
    alert("Credits Earned has to be smaller than Credits Needed");
    return false 
  }

  return true;
}