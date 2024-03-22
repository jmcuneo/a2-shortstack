// FRONT-END (CLIENT) JAVASCRIPT HERE

function radioValue () {
  var elem = document.getElementsByName("operator");
 
  for (let i = 0; i < elem.length; i++) {
      if (elem[i].checked){ return elem[i].value }
  }
}

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const val1 = document.querySelector( "#firstVal" ),
        val2 = document.querySelector( "#secVal" ),
        op = radioValue(),
        guess = document.querySelector( "#guess" ),
        json = { val1: val1.value, val2: val2.value, op: op, guess: guess.value},
        body = JSON.stringify( json )

  if (val1.value && val2.value && op) {
    const response = await fetch( "/submit", {
      method:"POST",
      body 
    })

    const resp = await response.json()
    displayData(resp)

    console.log( "text:", resp)
  }

}

function deleteItem( event ) {
  let body = JSON.stringify(event.srcElement.id)
  // deleteTable()
  fetch( "/delete", {
    method:"POST",
    body 
  }).then( (response) => {
      response.json().then((resp) => {
        displayData(resp)
      })
    })

}

function modItem ( event ) {
  let form = document.getElementsByClassName("forms")[0]
  form.style.display = "none"

  let modform = document.getElementById("modForm")
  modform.style.display = "block"

  const val1 = document.querySelector( "#newFirst" ),
        val2 = document.querySelector( "#newSec" ),
        op = radioValue(),
        answer = document.querySelector( "#forceAnswer" ),
        json = {index: event.srcElement.id, val1: val1.value, val2: val2.value, op: op, output: answer.value},
        body = JSON.stringify( json )

  fetch( "/modify", {
    method:"POST",
    body 
  }).then( (response) => {
      response.json().then((resp) => {
        displayData(resp)
      })
    })
}

function initialLoad(){
  let body = null;

  fetch( "/refresh", {
    method:"POST",
    body
  }).then( (response) => {
      response.json().then((resp) => {
        displayData(resp)
      })
    }
  )
}

window.onload = function() {
  initialLoad();
  const subBtn = document.querySelector(".submitButton");
  subBtn.onclick = submit;
}

function displayData(data) {
  deleteTable()
  let modForm = document.getElementById("modForm")
  modForm.style.display = "none"

  let form = document.getElementsByClassName("forms")[0]
  form.style.display = "block"

  let table = document.getElementById("serverTable")
  for(let i = 0; i < data.length; i++){
    if(document.getElementById("data" + i) == null) { //Modify this later to make sure the data is the same
      let tr = document.createElement("tr")
      tr.id = "data" + i;
      tr.className = "dataTR"

      let tdID = document.createElement("td")
      tdID.innerHTML = i
      tdID.className = "entryID"
      tr.appendChild(tdID)
      for (let key in data[i]) {
        let td = document.createElement("td")
        let line = data[i]
        if(key == "guess" && line[key] != null) {
          handleGuess(td, line[key])
        } else {
          td.innerHTML = line[key]
        }
        tr.appendChild(td)
      }

      let deleteTd = makeButton("deleteButton", "Delete", i, deleteItem)
      tr.appendChild(deleteTd)

      let modifyTd = makeButton("modButton", "Modify", i, modItem)
      tr.appendChild(modifyTd)

      table.appendChild(tr)
    }
  }
}

function handleGuess (td, value) {
  if(value) {
    td.innerHTML = "Correct"
    td.style.color = "green"
  } else {
    td.innerHTML = "Incorrect"
    td.style.color = "red"
  }
}

function deleteTable() {
  let table = document.getElementById("serverTable")
  table.querySelectorAll(".dataTR").forEach(elem => elem.remove())
  // for (let i = 0; i < (table.childElementCount - 1); i++) {
  //   let tr = document.getElementById("data" + i)
  //   if (tr) {
  //     table.removeChild(tr)
  //   }
  // }
}

function makeButton(className, inner, id, eventFunc) {
  let buttonTd = document.createElement("td")
  let button = document.createElement("button")
  button.className = className
  button.id = id
  button.innerHTML = inner
  button.addEventListener("click", eventFunc)
  buttonTd.appendChild(button)
  return buttonTd
}