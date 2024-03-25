// FRONT-END (CLIENT) JAVASCRIPT HERE
var count = 1;

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
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
  const tableElement = document.getElementById('responseTable');
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
  
  cell1.textContent = count;
  
  //parsedData = JSON.parse(body);
  
  cell2.textContent = concatenatedString;
  cell3.textContent = stringLength;

  delButton.addEventListener('click',function() {
    // find the index with the value you're tryna delete

    //  remove the index or loop through app data (horrible solution lmfao) and copy all but that into a temp before restoring it

    // remove from the table
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

  cell4.appendChild(delButton);
  cell5.appendChild(editButton);

  nextRow.appendChild(cell1);
  nextRow.appendChild(cell2);
  nextRow.appendChild(cell3);
  nextRow.appendChild(cell4);
  nextRow.appendChild(cell5);

  tableElement.appendChild(nextRow);
  // subarray for app data:
    // [1: entry num
    // 2: combined string
    // 3: string length]
  // appdata.push([count, concatenatedString, stringLength]);
  count++;
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}