// FRONT-END (CLIENT) JAVASCRIPT HERE

const logCourse = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const cID = document.querySelector( "#cID" ),
        cName = document.querySelector("#cName"),
        prof = document.querySelector("#prof"),
        json = { cID: parseInt(cID.value), cName: cName.value, prof: prof.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  console.log( "text:", text )
}

const deleteCourse = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const cID = document.querySelector( "#removeCID" ),
        json = { cID: parseInt(cID.value) },
        body = JSON.stringify( json )

  const response = await fetch( "/delete", {
    method:"DELETE",
    body 
  })

  const text = await response.text()

  console.log( "text:", text )
}

window.onload = function() {
  const log = document.querySelector("#log");
  const remove = document.querySelector("#remove");
  log.onclick = logCourse;
  remove.onclick = deleteCourse;
}