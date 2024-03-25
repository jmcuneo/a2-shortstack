// FRONT-END (CLIENT) JAVASCRIPT HERE
var scoreObj={//contains the top 3 best scores of a given category
    memScore:[null,null,null],
    suddenScore:[null,null,null],
    switchScore:[null,null,null],
};
var currentKeyPress=0;
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#yourname" ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()

  console.log( "text:", text )
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
                if (Math.floor(Math.random()*3)==0){
                   current+=100;
                }
                else{


                }
                keyList.push(current);
            }
        }

        //then, start to display the pattern
        for (let i=0;i<keyList.length;i++){
            console.log("IMAGE # " + i);
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
            await wait(200);
            if (currentKeyPress!=code || !shouldPress){
                run=false;
                break;
            }
        }
        if (run){
            score++;
        }

    }
    alert ("Your score is " + score);
};
function wait(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function startTest(){
    if (document.getElementById("tests")){
        console.log(document.getElementById("tests").value);
        switch(document.getElementById("tests").value){
            case '0':{
                yesNoPatternFunc();
                break;
            }
            case '1':{
                break;
            }
            case '2':{
                break;
            }
            default:{
                break;
            }
        }
    }
}
window.addEventListener('load',	(event) =>
document.getElementById("TestStart").addEventListener("click",startTest));

//constantly switches keys, lowest time frame for success
//score is equal to # of correct keys pressed in a row
function constantSwitchPatternFunc(){
};

//score is equal to size of the last memory pattern successfully done
function memoryPatternFunc(){

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
function readInput(input){
}

function clearScoreFunc(index){
    switch(index){
        case 0:{
            scoreObj.suddenScore=[null,null,null];
            break;
        }
        case 1:{
            scoreObj.switchScore=[null,null,null];
            break;
        }
        case 2:{
            scoreObj.memScore=[null,null,null];
            break;
        }
        default:{
            break;
        }
    }
};
window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}