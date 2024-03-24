// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()


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

  const removeName = document.querySelector("#removeName").value;

    await fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ name: removeName })
    });
  //Empty string removes all
  if (removeName === "") return;
    console.log("Project removed:", removeName);
    removeFromList(removeName);
};
const removeFromList = function(name) {

  const listItems = document.querySelectorAll("#dataList li");
  listItems.forEach(function(item) {
    if (item.textContent.includes(name)) {
      item.remove();
    }
  });
};




window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;

  const removeButton = document.querySelector("#removeProject button[type=submit]");
  removeButton.onclick = removeProject;
}




