// FRONT-END (CLIENT) JAVASCRIPT HERE
let appdata = []
function generateTable(data){
  console.log(data[0].make);
  let table = '<table>';
  table += '<tr><th>Make</th><th>Model</th><th>Year</th><th>MPG</th><th>Gs</th><th>accel</th></tr>';
  data.forEach(item => {
    table += `<tr><td>${item.make}</td><td>${item.model}</td><td>${item.year}</td><td>${item.mpg}</td><td>${item.lateralGs}</td><td>${item.accel}</td></tr>`
  })
  table += '</table>';
  return table;
}
const destroyFast = container => {
  const el = document.getElementById(container);
  while (el.firstChild) el.removeChild(el.firstChild);
};

const parseData = {
  toFloat: function(data){
    let ret = {

    };
    for (const [key, value] of Object.entries(data)){
      ret[key] = isNaN(+value) ? value : +value;
    }
    return ret; 
  }
}

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  const input = new FormData(document.querySelector("#carFacts"));
  console.log(input);
  let values = Object.fromEntries(input.entries());
  values = parseData.toFloat(values);
  console.log(values);
  body = JSON.stringify(values);
  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  console.log( "text:", text )
}

const getData = async function(event){
  event.preventDefault();
  let response = await fetch("/get-app-data")
    .then(response => {
      if(!response.ok){
        throw new Error("network fucked");
      }
      return response.json();
    })
    .then(data => {
      appdata = appdata.concat(data);
      const tableContainer = document.getElementById('data');
      tableContainer.innerHTML = generateTable(appdata);  
      console.log('data', data);
    })
    .catch(error => {
      console.error(error);
    })

}


window.onload = function() {
  const submitButton = document.querySelector("#submit");
  submitButton.onclick = submit;
  const fetchButton = document.querySelector("#fetch");
  fetchButton.onclick = getData;

}