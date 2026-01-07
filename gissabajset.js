const animalsData = [
    { name: "Älg", poopImg: "img/algbajs.png", animalImg: "img/alg.png", fact: "Älgar Kan springa upp till 60 km/h vid behov."},
    { name: "Järv", poopImg: "img/jarvbajs.png", animalImg: "img/jarv.png", fact: "Järvens fötter fungerar som snöskor och gör att de kan springa på snön när det är skare."},
    { name: "Fjällräv", poopImg: "img/fjallravbajs.png", animalImg: "img/fjallrav.png", fact: "Tack vare sin tjocka päls och håriga tassar klarar fjällräven sig bra i kyla så kallt som till –40 grader."},
    { name: "Näbbmus", poopImg: "img/nabbmusbajs.png", animalImg: "img/nabbmus.png", fact: "Varje dygn behöver näbbmusen äta mer än vad den väger för att inte svälta ihjäl, kan svälta ihjäl på två timmar. " },
    { name: "Grävling", poopImg: "img/gravlingbajs.png", animalImg: "img/gravling.png", fact: "Grävlingar är väldigt rena djur. De bajsar inte i sitt bo utan har en särskild plats utanför" },
    { name: "Lodjur", poopImg: "img/lodjurbajs.png", animalImg: "img/lo.png", fact: "Lodjur har tofsar på öronen som inte bara är snygga – de fungerar som små “antennförlängare” som hjälper dem att höra bättre. Typ naturens egen Wi-Fi-router med päls." },
    { name: "Vildsvin", poopImg: "img/vildsvinbajs.png", animalImg: "img/vildsvinet.png", fact: "Ett vildsvin kan springa i upp till 50kg/h, de lever i grupper som kallas för sounders och kommunicerar med olika ljud." },
    { name: "Björn", poopImg: "img/bjornbajs.png", animalImg: "img/bjorn.png", fact: "Björnar är duktiga klättrare och goda simmare, även om vuxna björnar undviker att klättra i träd." }
];

let currentQuestionIndex = 0;
let score = 0;
let gameQuestions = [];

const questionImage = document.getElementById('question-image');
const optionsGrid = document.getElementById('options-grid');
const scoreSpan = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
const endScreen = document.getElementById('end-screen');
const finalScoreSpan = document.getElementById('final-score');
const modal = document.getElementById('fact-modal');
const modalAnimalName = document.getElementById('modal-animal-name');
const modalAnimalImg = document.getElementById('modal-animal-img');
const modalFactText = document.getElementById('modal-fact-text');
const nextBtn = document.getElementById('next-btn');

function startGame() {
    gameQuestions = [...animalsData].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const currentData = gameQuestions[currentQuestionIndex];
    questionImage.src = currentData.poopImg;
    optionsGrid.innerHTML = '';

    let options = [currentData.name];
    const wrongAnswers = animalsData
        .filter(a => a.name !== currentData.name)
        .map(a => a.name);
   
    const shuffledWrong = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
    options = options.concat(shuffledWrong).sort(() => Math.random() - 0.5);

    options.forEach(name => {
        const btn = document.createElement('button');
        btn.innerText = name;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(name, btn);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const correct = gameQuestions[currentQuestionIndex].name;
    if (selected === correct) {
        score++;
        scoreSpan.textContent = score;
        showPopup();
    } else {
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 500);
    }
}

function showPopup() {
    const data = gameQuestions[currentQuestionIndex];
    modalAnimalName.innerText = data.name;
    modalAnimalImg.src = data.animalImg;
    modalFactText.innerText = data.fact;
    modal.style.display = 'flex';
}

nextBtn.onclick = () => {
    modal.style.display = 'none';
    currentQuestionIndex++;
    if (currentQuestionIndex < gameQuestions.length) loadQuestion();
    else endGame();
};

startGame();

function showWinPopUp() {
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
            scalar: 1.4, 
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
        }));
    }, 250);
}
function endGame() {
showWinPopUp();
}
