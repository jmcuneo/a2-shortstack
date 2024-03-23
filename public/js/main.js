// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {

  event.preventDefault();

  const reqInputs = document.querySelectorAll("input[required]");
  const numInputs = document.querySelectorAll("input[min]");
  let isValid = true;
  let allPositive = true;

  numInputs.forEach(function(input) {
    if (!(input.value >= 0)){
      allPositive = false
    }
  });

  reqInputs.forEach(function(input) {
    if(!input.value.trim()){
      isValid = false;
    }
  });

  if(!isValid){
    alert("Please fill out all required fields");
    return;
  } else if (!allPositive){
    alert("Fields cannot be negative");
    return;
  }

  const anEntry = {name: reqInputs[0].value, bodyWeight: reqInputs[1].value, squat: reqInputs[2].value, benchPress: reqInputs[3].value, deadLift: reqInputs[4].value};
  const body = JSON.stringify(anEntry);

  fetch( "/submit", {
    method:"POST",
    body
  }).then((response)=>{
    return true;
    //return response.json();
  });

  return false;
}

const get = async function(){
  event.preventDefault();

  const response = await fetch("/entries", {
    method:"GET"
  })

  return await response.text();
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}