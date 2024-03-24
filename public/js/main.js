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
  display(JSON.parse(text));
  console.log( "text:" + JSON.parse(text) );
}
function toDelete(){

}
function display(object){
    let table = document.querySelector("#data_body");
    let elements=""
    table.innerHTML=""
    for(let i=0; i<object.length;i++){
        elements=`<td> ${i}</td><td> ${object[i].FirstName}</td> <td> ${object[i].MiddleName}</td>
        <td> ${object[i].LastName}</td><td><td> ${object[i].Email}</td>
         ${object[i].StartLocation}</td> <td> ${object[i].Destination}</td>
         <td> ${object[i].Transport}</td><td> ${object[i].cost}</td>`
        let entries = `<tr>${elements}</tr>`
        table.innerHTML += entries;
    }
}

window.onload = function() {
    const button = document.querySelector("#Submit");
    button.onclick = submit;
}