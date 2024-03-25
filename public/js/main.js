// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  
  const FirstName = document.querySelector( "#FirstName" ),
      MiddleName = document.querySelector( "#MiddleName" ),
      LastName = document.querySelector( "#LastName" ),
      Email = document.querySelector( "#Email" ),
      StartLocation = document.querySelector( "#StartLocation" ),
      Destination = document.querySelector( "#Destination" ),
      Transport =document.querySelector("#transport-mode")
      json = {
        FirstName: FirstName.value,
        MiddleName: MiddleName.value,
        LastName: LastName.value,
        Email: Email.value,
        StartLocation: StartLocation.value,
        Destination: Destination.value,
        Transport: Transport.value,
      },
        body = JSON.stringify( json )
    console.log(body);

  const response = await fetch( "/submit", {
    method:"POST",
    body
  });

  const text = await response.text();
  display(JSON.parse(text));
  console.log( "text:" + JSON.parse(text) );
}
async function del(obj){
    let save = obj.getAttribute("del_attribute");
    const response = await fetch( "/submit", {
        method:"DELETE",
        body: JSON.stringify(save)
    });
    const text = await response.text();
    display(JSON.parse(text));
}
async function Confirm(row, FirstName, MiddleName, LastName, Email, StartLocation, Destination, Transportation){
    // let save = obj.getAttribute("put_attribute");
    // const response = await fetch( "/submit", {
    //     method:"PUT",
    //     body: JSON.stringify(save)
    // });
    // const text = await response.text();
    // display(JSON.parse(text));
    const json = {
        unique_id: row.rowIndex-1,
        FirstName: FirstName,
        MiddleName: MiddleName,
        LastName: LastName,
        Email: Email,
        StartLocation: StartLocation,
        Destination: Destination,
        Transportation: Transportation,
    }
    const response = await fetch("/submit", {
        method: "PUT",
        body: JSON.stringify({ json }),
    });

    const table = document.getElementById("booking_details");
    table.deleteRow(unique_id+1);
    const info = await response.json();
    const table_row= table.insertRow(unique_id+1);
    table_row.insertCell().textContent = info.FirstName;
    table_row.insertCell().textContent = info.MiddleName;
    table_row.insertCell().textContent = info.LastName;
    table_row.insertCell().textContent = info.Email;
    table_row.insertCell().textContent = info.StartLocation;
    table_row.insertCell().textContent = info.Destination;
    table_row.insertCell().textContent = info.Transportation;

    const update = document.querySelector("button");
    update.textContent = "update";
    update.onclick = function() {
        Modify(NewRow);
    };
    newRow.insertCell().appendChild(update);
}
function modify (row){
    const FirstName = document.createElement("input");
    FirstName.type = "text";
    FirstName.id = "FirstName";
    FirstName.value = row.cells.item(0).textContent;
    row.deleteCell(0);
    row.insertCell(0).appendChild(FirstName);

    const MiddleName = document.createElement("input");
    MiddleName.type = "text";
    MiddleName.id = "MiddleName";
    MiddleName.value = row.cells.item(1).textContent;
    row.deleteCell(1);
    row.insertCell(1).appendChild(MiddleName);


    const LastName = document.createElement("input");
    LastName.type = "text";
    LastName.id = "LastName";
    LastName.value = row.cells.item(2).textContent;
    row.deleteCell(2);
    row.insertCell(2).appendChild(LastName);

    const Email = document.createElement("input");
    Email.type = "email";
    Email.id = "Email";
    Email.value = row.cells.item(3).textContent;
    row.deleteCell(3);
    row.insertCell(3).appendChild(Email);

    const StartLocation = document.createElement("input");
    StartLocation.type = "text";
    StartLocation.id = "StartLocation";
    StartLocation.value = row.cells.item(4).textContent;
    row.deleteCell(4);
    row.insertCell(4).appendChild(StartLocation);


    const Destination = document.createElement("input");
    Destination.type = "text";
    Destination.id = "Destination";
    Destination.value = row.cells.item(5).textContent;
    row.deleteCell(5);
    row.insertCell(5).appendChild(Destination);

    const Transportation = document.createElement("select");
    Transportation.id = "transport-mode"

    const Lyft = document.createElement("option");
    Lyft.value = "Lyft"
    Lyft.textContent = "Lyft";

    const Uber = document.createElement("option");
    Uber.value = "Uber"
    Uber.textContent = "Uber";

    const PeterPanBus = document.createElement("option");
    PeterPanBus.value = "PeterPan Bus"
    PeterPanBus.textContent = "PeterPan Bus";

    const GreyhoundBus = document.createElement("option");
    GreyhoundBus.value = "Greyhound Bus"
    GreyhoundBus.textContent = "Greyhound Bus";

    const OurBus = document.createElement("option");
    OurBus.value = "Our Bus"
    OurBus.textContent = "Our Bus";

    const Subway = document.createElement("option");
    Subway.value = "Subway"
    Subway.textContent = "Subway";

    const CommuterRail = document.createElement("option");
    CommuterRail.value = "Commuter Rail"
    CommuterRail.textContent = "Commuter Rail";

    Transportation.options.add(Lyft);
    Transportation.options.add(Uber);
    Transportation.options.add(PeterPanBus);
    Transportation.options.add(GreyhoundBus);
    Transportation.options.add(OurBus);
    Transportation.options.add(Subway);
    Transportation.options.add(CommuterRail);

    const Confirm = document.createElement("button");
    Confirm.textContent = "Confirm";
    Confirm.onclick = function() {
        row, document.querySelector("#FirstName").value,
            document.querySelector("#MiddleName").value,
            document.querySelector("#LastName").value,
            document.querySelector("#Email").value,
            document.querySelector("#StartLocation").value,
            document.querySelector("#Destination").value,
            document.querySelector("#transport-mode").value;
    };
}

function display(object){
    let table = document.querySelector("#data_body");
    let elements=""
    table.innerHTML=""
    for(let i=0; i<object.length;i++){
        elements=`<td>${i}</td> <td>${object[i].FirstName}</td> <td>${object[i].MiddleName}</td>
        <td>${object[i].LastName}</td> <td>${object[i].Email}</td>
         <td>${object[i].StartLocation}</td> <td> ${object[i].Destination}</td>
         <td> ${object[i].Transport}</td> <td> ${object[i].cost}</td>
         <td><button del_attribute=${i} onclick="modify(this)" id="update">Update</button></td>
         <td><button put_attribute=${i} onclick="del(this)" id="delete">Delete</button></td>`
        let entries = `<tr>${elements}</tr>`
        table.innerHTML += entries;
    }
}

window.onload = function() {
    const button = document.querySelector("#Submit");
    button.onclick = submit;
}