const returnHome = async function(event ){
    //Change page bttn, should write to recieve url string
    const response = await fetch( "/", {
      method:"GET",
    }).then(response => window.location.href = response.url).then(response => console.log(response.url))
  } 
  window.onload = async function(){
    //the table will be filled in here
    const response = await fetch( "/data", {
      method:"GET",
    }).then(response => response.json()).then(function(json) {
      let tableBody = document.getElementById("Orders");
      console.log(json);
      for(index = 0; index< json.length; index++){
        
        let newRow = document.createElement("tr");
        let mem = json[index];

      
        // Fill the data
        newRow.innerHTML = `
          <td>${mem.yourname}</td>
          <td>${mem.breakfast}</td>
          <td>${mem.coffee}</td>
          <td>$${mem.cost}</td>`;
      
        // Append the row to the table body
        tableBody.appendChild(newRow);
      }
    })
  }