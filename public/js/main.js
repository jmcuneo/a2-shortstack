// FRONT-END (CLIENT) JAVASCRIPT HERE


//
// const result = async function( event ) {
//   event.preventDefault()
//   await fetch( "/results", {
//     method:"POST",
//   }).then(
//   function(response){
//     return response.text()
//   })  .then(data => {
//     // Handle the response based on its content type
//     if (typeof data === 'string') {
//       document.body.innerHTML = data
//     } else {
//       console.log(data);
//     }
//   })
//
// }
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const input = document.querySelector("#yourname"),
      json = {"yourname": input.value},
      body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })
  const text = await response.text()
  console.log( "text:", text)
}


  window.onload = function (){
  const button1 = document.getElementById("submitBtn");
  button1.onclick = submit;
  const button2 = document.getElementById("resultBtn");
  button2.onclick = result;
  }
