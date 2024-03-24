let previousResults =[]     //empty array for user data

const deleteResult = function(index) {
  previousResults.splice(index, 1)     //remove element from the array
  updatePrevious()         //update the table
};


const updatePrevious = function() {
  const previousResultsTable = document.getElementById('previousResults')     //identify table
  const tbody = previousResultsTable.querySelector('tbody')         //identify body

  tbody.innerHTML = '';
  
  previousResults.forEach((result, index) => {
    const row = document.createElement('tr')          //create row
    const cellIndex = document.createElement('td')    //create index column
    cellIndex.textContent = (index + 1)               //increment
    const cellResult = document.createElement('td')   //create result column
    cellResult.textContent = result      //append the result to the html element

    const cellDelete = document.createElement('td')    //add delete element to row
    const deleteButton = document.createElement('button')      //create button
    deleteButton.textContent = 'Delete'                        //text for button
    deleteButton.addEventListener('click', function() {         //event handler for button click
      deleteResult(index);        //delete the entry at the given index in the array
    });
    cellDelete.appendChild(deleteButton)           //delete the cell

    row.appendChild(cellIndex)                        //add the index to the current row
    row.appendChild(cellResult)                       //add the result to the current column
    row.appendChild(cellDelete)                       //include the button to the row
    tbody.appendChild(row)                            //add row to the table
  })
}

// Function to add result to the previous results table
const addResultToPrevious = function(result) {
  previousResults.push(result)    // Add the result to the beginning of the array
  if (previousResults.length > 50) {      //limit array length to 50 prevoius entries
    previousResults.pop();      //Remove the oldest result if 50 is reached
  }
  updatePrevious();     //update table
};

//addition function
const addition = async function( event ) { 
  event.preventDefault()

  const num1 = document.querySelector('#num1').value,     //get num1 from the first input box
  num2 = document.querySelector('#num2').value,           //get num2 from the second input box
  json = { operation: 'addition', num1: num1, num2: num2},      //define the payload
  body = JSON.stringify( json )                                 //stringify payload

  const response = await fetch( "/addition", {
    method: "POST",       //post method
    body: body
  })

  const responseData = await response.json()  // Get the response
  const resultElement = document.querySelector('#result');        //define the result element on the screen
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result);     //assign the client side element to the result from the response

  addResultToPrevious(responseData.result);
}

//subtraction function
const subtract = async function( event ) {        
  event.preventDefault()

  const num1 = document.querySelector('#num1').value,
  num2 = document.querySelector('#num2').value,
  json = { operation: 'subtract', num1: num1, num2: num2},
  body = JSON.stringify( json )

  const response = await fetch( "/subtract", {
    method: "POST",
    body: body 
  })

  const responseData = await response.json()
  const resultElement = document.querySelector('#result')
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result) 

  addResultToPrevious(responseData.result)
}

//multiplication function
const multiply = async function( event ) {
  event.preventDefault()

  const num1 = document.querySelector('#num1').value,
  num2 = document.querySelector('#num2').value,
  json = { operation: 'multiply', num1: num1, num2: num2},
  body = JSON.stringify( json )

  const response = await fetch( "/multiply", {
    method: "POST",
    body: body 
  })

  const responseData = await response.json() // Get the response
  const resultElement = document.querySelector('#result')
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result) // Use the plain text response

  addResultToPrevious(responseData.result)
}

//division function
const divide = async function( event ) {
  event.preventDefault()

  const num1 = document.querySelector('#num1').value,
  num2 = document.querySelector('#num2').value,
  json = { operation: 'divide', num1: num1, num2: num2},
  body = JSON.stringify( json )

  const response = await fetch( "/divide", {
    method: "POST",
    body: body 
  })

  const responseData = await response.json() // Get the response
  const resultElement = document.querySelector('#result')
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result) // Use the plain text response

  addResultToPrevious(responseData.result);
}

window.onload = function() {
  const addButton = document.querySelector("#addButton")    //create an add button on the screen
  addButton.onclick = addition                              //map the button to the addition function

  const subtractButton = document.querySelector("#subtractButton")  //create an subtract button on the screen
  subtractButton.onclick = subtract                                 //map the button to the subtraction function

  const multiplyButton = document.querySelector("#multiplyButton")    //create an multiply button on the screen
  multiplyButton.onclick = multiply                                   //map the button to the multiplication function

  const divideButton = document.querySelector("#divideButton")        //create an divide button on the screen
  divideButton.onclick = divide                                       //map the button to the division function

}
