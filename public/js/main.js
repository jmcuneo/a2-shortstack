// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  var reqInputs = document.querySelectorAll("input[required]");
  var numInputs = document.querySelectorAll("input[min]");
  var isValid = true;
  var allPositive = true;

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
  console.log("Sending: " + body);

  const response = await fetch( "/entries", {
    method:"POST",
    body
  })

  const text = await response.text()

  console.log( "text:", text )
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
  const entries = get();
  console.log(entries);
  button.onclick = submit;
}