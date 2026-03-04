const player = document.getElementById("player");
const game = document.getElementById("game");

let velocityY = 0;
let gravity = 0.8;
let isJumping = false;
let playerX = 50;
let playerY = 50;
let speed = 4;
let keys = {};

const runSprites = [
    "images/run1.png",
    "images/run2.png"
];
let runFrame = 0;

// controles
document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

function gameLoop() {
    // esquerda / direita
    if (keys["ArrowRight"]) playerX += speed;
    if (keys["ArrowLeft"]) playerX -= speed;

    // gravidade
    velocityY -= gravity;
    playerY += velocityY;

    // chão
    if (playerY < 50) {
        playerY = 50;
        velocityY = 0;
        isJumping = false;
    }

    // pulo
    if (keys["Space"] && !isJumping) {
        velocityY = 15;
        isJumping = true;
    }

    // atualiza posição
    player.style.left = playerX + "px";
    player.style.bottom = playerY + "px";

    // animação corrida
    if (!isJumping && (keys["ArrowRight"] || keys["ArrowLeft"])) {
        player.style.backgroundImage = `url(${runSprites[Math.floor(runFrame)])})`;
        runFrame += 0.2;
        if (runFrame >= runSprites.length) runFrame = 0;
    } else if (isJumping) {
        player.style.backgroundImage = "url('images/jump.png')";
    } else {
        player.style.backgroundImage = `url('${runSprites[0]}')`;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
