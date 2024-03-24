// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  // id='yourname'
  const titleInput = document.querySelector( "#title")
  const descInput = document.querySelector( "#description")
  const json = {
          title: titleInput.value,
          descInput: descInput.value
      }
  const body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })
      .then(response => response.json())
      .then(json => console.log(json))

  const text = await response.text()

  console.log( "text:", text )
}

function screenToView() {
  const makeWorkOutWindow = document.getElementById("make-workout-window");
  const viewWorkoutWindow = document.getElementById("view-workout-window");

  if (makeWorkOutWindow.style.display === "none") {
    viewWorkoutWindow.style.display = "none";
    makeWorkOutWindow.style.display = "flex";
  }
}

function screenToMake() {
  const makeWorkOutWindow = document.getElementById("make-workout-window");
  const viewWorkoutWindow = document.getElementById("view-workout-window");

  if (viewWorkoutWindow.style.display === "none") {
    makeWorkOutWindow.style.display = "none";
    viewWorkoutWindow.style.display = "flex";
  }
}

window.onload = function() {
  const newListButton = document.getElementById("make-workout");
  const viewWorkoutButton = document.getElementById("view-workout");
  const submitButton = document.getElementById("submit-button");
  // submitButton.onclick = submit();
  submitButton.addEventListener("click", () => {
    submit();
  })
  newListButton.addEventListener("click", () => {
    screenToView()
  })
  viewWorkoutButton.addEventListener("click", () => {
    screenToMake()
  })
}