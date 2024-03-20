const submit = async function(event) {
    event.preventDefault();

    const nameInput = document.querySelector("#name"),
          prepInput = document.querySelector("#prep"),
          cookInput = document.querySelector("#cook"),
          json = {name: nameInput.value,
                  prep: prepInput.value,
                  cook: cookInput.value},
          body = JSON.stringify(json);

    const response = await fetch("/submit", {
        method: "POST",
        body
    });

    const text = await response.text();
    console.log("text:", text);

    nameInput.value = "";
    prepInput.value = "";
    cookInput.value = "";
    document.querySelector("table").innerHTML = text;
};

const del = async function(event) {
    event.preventDefault();

    const input = document.querySelector("input.delete");
          json = {name: input.value},
          body = JSON.stringify(json);

    const response = await fetch("/delete", {
        method: "POST",
        body
    });

    const text = await response.text();
    console.log("text:", text);

    input.value = "";
    document.querySelector("table").innerHTML = text;
};

window.onload = async function() {
    const response = await fetch("/appdata", {
        method: "GET",
        request: "appdata"
    });
    const text = await response.text();
    document.querySelector("table").innerHTML = text;
    document.getElementById("submit").onclick = submit;
    document.querySelector("button.delete").onclick = del;
};