// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  event.preventDefault()
  const form = document.getElementById("input-form")
  if (form.checkValidity()) {

    const input = document.getElementById("task-input").value
    const dueDate = document.getElementById("calendar").value
    const json = { "task": input, "creationDate": new Date().toISOString().split('T')[0], "dueDate": dueDate }
    const body = JSON.stringify(json)

    const response = await fetch("/submit", {
      method: "POST",
      body
    })

    const text = await response.text()

    console.log("clientSends:", json)
    console.log("clientReceives:", text)
  } else {
    console.log("bad")
  }
}

window.onload = function () {
  const form = document.getElementById("input-form");
  form.onsubmit = submit;
  const [today] = new Date().toISOString().split('T')

  const dateInput = document.getElementById('calendar');
  dateInput.setAttribute('min', today);
  dateInput.setAttribute('value', today);
}

