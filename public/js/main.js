// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  //This code works - addding additional fields
  /*
  const input = document.querySelector( "#yourname" ),
        json = { "yourname": input.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })
*/

  const nameInput = document.querySelector("#yourname");
  const namejson = { yourname: nameInput.value };
  //const namebody = JSON.stringify(namejson);

  const itemInput = document.querySelector("#youritem");
  const itemjson = { youritem: itemInput.value };
  //const itembody = JSON.stringify(itemjson);

  const qtyInput = document.querySelector("#numItems");
  const qtyjson = { numItems: qtyInput.value };
  //const itembody = JSON.stringify(itemjson);

  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(namejson, itemjson, qtyjson),
  });

  const text = await response.text();
  console.log("text:", text);
  //document.querySelector("#output").innerHTML = body;

  createEntry(nameInput.value, itemInput.value, qtyInput.value);
};

const createEntry = function (name, item, qty) {
  const entry = {};
  entry.name = name;
  entry.item = item;
  entry.qty = qty;
  document.querySelector("#output1").innerHTML = entry.name;
  document.querySelector("#output2").innerHTML = entry.item;
  document.querySelector("#output3").innerHTML = entry.qty;

  return entry;
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
