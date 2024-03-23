// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const charname = document.querySelector( "#charname" ),
        charrace = document.querySelector( "#charrace" ),
        charclass = document.querySelector( "#charclass" ),
        action = document.querySelector('input[name="action"]:checked').value;

    json = { "charname": charname.value,
        "charrace": charrace.value,
        "charclass": charclass.value,
        "action": action},
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  console.log( "text:", text )

  document.getElementById("characterForm").reset()

  await loadTable()
}

const deleteEntry = async function (deleteName, deleteClass){

    console.log("delete entry: ", deleteName, deleteClass)

    const json = {
        "deleteName": deleteName,
        "deleteClass": deleteClass
    }

    const body = JSON.stringify(json)

    const response = await fetch( "/delete", {
        method:"POST",
        body
    })

    // const text = await response.text()
    await loadTable()
}

const loadTable = async function (){
    console.log("loading table")

    await fetch('/api/appdata')
        .then(response => response.json())
        .then(data => {
            const existingTableBody = document.getElementById("charTableBody");
            const tableRows = existingTableBody.getElementsByTagName('tr');
            const rowCount = tableRows.length;
            //Remove all non-header rows
            for (let x=rowCount-1; x>0; x--) {
                existingTableBody.removeChild(tableRows[x]);
            }
            console.log('Appdata from server:', data);
            for (let i = 0; i < data.length; i++) {
                // creates a table row
                const row = document.createElement("tr");
                for (let j = 0; j < 6; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    const cell = document.createElement("td");
                    let content = "";
                    switch(j){
                        case 0:
                            content = data[i].name
                            break;
                        case 1:
                            content = data[i].race
                            break;
                        case 2:
                            content = data[i].class
                            break;
                        case 3:
                            content = data[i].modifier
                            break;
                        case 4:
                            content = data[i].action
                            break;
                        case 5:
                            const button = document.createElement("button")
                            button.onclick = () => deleteEntry(data[i].name, data[i].race);
                            button.id = "deleteButton"
                            button.textContent = "Delete"
                            cell.appendChild(button);
                            row.appendChild(cell);
                            break;
                    }
                    if(j !== 5) {
                        const cellText = document.createTextNode(content);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                }

                // add the row to the end of the table body
                existingTableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error fetching appdata:', error);
        });
}

window.onload = function() {
   const submitbutton = document.querySelector("#submitbutton");
    submitbutton.onclick = submit;
    loadTable();
}