// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#yourname" ),
        json = { "yourname": input.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text();
  console.log( "text:", text )
  //document.querySelector("#output").innerHTML = body;

  createEntry(input.value);
  //call create entry function??
}

//add later -> const createEntry = function(name, item, numItems){
const createEntry = function(name){
  const entry = {};
  entry.name = name;
  //entry.item = item;
  //entry.qty = qty;
  document.querySelector("#output").innerHTML = entry.name;
  return entry;
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}