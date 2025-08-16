//get references of html elements

const promptElement=document.getElementById('prompt');
const inputElement =document.getElementById('input');
const timeElement =document.getElementById('time');
const scoreElement =document.getElementById('score');
const startButton =document.getElementById('start-btn');
const restartButton =document.getElementById('restart-btn');
const resultElement=document.getElementById('result');
const wpmElement =document.getElementById("wpm");
const accuracyElement=document.getElementById("accuracy");

const resTime=document.getElementById('r-time');
const resWpm =document.getElementById("r-wpm");
const resAccuracy=document.getElementById("r-accuracy");
const resErrors=document.getElementById("r-errors");
//lets store sentences

let words=[
    "JavaScript is awesome",
    "I love coding",
    "Frontend development is fun",
    "Typing speed test game"
];

//initialize all elements
let currentText ="";
let charIndex=0;
let timeLeft=30;
let mistakes=0;
let timer=null;
let isPlaying=false;

//create function to chose random prompt
function loadPrompt(){
    currentText=words[Math.floor(Math.random() * words.length)];

    promptElement.innerHTML="";
    //loop through each character in the text
    currentText.split("").forEach( char => {
      let span=document.createElement("span");
      span.textContent=char;
      promptElement.appendChild(span);
    });
}
//create start game function 

function startGame(){

   if(isPlaying){
    return;
   }
   isPlaying=true;
   loadPrompt();
   inputElement.innerText="";
   inputElement.focus();
   inputElement.disabled=false;

   charIndex=0;
   mistakes=0;
   timeLeft=30;

   //start countdown timer
   timer =setInterval(() => {
    if(timeLeft>0){
      timeLeft--;
      updateStats();
    }
    else{
      endGame();
    }
   }, 1000);   
}
//handle typing input 
  inputElement.addEventListener("input", ()=>{
    const characters=promptElement.querySelectorAll("span");
    const typeChar=inputElement.value.split("")[charIndex];
    if(charIndex >= currentText.length){
      endGame();
    }
    console.log(charIndex ,currentText.length);

    if(typeChar == null){
       if(charIndex >0 ){
        charIndex--;
        if(characters[charIndex].classList.contains("wrong")){
          mistakes--;
        }
        characters[charIndex].classList.remove("correct","wrong");
       }
    }
    else{
      if(typeChar === currentText[charIndex]){
        characters[charIndex].classList.add("correct");
      }
      else{
        characters[charIndex].classList.add("wrong");
        mistakes++;
      }
      charIndex++;
    }
     updateStats();

  });

  //create updateStats function

  function updateStats(){
    timeElement.textContent=timeLeft;
    const correctChars=charIndex-mistakes;
    const wpm =Math.round(correctChars/5)/((60-timeLeft)/60)||0;
    const accuracy=Math.round((correctChars/charIndex)*100)||0;
    
    wpmElement.textContent=wpm.toFixed(2);
    accuracyElement.textContent=accuracy;
    resTime.innerText=timeLeft;
    resWpm.innerText=wpm.toFixed(2);
    resAccuracy.innerText=accuracy;
    resErrors.innerText=mistakes;
    
  }

function endGame(){
  clearInterval(timer);
  isPlaying=false;
  inputElement.disabled=true;
  restartButton.disabled=false;
}

function restart(){
  clearInterval(timer);
  isPlaying=false;
  charIndex=0;
  mistakes=0;
  inputElement.disabled=true;
  inputElement.value="";
  promptElement.innerHTML="";
  timeLeft=30;
  wpmElement.innerText="0";
  timeElement.textContent=timeLeft;
  accuracyElement.textContent="0"
}

//create both start and restart button interactive

startButton.addEventListener("click" ,startGame);
restartButton.addEventListener("click" ,restart);







