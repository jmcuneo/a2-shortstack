// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  
  const FirstName = document.querySelector( "#FirstName" ),
      MiddleName = document.querySelector( "#MiddleName" ),
      LastName = document.querySelector( "#LastName" ),
      Email = document.querySelector( "#Email" ),
      StartLocation = document.querySelector( "#StartLocation" ),
      Destination = document.querySelector( "#Destination" ),
      Transport =document.querySelector("#transport-mode")
      json = {
        FirstName: FirstName.value,
        MiddleName: MiddleName.value,
        LastName: LastName.value,
        Email: Email.value,
        StartLocation: StartLocation.value,
        Destination: Destination.value,
        Transport: Transport.value,
      },
        body = JSON.stringify( json )
    console.log(body);

  const response = await fetch( "/submit", {
    method:"POST",
    body
  });

  const text = await response.text();
  console.log( "text:" + JSON.parse(text) );
}
window.onload = function() {
    const button = document.querySelector("#Submit");
    button.onclick = submit;
}