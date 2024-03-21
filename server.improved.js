const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

var appdata = [
  {
    "name":"undertale",
    "gram0":"nude alert",
    "gram1":"unrelated",
    "gram2":"delta rune",
    "gram3":"nut dealer",
    "gram4":"elate rund"
  }
];

const dictionary = fs.readFileSync("dictionary.txt", { encoding: 'utf8', flag: 'r' }).split("\r\n");
// console.log(dictionary[0]);
/*
  Anagram algorithm:
    Filter dictionary, removing words that it cannot form. 
      Maybe remove this because it's covered by DFS
    Shuffle filtered dictionary -- TODO
    do a DFS search through the list. 
      Keep track of which letters remain
      If you find a word that works, add it and go down another layer. Start looking for another
      If you get to the end of the dict with no words, go back up a layer.
      To make things more interesting... possibly
        perhaps prioritize words of higher length? Put them earlier in the list so they'll be chosen more?
*/

//Creates a set of all allowed letters.
const lettersString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersSet = new Set(lettersString.split(""));
/*
Given a string, returns the upper case version with only the letters. 
This will help to build the letter data object.
*/
function sanitize(string){
  var newString = "";
  for(var i = 0; i < string.length; i++){
    var letter = string.charAt(i).toUpperCase();
    if(lettersSet.has(letter)){
      newString+=letter;
    }
  }
  return newString;
}

/*
Returns a JSON object with keys corresponding to each letter and values corresponding to the number of
times each letter occurs in the string.

Assumes string is already sanitized. If not it will throw an error.
*/
function getLetterData(string){
  var obj = {};
  for(var i = 0; i < lettersString.length; i++){
    var letter = lettersString.charAt(i);
    obj[letter]=0;
  }
  for(var i = 0; i < string.length; i++){
    obj[string.charAt(i)]++;
  }
  return obj;
}

function getLetterDataMatch(ldBig,ldSmall){
  var overlap = {};
  for(const letter in ldSmall){
    if(!(letter in ldBig) || ldBig[letter] < ldSmall[letter]){
      return false;
    }
    overlap[letter] = ldBig[letter] - ldSmall[letter];
  }
  return overlap;
}

function buildLetterDictionary(dict){
  var output = [];
  for(var i = 0; i < dict.length; i++){
    output.push({word:dict[i],ld:getLetterData(dict[i])});
  }
  return output;
}

function isEmpty(letterData){
  for(const letter in letterData){
    if(letterData[letter]>0){
      return false;
    }
  }
  return true;
}

const letterDataDict = buildLetterDictionary(dictionary);

//letter data is an object of letter:num occurrences
function getAnagramsRecursive(letterData, dict, maxNum){
  let dictCopy = [...dict];
  var rsf = [];
  while(dictCopy.length > 0){
    // console.log(dictCopy[0]);
    // console.log(letterData);
    let match = getLetterDataMatch(letterData,dictCopy[0].ld);
    if(match){
      //TODO: Do a recursive call using match instead of letter data.
      
      if(isEmpty(match)){
        return [dictCopy[0].word];
      }
      console.log(dictCopy.length);
      var call = getAnagramsRecursive(match,dictCopy,maxNum);
      if(call.length === 0){
        //This letter should be ignored.

      }else{
        //Found an anagram that ends with the call result.
        return [dictCopy[0].word].concat(call);
      }
    }
    dictCopy.splice(0,1);
  }
  //This is not right
  return [];
}

console.log(getAnagramsRecursive(getLetterData(sanitize('undertle')),letterDataDict,12));

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    // Make a random anagram of the name?

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("test")
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
