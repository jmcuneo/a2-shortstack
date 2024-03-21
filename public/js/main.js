// FRONT-END (CLIENT) JAVASCRIPT HERE

const logCourse = async function (event) {
	// stop form submission from trying to load
	// a new .html page for displaying results...
	// this was the original browser behavior and still
	// remains to this day
	event.preventDefault()

	const cID = document.querySelector("#cID"),
		cTerm = document.querySelector("#cTerm"),
		cName = document.querySelector("#cName"),
		prof = document.querySelector("#prof"),
		json = { cID: parseInt(cID.value), cName: cName.value, prof: prof.value, crn: cTerm.value.concat("-", cID.value) },
		body = JSON.stringify(json);

	const response = await fetch("/submit", {
		method: "POST",
		body
	})

	const jsn = await response.json();
	renderCourses(jsn);
}

const deleteCourse = async function (event) {
	// stop form submission from trying to load
	// a new .html page for displaying results...
	// this was the original browser behavior and still
	// remains to this day
	event.preventDefault()

	const cID = document.querySelector("#removeCID"),
		json = { cID: parseInt(cID.value) },
		body = JSON.stringify(json)

	const response = await fetch("/delete", {
		method: "DELETE",
		body
	})

	const text = await response.json()
	renderCourses(text)
}

const renderCourses = function (json) {
	count = json.length;
	
	if (count >= 1) {
		const courses = document.getElementById("courses");
		let oldTbody = courses.querySelector("tbody");
		const tbody = document.createElement('tbody');

		json.forEach(element => {
			let newRow = tbody.insertRow(-1);
			let idCell = newRow.insertCell(0);
			let nameCell = newRow.insertCell(1);
			let profCell = newRow.insertCell(2);
			let crnCell = newRow.insertCell(3);
			
			idCell.appendChild(document.createTextNode(element.cID));
			nameCell.appendChild(document.createTextNode(element.cName));
			profCell.appendChild(document.createTextNode(element.prof));
			crnCell.appendChild(document.createTextNode(element.crn));

		});

		courses.replaceChild(tbody, oldTbody);
	}
}


window.onload = function () {
	const log = document.querySelector("#log");
	const remove = document.querySelector("#remove");
	log.onclick = logCourse;
	remove.onclick = deleteCourse;
}