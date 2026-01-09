const animals = ['lo', 'bjorn', 'alg', 'jarv', 'vildsvin', 'gravling'];
let currentAnimal = "";
let currentAudio = null; 
let correctGuesses = 0;
let hasStarted = false; 

// FUNKTION FÖR ATT BLANDA BILDERNA FYSISKT
function shuffleImages() {
    const container = document.querySelector('.animal-row');
    const images = Array.from(container.children);
    
    // Blanda listan med bilder
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    
    // Lägg tillbaka bilderna i den nya ordningen
    images.forEach(img => container.appendChild(img));
}

function nextRound() {
    if (correctGuesses === animals.length) {
        showWinPopUp(); 
        return; 
    }

    // Slumpar fram ett djur
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
        // Första gången spelet laddas: Blanda bilderna på skärmen
        shuffleImages();
        const feedback = document.getElementById('feedback');
        feedback.innerText = "Klicka här för att starta spelet!";
        feedback.style.color = "#2d3e2d";
    }
}

function playCurrentSound() {
    hasStarted = true; 
    stopAllAudio();

    currentAudio = new Audio('ljud/' + currentAnimal + '.mp3');
    currentAudio.play().catch(error => console.log("Ljudfil saknas eller blockeras"));

    const feedback = document.getElementById('feedback');
    feedback.innerText = "Vem låter?";
    feedback.style.color = "#2d3e2d";
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
    if (!hasStarted) return; 

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

    // Blanda bilderna igen vid omstart
    shuffleImages();
    nextRound();
}

window.onload = nextRound;