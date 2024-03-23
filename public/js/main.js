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
  console.log(res);
  res.element = addRow([res.string,res.gram0,res.gram1,res.gram2,res.gram3],res.id);
  localAppData.push(res);
}

function getLocalAppDataEntry(id){
  for(var i = 0; i < localAppData.length; i++){
    if(localAppData[i].id===id){
      return {index:i,entry:localAppData[i]};
    }
  }
  return null;
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
  let searchResult = getLocalAppDataEntry(rIndex);
  table.removeChild(searchResult.entry.element);
  localAppData.splice(searchResult.index,1);
}


const submitButton = document.querySelector("#submit");
submitButton.onclick = submit;
const table = document.querySelector("#table");
var localAppData = [];

const updateAllData = async function(){
  const response = await fetch("/submit",{
    method:"POST",
    body: JSON.stringify({
      type:"getAll"
    })
  });
  const res = await response.json();
  for(let i = 0; i < localAppData.length; i++){
    table.removeChild(localAppData[i].element);
  }
  localAppData = [];
  for(let i = 0; i < res.length; i++){
    let item = res[i];
    let element = addRow([item.string,item.gram0,item.gram1,item.gram2,item.gram3],item.id);
    item.element=element;
    localAppData.push(item);
  }
}

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

updateAllData();
//Refresh the data every 20 seconds.
setInterval(updateAllData,20000);