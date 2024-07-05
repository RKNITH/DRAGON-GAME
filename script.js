let score = 0;
let cross = true;
let gameInterval;
let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');
let gameStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const dino = document.querySelector('.dino');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);

    document.onkeydown = function (e) {
        if (!gameStarted) return;
        if (e.keyCode == 38) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }
        if (e.keyCode == 39) {
            let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
        }
        if (e.keyCode == 37) {
            let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";
        }
    }

    function startGame() {
        gameStarted = true;
        startBtn.style.display = 'none';
        gameOver.style.display = 'none';
        obstacle.classList.add('obstacleAni');
        audio.play();
        score = 0;
        updateScore(score);
        cross = true;

        gameInterval = setInterval(() => {
            let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

            let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
            let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

            let offsetX = Math.abs(dx - ox);
            let offsetY = Math.abs(dy - oy);

            if (offsetX < 73 && offsetY < 52) {
                gameOver.innerHTML = "Game Over - Reload to Play Again";
                obstacle.classList.remove('obstacleAni');
                audiogo.play();
                setTimeout(() => {
                    audiogo.pause();
                    audio.pause();
                }, 1000);
                gameStarted = false;
                clearInterval(gameInterval);
                restartBtn.style.display = 'block';
            } else if (offsetX < 145 && cross) {
                score += 1;
                updateScore(score);
                cross = false;
                setTimeout(() => {
                    cross = true;
                }, 1000);
                setTimeout(() => {
                    let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                    let newDur = aniDur - 0.1;
                    obstacle.style.animationDuration = newDur + 's';
                }, 500);
            }
        }, 10);
    }

    function restartGame() {
        obstacle.style.animationDuration = '5s';
        dino.style.left = '52px';
        restartBtn.style.display = 'none';
        startGame();
    }

    function updateScore(score) {
        document.getElementById('scoreCont').innerHTML = "Your Score: " + score;
    }
});
