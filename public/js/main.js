// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async (event) => {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault();

    const
        firstName = document.querySelector('#firstName').value,
        lastName = document.querySelector('#lastName').value,
        dob = document.querySelector('#dob').value,
        email = document.querySelector('#email').value,
        json = {firstName: firstName, lastName: lastName, dob: dob, email: email },
        body = JSON.stringify(json)

    const response = await fetch('/submit', {
        method: 'POST',
        body
    });

    const text = await response.text()

    addData()
};

async function addData() {

    const response = await fetch( "/", {
        method:"GET"
    })
    const text = await response.text()
    console.log("text")
}

window.onload = function () {
    const button = document.querySelector("#submit");
    button.onclick = submit;
};