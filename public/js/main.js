// FRONT-END (CLIENT) JAVASCRIPT HERE.

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#yourname" ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method: "POST",
    body: body 
  })

  const text = await response.text()

  console.log( "text: ", text )
}

const addition = async function( event ) {
  event.preventDefault()

  const num1 = document.querySelector('#num1').value,
  num2 = document.querySelector('#num2').value,
  json = { operation: 'addition', num1: num1, num2: num2},
  body = JSON.stringify( json )

  const response = await fetch( "/addition", {
    method: "POST",
    body: body 
  })

  const data = await response.json()

  const result = document.querySelector('#result')
  result.textContent = "Result: " + data.result

  getSavedResults()

}

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

  const data = await response.json()

  const result = document.querySelector('#result')
  result.textContent = "Result: " + data.result

  getSavedResults()

}

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

  const data = await response.json()

  const result = document.querySelector('#result')
  result.textContent = "Result: " + data.result

  getSavedResults()

}

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

  const data = await response.json()

  const result = document.querySelector('#result')
  result.textContent = "Result: " + data.result

  getSavedResults()

}

window.onload = function() {
  const addButton = document.querySelector("#addButton")
  addButton.onclick = addition

  const subtractButton = document.querySelector("#subtractButton")
  subtractButton.onclick = subtract

  const multiplyButton = document.querySelector("#multiplyButton")
  multiplyButton.onclick = multiply

  const divideButton = document.querySelector("#divideButton")
  divideButton.onclick = divide

  getSavedResults()
}

const getSavedResults = async function() {
  const response = await fetch('getSavedResults'),
  answers = await response.json();

  const previousResults = document.querySelector('#previousResults')
  previousResults.innerHTML = ""  //add space

  answers.forEach(function(answer){
    const li = document.createElement('li')
    li.textContent = answer
    previousResults.appendChild(li)
  })
}