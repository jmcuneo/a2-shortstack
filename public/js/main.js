// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  // Get form input values

  const input_name = document.querySelector("#name"),
      input_teammates = document.querySelector("#teammates"),
      input_points = document.querySelector("#points");

      json = {name: input_name.value, teammates: input_teammates.value, points: input_points.value},
      body = JSON.stringify(json)
  console.log(body)

  const response = await fetch("/submit", {
    method: "POST",
    body
  })

  const text = await response.text();

  const recievedData = JSON.parse(text);

  addToList(recievedData);
  //document.getElementById("result").innerText =text;
  console.log("text:", text);

  function addToList(data) {
    console.log("Adding to list");
    const listItem = document.createElement("li");
    listItem.textContent = JSON.stringify(data);

    const list = document.querySelector("#dataList");
    list.appendChild(listItem);
  }

}
const removeProject = async function(event) {
  event.preventDefault();

  // Get input value (name of object to delete) from the form
  const removeName = document.querySelector("#removeName").value;


    // Make a POST request to the server to delete the corresponding object
    await fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ name: removeName }),
      headers: {
        "Content-Type": "application/json" // Specify JSON content type
      }
    });
    console.log("Project removed:", removeName);
};



window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;

  const removeButton = document.querySelector("#removeProject button[type=submit]");
  removeButton.onclick = removeProject;
}




