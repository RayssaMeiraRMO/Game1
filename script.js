const mario = document.getElementById('mario');
const obstaculo = document.getElementById('obstaculo');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let marioPosition = 50;
let score = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (marioPosition >= 200) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (marioPosition <= 50) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                marioPosition -= 10;
                mario.style.bottom = marioPosition + 'px';
            }, 20);

        } else {
            marioPosition += 10;
            mario.style.bottom = marioPosition + 'px';
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Movimento do obstáculo e pontuação
let obstaculoPosition = 800;
function moveObstacle() {
    obstaculoPosition -= 5;
    obstaculo.style.right = obstaculoPosition + 'px';

    if (obstaculoPosition < -50) {
        obstaculoPosition = 800;
        score++;
        scoreDisplay.innerText = 'Pontuação: ' + score;
    }

    // Colisão simples
    if (
        obstaculoPosition < 100 &&
        obstaculoPosition > 50 &&
        marioPosition < 100
    ) {
        alert('Game Over! Sua pontuação: ' + score);
        // Reset do jogo
        obstaculoPosition = 800;
        score = 0;
        scoreDisplay.innerText = 'Pontuação: 0';
        marioPosition = 50;
        mario.style.bottom = marioPosition + 'px';
    }

    requestAnimationFrame(moveObstacle);
}

moveObstacle();
