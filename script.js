const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const winMessage = document.getElementById('win-message');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let gameInterval;
const winningScore = 5;

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    winMessage.style.display = 'none';
    restartBtn.style.display = 'none';

    moles.forEach(mole => mole.disabled = false);

    gameInterval = setInterval(popOutRandomMole, 1000);
}

function popOutRandomMole() {
    moles.forEach(mole => mole.classList.remove('active'));

    const randomIndex = Math.floor(Math.random() * moles.length);
    moles[randomIndex].classList.add('active');
}

function whackMole(mole) {
    if (mole.classList.contains('active')) {
        score++;
        scoreDisplay.textContent = score;
        
        mole.classList.remove('active');

        if (score >= winningScore) {
            stopGame();
        }
    }
}

function stopGame() {
    clearInterval(gameInterval);
    moles.forEach(mole => {
        mole.classList.remove('active');
        mole.disabled = true;
    });
    winMessage.style.display = 'block';
    restartBtn.style.display = 'inline-block';
}

moles.forEach(mole => {
    mole.addEventListener('click', () => {
        whackMole(mole);
    });
});

restartBtn.addEventListener('click', startGame);

startGame();