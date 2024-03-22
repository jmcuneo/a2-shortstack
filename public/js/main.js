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
    var table = document.querySelector(" #datatable ");
    table.innerHTML = "";
    const data = JSON.parse(text);

    // stackoverflow
    for (const elt of data) {
        var row = table.insertRow();

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

        fullNameCell.innerHTML = elt.fullName;
        dobCell.innerHTML = elt.dob;
        ageCell.innerHTML = elt.age;
        sexCell.innerHTML = elt.sex;
        emailCell.innerHTML = elt.email;
        phoneCell.innerHTML = elt.phone;
    }
}

window.onload = function () {
    const submitBtn = document.querySelector("#submit");
    submitBtn.onclick = submit;
}