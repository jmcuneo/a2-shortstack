// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  //if (validateForm()){
  const studentName = document.getElementById("student-name")
        credits = document.getElementById("credits"),
        grade = document.getElementById("grade"),
        json = { studentName: studentName.value, credits: credits.value, grade: grade.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    headers: {
      'Content-Type': 'text/plain'
   },
    body 
  }).then(function(response){
    addStudent()
    clear()
  })

  return true;
}
//}



window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}


function addStudent(){
  let table = document.getElementById("responses");
  table.innerHTML =
    "<tr><th>Name</th><th>Credits Earned</th><th>Credits Needed</th><th>Credits Left</th><th>Delete?</th></tr>";
  fetch("/getResponses", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (json) {
      let index = 0;
      for (let response of json) {
        
        response.responseNum = index;
        let row = table.insertRow(-1);
        
        let name = row.insertCell(0);
        let credsEarned = row.insertCell(1);
        let credsNeeded = row.insertCell(2);
        let credsLeft = row.insertCell(3);
        let deleteButton = row.insertCell(4);

        row.cells[0].innerHTML = response.studentName;
        row.cells[1].innerHTML = response.credits;
        row.cells[2].innerHTML = response.grade;
        row.cells[3].innerHTML = response.creditsLeft;   
        row.cells[4].innerHTML =
          `<button class='deleteButton' onclick=deleteStudent(${index})>Delete</button>`;
        index++;
        
      }
    });
}

function clear(){
  document.getElementById("student-name").value ="";
  document.getElementById("credits").value = "";
  document.getElementById("grade").value = "";
}

function deleteStudent(rowIndex) {
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
      addStudent();
    });
  }
}

function validateForm() {
  const studentName = document.getElementById("student-name").value;
  const credits = document.getElementById("credits").value;
  const grade = document.getElementById("grade").value;


  if (studentName === '' || credits === '' || grade === '') {
      alert('Please fill in all fields.');
      return false;
  }


  
  return true;
}