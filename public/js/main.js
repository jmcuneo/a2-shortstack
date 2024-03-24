//addition function
const addition = async function( event ) {    //addition function 
  event.preventDefault()

  const num1 = document.querySelector('#num1').value,     //get num1 from the first input box
  num2 = document.querySelector('#num2').value,           //get num2 from the second input box
  json = { operation: 'addition', num1: num1, num2: num2},      //define the payload
  body = JSON.stringify( json )                                 //stringify payload

  const response = await fetch( "/addition", {
    method: "POST",       //post method
    body: body
  })

  const responseData = await response.json(); // Get the response
  const resultElement = document.querySelector('#result');        //define the result element on the screen
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result);     //assign the client side element to the result from the response
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

  const responseData = await response.json();
  const resultElement = document.querySelector('#result');
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result); 

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

  const responseData = await response.json(); // Get the response
  const resultElement = document.querySelector('#result');
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result); // Use the plain text response

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

  const responseData = await response.json(); // Get the response
  const resultElement = document.querySelector('#result');
  resultElement.textContent = "Result: " + JSON.stringify(responseData.result); // Use the plain text response

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
