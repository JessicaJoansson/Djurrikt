const animals = ['lo', 'bjorn', 'alg', 'jarv', 'vildsvin', 'gravling'];
let currentAnimal = "";
let currentAudio = null; 
let correctGuesses = 0;
let hasStarted = false; 

function nextRound() {
if (correctGuesses === animals.length) {
showWinPopUp(); 
return; 
}

const randomIndex = Math.floor(Math.random() * animals.length);
currentAnimal = animals[randomIndex];
    
const checkVisibility = document.querySelector(`img[onclick="guess('${currentAnimal}')"]`);
if (checkVisibility && checkVisibility.style.visibility === 'hidden') {
nextRound(); 
return;
}

if (hasStarted) {
setTimeout(() => {
playCurrentSound();
}, 800);
} else {
document.getElementById('feedback');
}
}

function playCurrentSound() {
hasStarted = true; 

stopAllAudio();

currentAudio = new Audio('ljud/' + currentAnimal + '.mp3');
currentAudio.play().catch(error => console.log("Ljudfil saknas eller blockeras"));
    
document.getElementById('feedback').innerText = "Vem låter?";
document.getElementById('feedback').style.color = "#2d3e2d";
}

function stopAllAudio() {
if (currentAudio) {
currentAudio.pause();
currentAudio.src = ""; 
currentAudio.load();
currentAudio = null;
}
}

function guess(choice) {
const feedback = document.getElementById('feedback');
const clickedElement = event.target; 

if (choice === currentAnimal) {

stopAllAudio();
feedback.innerText = "RÄTT!";
feedback.style.color = "green";

clickedElement.style.visibility = 'hidden'; 
correctGuesses++;

setTimeout(() => {
feedback.innerText = "";
nextRound();
}, 1500);

} else {
feedback.innerText = "Fel djur, lyssna igen!";
feedback.style.color = "red";
}
}

function showWinPopUp() {
stopAllAudio();

const modal = document.getElementById('win-modal');
modal.style.display = 'flex';

const duration = 5 * 1000;
const animationEnd = Date.now() + duration;
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 };

const interval = setInterval(function() {
const timeLeft = animationEnd - Date.now();
if (timeLeft <= 0) return clearInterval(interval);

const particleCount = 50 * (timeLeft / duration);
confetti(Object.assign({}, defaults, { 
particleCount, 
origin: { x: Math.random(), y: Math.random() - 0.2 },
scalar: 1.2,
colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
}));
}, 250);
}

function closeModal() {
document.getElementById('win-modal').style.display = 'none';
resetGame();
}

function resetGame() {
correctGuesses = 0;
hasStarted = false;
stopAllAudio();
    
const images = document.querySelectorAll('.animal-row img');
images.forEach(img => {
img.style.visibility = 'visible';
});

document.getElementById('feedback').innerText = "Klicka på bilden för att starta!";
nextRound();
}

window.onload = nextRound;