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
        json = { "charname": charname.value,
        "charrace": charrace.value,
        "charclass": charclass.value},
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  console.log( "text:", text )

  document.getElementById("characterForm").reset()

}

const loadTable = async function (){
    console.log("loading table")

    await fetch('/api/appdata')
        .then(response => response.json())
        .then(data => {

            const existingTable = document.getElementById("characterTable");
            if (existingTable) {
                existingTable.remove();
            }

            console.log('Appdata from server:', data);
            // Now you can work with the appdata array here
            const tbl = document.createElement("table");
            tbl.setAttribute("id", "characterTable")
            const tblBody = document.createElement("tbody");
            for (let i = -1; i < data.length; i++) {
                // creates a table row
                const row = document.createElement("tr");

                //Setup Table top row
                if(i === -1){
                    for (let j = 0; j < 4; j++) {
                        const cell = document.createElement("td");
                        let content = "";
                        switch(j){
                            case 0:
                                content = "Character Name"
                                break;
                            case 1:
                                content = "Character Race"
                                break;
                            case 2:
                                content = "Class"
                                break;
                            case 3:
                                content = "Primary Modifier"
                                break;
                        }
                        const cellText = document.createTextNode(content);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                } else

                for (let j = 0; j < 4; j++) {
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
                    }
                    const cellText = document.createTextNode(content);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }

            tbl.appendChild(tblBody);
            // appends <table> into <body>
            document.body.appendChild(tbl);
            // sets the border attribute of tbl to '2'
            tbl.setAttribute("border", "2");

        })
        .catch(error => {
            console.error('Error fetching appdata:', error);
        });
}

window.onload = function() {
   const submitbutton = document.querySelector("#submitbutton");
    submitbutton.onclick = submit;
    const tablebutton = document.querySelector("#tablebutton");
    tablebutton.onclick = loadTable;
}