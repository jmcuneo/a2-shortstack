// FRONT-END (CLIENT) JAVASCRIPT HERE
var count = 1; //variable for counting entries in data table

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  //getting input from user
  //front string and backstring are from textbox 
  //they get concatenated together
  //calculate string length
  //send string to json and then to body
  const frontString = document.querySelector( "#frontstring" ).value,
        backString = document.querySelector("#backstring").value,
        concatenatedString = frontString + ' ' + backString,
        stringLength = concatenatedString.length - 1,
        json = { concatenatedString },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })
  
  const text = await response.text();
  //get table element to be modified
  const tableElement = document.getElementById('responseTable');
  //create appropriate spots in table element
  const nextRow = document.createElement('tr');
  const cell1 = document.createElement('td');
  const cell2 = document.createElement('td');
  const cell3 = document.createElement('td');
  const cell4 = document.createElement('td');
  const cell5 = document.createElement('td');
  const delButton = document.createElement('button');
  const editButton = document.createElement('button');
  delButton.textContent = 'Delete Row';
  editButton.textContent = 'Edit Row';
  
  //add count to left-most table cell and increment count
  cell1.textContent = count;
  count++;
  
  //parsedData = JSON.parse(body);
  
  //add user input to cells
  cell2.textContent = concatenatedString;
  cell3.textContent = stringLength;

  //build edit and delete button functionality
  delButton.addEventListener('click',function() {
    tableElement.removeChild(nextRow);
  });
  editButton.addEventListener('click', function() {
     let buttonNum = count;
     const newInput = prompt('Enter new value: ');
     concatenatedString = newInput;
     stringLength = newInput.length - 1;
     this.cell2.textContent = concatenatedString;
     this.cell3.textContent = stringLength;
  });

  //append buttons to cells
  cell4.appendChild(delButton);
  cell5.appendChild(editButton);

  //append cells to the new row
  nextRow.appendChild(cell1);
  nextRow.appendChild(cell2);
  nextRow.appendChild(cell3);
  nextRow.appendChild(cell4);
  nextRow.appendChild(cell5);

  //append row to table
  tableElement.appendChild(nextRow);
  
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}