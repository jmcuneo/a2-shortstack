// FRONT-END (CLIENT) JAVASCRIPT HERE


const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#string" ),
        json = { type:"anagram",string: input.value },
        body = JSON.stringify( json )

  //Asynchronous network request
  const response = await fetch( "/submit", {
    method:"POST",
    body 
  });

  const res = await response.json();
  const data = res.data;
  res.data.element = addRow([data.string,data.gram0,data.gram1,data.gram2,data.gram3],res.index);
  localAppData.push(res.data);
}

const remove = async function(event,index){
  event.preventDefault();
  const response = await fetch("/submit",{
    method:"POST",
    body: JSON.stringify({
      type:"remove",
      index:index
    })
  });
  const res = await response.json();
  var rIndex = parseInt(res.index);
  console.log(res);
  console.log(rIndex);
  table.removeChild(localAppData[rIndex].element);
  localAppData.splice(rIndex,1);
}

const submitButton = document.querySelector("#submit");
submitButton.onclick = submit;
const table = document.querySelector("#table");

const localAppData = [];

function addRow(anagrams, index){
  let row = document.createElement('tr');
  for(let i = 0; i < anagrams.length; i++){
    let anagramEntry = document.createElement('th');
    anagramEntry.innerHTML=anagrams[i];
    row.appendChild(anagramEntry);
  }
  let lastColumn = document.createElement('th');
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Remove";
  deleteButton.onclick = (event)=>{remove(event,index)};
  lastColumn.appendChild(deleteButton);
  row.appendChild(lastColumn);
  table.appendChild(row);
  return row;
}
