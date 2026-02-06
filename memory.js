const cardsData = [
    { img: "img/fjallrav.png", pairID: 'fjallrav' },
    { img: "img/realfjallrav.png", pairID: 'fjallrav' },
    { img: "img/gravling.png", pairID: 'gravling' },
    { img: "img/realgravling.png", pairID: 'gravling' }, 
    { img: "img/bjorn.png", pairID: 'bjorn' },
    { img: "img/realbjorn.png", pairID: 'bjorn' }, 
    { img: "img/lo.png", pairID: 'lo' },
    { img: "img/reallodjur.png", pairID: 'lo' },
    { img: "img/alg.png", pairID: 'alg' },
    { img: "img/realalg.png", pairID: 'alg' },
    { img: "img/nabbmus.png", pairID: 'nabbmus' },
    { img: "img/realnabbmus.png", pairID: 'nabbmus' },
    { img: "img/jarv.png", pairID: 'jarv' },
    { img: "img/realjarv.png", pairID: 'jarv' },
    { img: "img/vildsvinet.png", pairID: 'vildsvin' },
    { img: "img/realvildsvin.png", pairID: 'vildsvin' },
];

let flippedCards = [];
let matchedCount = 0;
const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const totalDisplay = document.getElementById('total');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = '';
    const shuffled = shuffle([...cardsData]); 
    totalDisplay.innerText = cardsData.length / 2;
    
    shuffled.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.pair = data.pairID; 
        
    const img = document.createElement('img');
    img.src = data.img;
    img.alt = "Memory del";
        
    card.appendChild(img);
    card.addEventListener('click', flipCard);
    board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
    checkMatch();
    }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.pair === card2.dataset.pair) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount++;
        scoreDisplay.innerText = matchedCount;
        flippedCards = [];

        if (matchedCount === cardsData.length / 2) {
        setTimeout(showWinPopUp, 500);
        }
    } else {
    setTimeout(() => {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    flippedCards = [];
    }, 1000);
    }
}

function showWinPopUp() {
  
    const modal = document.getElementById('win-modal');
    modal.style.display = 'flex';

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 }; 

    const interval = setInterval(function() {
   const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
    return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
        
    confetti(Object.assign({}, defaults, { 
    particleCount, 
    origin: { x: Math.random(), y: Math.random() - 0.2 },
    scalar: 1.2,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'] 
    }));
    }, 250);
}

function closeModal() {
    document.getElementById('win-modal').style.display = 'none';
    resetGame();
}

function resetGame() {
    matchedCount = 0;
    scoreDisplay.innerText = "0";
    flippedCards = [];
    createBoard();
}

createBoard();