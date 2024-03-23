


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




  window.onload = function () {
    const button1 = document.getElementById("submitBtn");
    button1.onclick = submit;
    const button2 = document.getElementById("resultBtn");
    button2.onclick = result;
  }

