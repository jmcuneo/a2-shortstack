// FRONT-END (CLIENT) JAVASCRIPT HERE

const trackMouse = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  //event.preventDefault()
  
  // console.log(document.getElementById("mouse"))
  const rect = document.getElementById("mouse").getBoundingClientRect();
  const rect2 = document.getElementById("area").getBoundingClientRect();
  const json = { mouse_x: Math.floor(event.layerX - rect.left),
                 mouse_y: Math.floor(event.layerY - rect.top), 
                 true_x: event.layerX, 
                 true_y: event.layerY, 
                 second_x: (rect2.left + Math.floor(event.layerX - rect.left)), 
                 second_y: (rect2.top + Math.floor(event.layerY - rect.top))
                },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const r_json = await response.json()

  const cursor = document.getElementById("cursor");
  cursor.style.left = (rect2.left + r_json.x) + "px"
  cursor.style.top = (rect2.top + r_json.y) + "px"

  // console.log( "text:", text )
}

const submitScore = async function() {
  await fetch( "/postScore", {
    method:"POST",
  });
}

const updateScore = async function() {
  const response = await fetch( "/score", {
    method: "GET"
  })
  const b_t = await response.text()
  document.getElementById("score").innerHTML = "Score: " + b_t;
}

const fetchHighScores = async function() {
  const response = await fetch( "/hscores", {
    method: "GET"
  })
  const r_json = await response.json()
  const hs = document.getElementById("hscores");
  hs.replaceChildren([])
  r_json.forEach(score => {
        const skore = document.createElement("div");
        skore.className = "hscore";
        skore.innerHTML = score + ", "
        hs.appendChild(skore)
  });
}

const drawLines = async function(event) {
  const response = await fetch( "/lines", {
    method: "GET"
  })

  const r_json = await response.json();
  const lines = document.getElementById("lines");
  //console.log(r_json)
  if(lines.childElementCount > r_json.length)
    lines.replaceChildren([]);
  let i = 0;
  for(i = 0; i < r_json.length; i++) {
      let line = null;
      let element = r_json[i];
      if(i < lines.childElementCount) {
        line = lines.children.item(i);
      } else {
        line = document.createElement("div");
        line.className = "line";
        lines.appendChild(line)
      }
      line.style.left = element.x + "px";
      line.style.top = element.y + "px";
      line.style.rotate = element.angle + 90 + "deg";
  }

  while(i > lines.childElementCount) {
    lines.children.item(lines.childElementCount-1).remove();
  }
}
const drawTargets = async function( event ) {
  const response = await fetch( "/targets", {
    method: "GET"
  })

  const r_json = await response.json();
  const targets = document.getElementById("targets");
  targets.replaceChildren([]);
  r_json.forEach(element => {
      const target = document.createElement("div");
      target.className = "target";
      target.style.left = element.x - 9.75 + "px";
      target.style.top = element.y - 9.75 + "px";
      targets.appendChild(target)
  });

  drawLines();
  updateScore();
}

setInterval(drawTargets, 40);
setInterval(fetchHighScores, 10000);