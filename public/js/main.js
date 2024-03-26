// FRONT-END (CLIENT) JAVASCRIPT HERE
//move some of this stuff to server.improved.js

//client (this script) should handle the following
//making changes to the display elements
//sending input to server
const requestOptions={
    hostname:"",
    port:3000,
    path:"",
    method:"POST",
    headers:{
    },
};

var currentRunParams;
var currentlyPlaying=false;
var currentKeyPress=0;
async function askForFile(filename) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day

  if (currentlyPlaying){

    var response = await fetch( "/submit", {
      method:"GET",
      url:"public/imgs/"+filename,
    })

    var fileLink= await response.text();
    }
}

async function getParamsForRun(){
    if (!currentlyPlaying){
      const response = await fetch( "/submit", {
        method:"POST",
        body:"PARAM"
      })
       const text = await response.text()
       currentRunParams=JSON.parse(text);
    }
}

async function updateParameters() {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
    const parent=(document.getElementById("TestParameters"));
    const json = { grDelay: parent.querySelector("#grDelay").value,grChance:parent.querySelector("#grChance").value,
    speedDelay:parent.querySelector("#speedDelay").value,
    },
    body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })

  const text = await response.text()

  return text;

}

async function updateScore(testNum,score) {
    const json = { 'ID':testNum,'Score':score},
    body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body
  })

  const text = await response.text()
  testNum++;
  if (testNum<2){
    playGames(testNum)
  }
  else{
  console.log("DONE");
    currentlyPlaying=false;
    //ask server to calculate final score
    const response2 = await fetch( "/submit", {
            method:
            "POST",
            body:"EVAL"
        })
        const text2=await response2.text();
        console.log(text2);
        if (text2.charAt(0)=="Y"){
            alert("NEW RECORD!");
            updateBestScore();
        }
        else{
            alert("You got " + text2 + " points. Not a new record unfortunately");
        }
  }
}

async function updateBestScore(){
    const response = await fetch( "/submit", {
        method:
        "POST",
        body:"RUN"
    })

    const text = await response.text()
    var scores=JSON.parse(text);
    document.getElementById("Score1").innerHTML=scores.S1;
    document.getElementById("Score2").innerHTML=scores.S2;
    document.getElementById("Score4").innerHTML=scores.S3;
}
const requestToStart= async function( event ) {

  event.preventDefault()
  if (!currentlyPlaying){
    const response = await fetch( "/submit", {
        method:
        "POST",
        body:"START"
    })

    const text = await response.text()
    console.log(text);
    if (text.localeCompare("Y")==0){
        //player has submitted params and is ready
        await getParamsForRun();
        currentlyPlaying=true;
        playGames(0);
    }
  }
}


async function playGames(testNum){

    document.getElementById("Display").src="https://github.com/TNWing/a2-TrevorNg/blob/main/public/imgs/go.png?raw=true";
    await wait(2000);
    document.getElementById("Display").src="https://github.com/TNWing/a2-TrevorNg/blob/main/public/imgs/0.png?raw=true";
    await wait(650);
    console.log("GAME # " + testNum);
    switch(testNum){
        case 0:{
            yesNoPatternFunc();
            break;
        }
        case 1:{
            speedPatternFunc();
            break;
        }
    }
}


function wait(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


//like simon says. The first pattern will be all green, with subsequent patterns having red arrows in some spots
async function yesNoPatternFunc(){
    var score=0;
    var run=true;
    while (run){
        //pattern gen
        var pattern=[];
        var keyList=[];
        var length=3+Math.ceil(Math.random() * 3);//pattern ranges from 3 to 7 keys
        var reps=1+Math.ceil(Math.random()*3);//2-5 reps
        var indexToAlter=Math.ceil(Math.random()*(length*reps-1))-1;
        for (let i=0;i<length;i++){
            pattern.push(37 + Math.floor(Math.random()*4));
        }
        for (let l=0;l<length;l++){
            var current=pattern[l];
            keyList.push(current);
        }
        for (let r = 1; r<reps; r++) {
            for (let l=0;l<length;l++){
                var i=r*length + l;
                var current=pattern[l];
                if (Math.floor(Math.random()*100)<=Number(currentRunParams.grChance)){
                   current+=100;
                }
                keyList.push(current);
            }
        }

        //then, start to display the pattern
        for (let i=0;i<keyList.length;i++){
            console.log("IMG #"+i);
            var code=keyList[i];
            var imgName="";
            var shouldPress=true;
            if (code>100){
                shouldPress=false;
                code-=100;
                imgName=(code-36).toString() + "red.png";
            }
            else{
                imgName=(code-36).toString() + ".png";
            }

            var link="https://github.com/TNWing/a2-TrevorNg/blob/main/public/imgs/" +imgName + "?raw=true";
            document.getElementById("Display").src=link;
            console.log(Number(currentRunParams.grDelay));
            await wait(Number(currentRunParams.grDelay));

            if (shouldPress && currentKeyPress!=code || !shouldPress && currentKeyPress!=0){
                run=false;
                break;
            }
            else{
                currentKeyPress=0;
                link="https://github.com/TNWing/a2-TrevorNg/blob/main/public/imgs/0.png?raw=true";
                document.getElementById("Display").src=link;
                await wait(300);
            }
        }
        if (run){
            score++;
        }

    }
    document.getElementById("Display").src="https://github.com/TNWing/a2-TrevorNg/blob/main/public/imgs/0.png?raw=true";
    await(1500);
    updateScore(0,score);
};

//constantly switches keys, lowest time frame for success
//score is equal to # of correct keys pressed in a row
async function speedPatternFunc(){
    var score=0;
    var run=true;
    var isRed=false;
    while (run){
        //pattern gen
        var code=Math.floor(Math.random()*4)+1;

        var imgName=""
        if (isRed){
            imgName=(code).toString() + "red.png";
        }
        else{
            imgName=(code).toString() + ".png";
        }
        code+=36;
        var link="https://github.com/TNWing/a2-TrevorNg/blob/main/public/imgs/" +imgName + "?raw=true";
        document.getElementById("Display").src=link;
        console.log(Number(currentRunParams.spdDelay));
        await wait(Number(currentRunParams.spdDelay));
        console.log(currentKeyPress);
        console.log(code);
        if (currentKeyPress!=code){
            run=false;
            break;
        }
        else{
            score++;
            isRed=!isRed;
            currentKeyPress=0;
        }
    }
        document.getElementById("Display").src="https://github.com/TNWing/a2-TrevorNg/blob/main/public/imgs/0.png?raw=true";
        await(1500);
    updateScore(1,score);
};


/*
left arrow	37	ArrowLeft	ArrowLeft
up arrow	38	ArrowUp	ArrowUp
right arrow	39	ArrowRight	ArrowRight
down arrow	40	ArrowDown	ArrowDown
*/
document.addEventListener("keydown", (event) => {
    var code=event.keyCode;
    currentKeyPress=code;

  // do something
});

async function deleteData(event){
  if (!currentlyPlaying){
    const response = await fetch( "/submit", {
        method:
        "POST",
        body:"DELETE"
    })
    const text = await response.text()
    var scores=JSON.parse(text);
    console.log(scores);
    document.getElementById("Score1").innerHTML=scores.S1;
    document.getElementById("Score2").innerHTML=scores.S2;
    document.getElementById("Score4").innerHTML=scores.S3;
  }
}

window.onload = function() {
   const button = document.getElementById("submitParams");
  button.onclick = updateParameters;
  const button2 = document.getElementById("startGame");
    button2.onclick = requestToStart;
    var delBut=document.getElementById("delData");
    delBut.onclick=deleteData;
    updateBestScore();
}