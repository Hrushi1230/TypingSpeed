//get references of html elements

const promptElement=document.getElementById('prompt');
const inputElement =document.getElementById('input');
const timeElement =document.getElementById('time');
const scoreElement =document.getElementById('score');
const startButton =document.getElementById('start-btn');
const restartButton =document.getElementById('restart-btn');
const resultElement=document.getElementById('result');

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
let score =0;
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
   charIndex=0;
   mistakes=0;
   timeLeft=30;

   //start countdown timer
   timer =setInterval(() => {
    if(timeLeft>0){
      timeLeft--;
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

  });

function endGame(){
  clearInterval(timer);
  isPlaying=false;
  inputElement.disabled=true;
}

startGame();



