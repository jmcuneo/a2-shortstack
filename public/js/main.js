// FRONT-END (CLIENT) JAVASCRIPT HERE

var modifying = false;

const appdata = []

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const type = document.querySelector( "#type" ),
		date = document.querySelector( "#event-date" ),
		xcoord = document.querySelector( "#x-coord" ),
		ycoord = document.querySelector( "#y-coord" ),
		description = document.querySelector( "#description" ),
		json = { type: type.value, date: date.value, xcoord: xcoord.value, ycoord: ycoord.value, description: description.value },
    body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
		body
  })

  const text = await response.text()

	getReports();
}

const getReports = async function( ) {
	appdata.splice(0, appdata.length);

	const response = await fetch ( "/get", {
		method:"POST"
	});

	const text = await response.text();

	let data = JSON.parse(text);

	const dataTable = document.querySelector("#report-table-container");
	const origHeadtr = document.querySelector("#toprow");

	let newtable = document.createElement("table");
	let headtr = origHeadtr.cloneNode(true);
	newtable.append(headtr);

	data.forEach((element) => {
		appdata.push(element);
		let tr = document.createElement("tr")

		let idtd = document.createElement("td");
		idtd.innerHTML = element.id;
		tr.append(idtd);

		let typetd = document.createElement("td");
		typetd.innerHTML = element.type;
		tr.append(typetd);

		let xtd = document.createElement("td");
		xtd.innerHTML = element.xcoord;
		tr.append(xtd);

		let ytd = document.createElement("td");
		ytd.innerHTML = element.ycoord;
		tr.append(ytd);


		let desctd = document.createElement("td");
		desctd.innerHTML = element.description;
		tr.append(desctd);

		let datetd = document.createElement("td");
		datetd.innerHTML = element.date;
		tr.append(datetd);

		let elapsetd = document.createElement("td");
		elapsetd.innerHTML = element.dateDiff;
		tr.append(elapsetd);

		let deltd = document.createElement("td");
		// this is a really ugly way to prevent border doubling 
		let deltddiv = document.createElement("div");
		let delbutton = document.createElement("button");
		let modbutton = document.createElement("button");
		delbutton.innerHTML = "del";
		delbutton.addEventListener('click', function() {
			del(element.id)
		});
		modbutton.classList.add("delmodbutton");
		modbutton.innerHTML = "mod";
		modbutton.addEventListener('click', function() {
			startmod(element.id)
		});
		delbutton.classList.add("delmodbutton");
		deltddiv.classList.add("actionstd");
		if (modifying) {
			delbutton.disabled = "true";
			modbutton.disabled = "true";
		}
		deltddiv.append(delbutton);
		deltddiv.append(modbutton);
		deltd.append(deltddiv);
		tr.append(deltd);
		
		newtable.append(tr)
	});

	dataTable.innerHTML = "";
	dataTable.append(newtable);

}

const del = async function(id) {
	event.preventDefault();

	let delid = id;
	
	let body = JSON.stringify({delid});

	const response = await fetch ("/delete", {
		method:"POST",
		body
	})

	const text = await response.text()
	console.log( "text:", text)

	getReports();

}

const startmod = function(id) {
	modifying = true;
	submitbutton = document.querySelector("#submitbutton");
	submitbutton.style.visibility = "hidden";
	const modbuttons = document.querySelectorAll(".delmodbutton");
	modbuttons.forEach((button) => {
		button.disabled = true;
	});
	
	let modbutton = document.createElement("button");
	modbutton.innerHTML = "modify";
	modbutton.addEventListener('click', function() {
		submitmod(id);
	});

	let cancelbutton = document.createElement("button");
	cancelbutton.innerHTML = "cancel";
	cancelbutton.addEventListener('click', function() {
		endmod()
	});

	modbutton.id = "modify-button";
	cancelbutton.id = "cancel-button";

	let submitform = document.querySelector("#submission");
	submitform.append(modbutton);
	submitform.append(cancelbutton);
	
	let index = -1;
	for (i=0; i<appdata.length; i++) {
		if(appdata[i].id === id) {
			index = i;
			break;
		}
	}
	if (index === -1) endmod();
	
	let report = appdata[index];

	let typesel = document.querySelector("#type");
	typesel.value = report.type;
	let dateinput = document.querySelector("#event-date");
	dateinput.value = report.date;
	let xinput = document.querySelector("#x-coord");
	xinput.value = report.xcoord;
	let yinput = document.querySelector("#y-coord");
	yinput.value = report.ycoord;
	let descinput = document.querySelector("#description");
	descinput.value = report.description;

}
// different than standard submit. could probably make this one function but
// i'm too lazy to do that right now. submissions with id are modifications
const submitmod = async function(id) {
	event.preventDefault();	
	const type = document.querySelector( "#type" ),
		date = document.querySelector( "#event-date" ),
		xcoord = document.querySelector( "#x-coord" ),
		ycoord = document.querySelector( "#y-coord" ),
		description = document.querySelector( "#description" ),
		json = { type: type.value, date: date.value, xcoord: xcoord.value, ycoord: ycoord.value, description: description.value, id: id },
    body = JSON.stringify( json )
	
  const response = await fetch( "/submit", {
    method:"POST",
		body
  })

  const text = await response.text()
	
	endmod();
	getReports();
}

const endmod = function() {
	modifying = false;
	submitbutton = document.querySelector("#submitbutton");
	submitbutton.style.visibility = "visible";
	const modbuttons = document.querySelectorAll(".delmodbutton");
	modbuttons.forEach((button) => {
		console.log("test");
		button.disabled = false;
	});
	
	let modbutton = document.querySelector("#modify-button");
	let cancelbutton = document.querySelector("#cancel-button");
	modbutton.remove();
	cancelbutton.remove();

	let typesel = document.querySelector("#type");
	typesel.value = "Tornado";
	let dateinput = document.querySelector("#event-date");
	dateinput.value = "";
	let xinput = document.querySelector("#x-coord");
	xinput.value = "";
	let yinput = document.querySelector("#y-coord");
	yinput.value = "";
	let descinput = document.querySelector("#description");
	descinput.value = "";

}

window.onload = function() {
	const submitButton = document.querySelector("#submitbutton");
	submitButton.onclick = submit;
	getReports();
	//update every five seconds
	setInterval(getReports, 5000);
}
