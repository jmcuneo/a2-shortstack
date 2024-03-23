// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
    event.preventDefault();

    const firstName = document.querySelector("#firstName").value,
        lastName = document.querySelector("#lastName").value,
        dob = document.querySelector("#dob").value,
        sex = document.querySelector("#sex").value,
        email = document.querySelector("#email").value,
        phone = document.querySelector("#phone").value,
        json = {
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            sex: sex,
            email: email,
            phone: phone,
        },
        body = JSON.stringify(json);

    const response = await fetch("/submit", {
        method: "POST",
        body,
    });

    const text = await response.text();
    console.log(text);
    getData();
};

async function getData() {
    const response = await fetch("/appdata", {
        method: "GET",
    });
    const text = await response.text();
    console.log("got data");

    addData(text);
}

async function addData(text) {
    var table = document.querySelector(" #applicationTable ");
    table.innerHTML = ""; //clear table

    //add th cells
    addTableHeaders(table);

    const appdata = JSON.parse(text);
    // from stack overflow
    for (const item of appdata) {
        var row = table.insertRow();

        //add cells
        var fullNameCell = row.insertCell();
        var dobCell = row.insertCell();
        var ageCell = row.insertCell();
        var sexCell = row.insertCell();
        var emailCell = row.insertCell();
        var phoneCell = row.insertCell();
        var deleteCell = document.createElement('button');

        //manage delete button
        deleteCell.className = "delBtn";
        deleteCell.innerHTML = "Delete";
        // iife- researched and modified code from udacity
        deleteCell.onclick = (function(item) {return function() {deleteItem(item);}})(item);

        //add data
        fullNameCell.innerHTML = item.fullName.toUpperCase();
        dobCell.innerHTML = item.dob;
        ageCell.innerHTML = item.age;
        sexCell.innerHTML = item.sex;
        emailCell.innerHTML = item.email;
        phoneCell.innerHTML = item.phone;
        row.appendChild(deleteCell);
    }
}

async function addTableHeaders(table) {
    //modified from stack overflow
    var headRow = table.insertRow();

    var fullNameHead = headRow.insertCell();
    fullNameHead.outerHTML = "<th>Patient Name</th>";

    var dobHead = headRow.insertCell();
    dobHead.outerHTML = "<th>DoB</th>";

    var ageHead = headRow.insertCell();
    ageHead.outerHTML = "<th>Age</th>";

    var sexHead = headRow.insertCell();
    sexHead.outerHTML = "<th>Sex</th>";

    var emailHead = headRow.insertCell();
    emailHead.outerHTML = "<th>Email</th>";

    var phoneHead = headRow.insertCell();
    phoneHead.outerHTML = "<th>Phone #</th>";
}

const deleteItem = async function(item) {
    const index = item.id, //id = app data index to delete
        json = { "id": index },
        body = JSON.stringify( json )

    const response = await fetch( "\delete", {
        method:"DELETE",
        body
    })

    const text = await response.text()
    console.log(text)
    getData()
}

window.onload = function () {
    document.querySelector("#applicationForm").onsubmit = submit;
};
