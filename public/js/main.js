// FRONT-END (CLIENT) JAVASCRIPT HERE

const logCourse = async function (event) {
	// stop form submission from trying to load
	// a new .html page for displaying results...
	// this was the original browser behavior and still
	// remains to this day
	event.preventDefault()

	const cID = document.querySelector("#cID"),
		cName = document.querySelector("#cName"),
		prof = document.querySelector("#prof"),
		json = { cID: parseInt(cID.value), cName: cName.value, prof: prof.value },
		body = JSON.stringify(json);

	const response = await fetch("/submit", {
		method: "POST",
		body
	})

	const jsn = await response.json();
	// const jsn = JSON.parse(text);
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
	// const jsn = JSON.parse(text);
	renderCourses(text)

	// console.log("text:", text)
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
			
			idCell.appendChild(document.createTextNode(element.cID));
			nameCell.appendChild(document.createTextNode(element.cName));
			profCell.appendChild(document.createTextNode(element.prof));

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