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
let currentIndex=0;
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
loadPrompt();



