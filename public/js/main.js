// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const nameInput = document.querySelector("#yourname");
  const namejson = { yourname: nameInput.value };

  const itemInput = document.querySelector("#youritem");
  const itemjson = { youritem: itemInput.value };

  const qtyInput = document.querySelector("#numItems");
  const qtyjson = { numItems: qtyInput.value };

  const newEntry = createEntry(nameInput.value, itemInput.value, qtyInput.value);

  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(newEntry),
  })
  const text = await response.json();
  console.log("text:", text);
  const lastLogged = addToTable(newEntry);
};

const createEntry = function (name, item, qty) {
  const entry = {};
  entry.name = name;
  entry.item = item;
  entry.qty = qty;
  return entry;
};

const addToTable = function(entry){
  const table = document.getElementById("table");
  const row = `<tr>
                <td>${entry.name}</td>
                <td>${entry.item}</td>
                <td>${entry.qty}</td>
              </tr>`;
  table.insertAdjacentHTML('beforeend', row);
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
