const returnHome = async function(event ){
    //Change page bttn, should write to recieve url string
    const response = await fetch( "/", {
      method:"GET",
    }).then(response => window.location.href = response.url).then(response => console.log(response.url))
  } 
  window.onload = function(){
    //the table will be filled in here
  }