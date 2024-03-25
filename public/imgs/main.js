// FRONT-END (CLIENT) JAVASCRIPT HERE
var scoreObj={//contains the top 3 best scores of a given category
    memScore:[null,null,null];
    suddenScore:[null,null,null];
    switchScore:[null,null,null];
};
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


//follows a given pattern for a bit, but with one random changed value
//each successful completion of a keylist gives 1 point
var suddenChangePatternFunc(){
    var score=0;
    while (true){
        //pattern gen
        var pattern=[];
        var keyList=[];
        var length=3+Math.ceil(Math.random() * 3);//pattern ranges from 3 to 7 keys
        var reps=1+Math.ceil(Math.random()*3);//2-5 reps
        var indexToAlter=Math.ceil(Math.random()*(length*reps-1))-1;
        for (let i=0;i<length;i++){
            pattern.push(37 + Math.floor(Math.random()*4));
        }
        for (let r = 0; r<reps; r++) {
            for (let l=0;l<length;l++){
                var i=r*length + l;
                var current=pattern[l];
                if (i===indexToAlter){
                    var keyCodes=[37,38,39,40];
                    var index = keyCodes.indexOf(current);
                    keyCodes.splice(index,1);
                    keyList.push(keyCodes[Math.floor(Math.random()*3)])
                }
                else{
                    keyList.push(current);
                }
            }
        }

        //then, start to display the pattern
        for (let i=0;i<keyList.length;i++){
            var code=keyList[i];
        }
    }
};

//constantly switches keys, lowest time frame for success
//score is equal to # of correct keys pressed in a row
var constantSwitchPatternFunc(){
};

//score is equal to size of the last memory pattern successfully done
var memoryPatternFunc(){

};
/*
left arrow	37	ArrowLeft	ArrowLeft
up arrow	38	ArrowUp	ArrowUp
right arrow	39	ArrowRight	ArrowRight
down arrow	40	ArrowDown	ArrowDown
*/
document.addEventListener("keydown", (event) => {
    var code=event.keyCode;

  // do something
});
var readInput(input){
}

var clearScoreFunc(index){
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