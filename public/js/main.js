// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
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
    console.log(text)
    loadData()
}


async function loadData() {

    const response = await fetch( "/appdata", {
        method:"GET"
    })
    const text = await response.text()
    console.log("loaded data")

    fillTable(text);
}

async function fillTable(text) {
    var table = document.querySelector(" #datatable ");
    table.innerHTML = '';
    const data = JSON.parse(text);

    // stackoverflow
    for(const elt of data) {
        var row = table.insertRow();
        var nameCell = row.insertCell();
        nameCell.id = "nameCell";
        var dobCell = row.insertCell();
        dobCell.id = "dobCell";
        var ageCell = row.insertCell();
        ageCell.id = "ageCell";
        var emailCell = row.insertCell();
        emailCell.id = "emailCell";

        nameCell.innerHTML = elt.fullName;
        dobCell.innerHTML = elt.dob;
        ageCell.innerHTML = elt.age;
        emailCell.innerHTML = elt.email;
    }
}

window.onload = function() {
    const submitBtn = document.querySelector("button#submit");
    submitBtn.onclick = submit;
}