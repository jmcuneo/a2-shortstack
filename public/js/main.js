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
        fullNameCell.id = "fullNameCell";

        var dobCell = row.insertCell();
        dobCell.id = "dobCell";

        var ageCell = row.insertCell();
        ageCell.id = "ageCell";

        var sexCell = row.insertCell();
        sexCell.id = "sexCell";

        var emailCell = row.insertCell();
        emailCell.id = "emailCell";

        var phoneCell = row.insertCell();
        phoneCell.id = "phoneCell";

        /*var deleteCell = row.insertCell();
        deleteCell.id = "deleteCell";*/


        // for each entry add a delete button for that entry
        var del = document.createElement('button');
        del.type = "button";
        del.innerHTML = "delete";

        // set onclick event to call delete function
        del.onclick = (function(item) {return function() {deleteItem(item);}})(item);

        // add new elements and set their values
        row.appendChild(del);



        //put data in cells
        fullNameCell.innerHTML = item.fullName.toUpperCase();
        dobCell.innerHTML = item.dob;
        ageCell.innerHTML = item.age;
        sexCell.innerHTML = item.sex;
        emailCell.innerHTML = item.email;
        phoneCell.innerHTML = item.phone;

    }
}

async function addTableHeaders(table) {
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
    // get the id to delete, add it to request, and make delete request to server
    const index = item.id,
        json = { "id": index },
        body = JSON.stringify( json )

    const response = await fetch( "\delete", {
        method:"DELETE",
        body
    })

    // get server response and reload updated data
    const text = await response.text()
    console.log(text)
    //emptyForms()
    addData()
}

window.onload = function () {
    document.querySelector("#applicationForm").onsubmit = submit;
};
