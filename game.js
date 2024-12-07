const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const maxHeight = 20;
const intplayHeight = canvas.height - 170;
const jumpPower = -14;
const gravity = 0.7;
const endscreenImage = new Image();
endscreenImage.src = 'endscreen.png';

const backgroundImage = new Image();
backgroundImage.src = '3background.png';
let background = { x: 200, y: 200, width: 800, height: 800, speed: 3 };

const bannerImage = new Image();
bannerImage.src = 'black.png';
let banner = { x: 595, y: 16, width: 220, height: 60, speed: 3 };

const playerImage = new Image();
playerImage.src = 'rizzler2.png';
let player = { x: 100, y: intplayHeight, width: 56.6695, height: 170, speed: 0, velocityY: 0 };

const obstacleImage = new Image();
obstacleImage.src = 'chickenbake0.png';
let obstacle = { x: canvas.width + Math.random() * 1500, y: canvas.height - 63, width: 40, height: 63, speed: 9 };

const statsImage = new Image();
statsImage.src = 'boom0.png';
let stats = { x: 600, y: 20, width: 97, height: 53.8, speed: 3 };

let score = 0;
let isJumping = false;
let isEnd = false;
let canJump = true;

function increaseScore() {
    ctx.font = '50px Comic Sans';
    ctx.fillStyle = 'white';
    ctx.fillText(': ' + score, 700, 64.5);
}

setInterval(increaseSpeed, 10000);

function increaseSpeed() {
    obstacle.speed += 0.8;
    score += 1;
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp' && canJump && !isJumping && !isEnd) {
        player.velocityY = jumpPower;
        isJumping = true;
        canJump = false; 
    }

 
    if (event.code === 'ArrowUp' && isEnd) {
        isEnd = false;
        player.x = 100;
        player.y = intplayHeight;
        player.velocityY = 0;
        obstacle.x = canvas.width + Math.random() * 1500;
        obstacle.speed = 8;
        score = 0;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === "ArrowUp") {
        canJump = true;
    }
});

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function updateObstacle() {
    obstacle.x -= obstacle.speed;

    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width + Math.random() * 1500;
    }

    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y) {
        isEnd = true;
    }
}

function update() {
    if (!isEnd) {
        updateObstacle();
        player.velocityY += gravity;
        player.y += player.velocityY;
        if (player.y >= intplayHeight) {
            player.y = intplayHeight;
            player.velocityY = 0;
            isJumping = false;
            canJump = true;
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isEnd) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bannerImage, banner.x, banner.y, banner.width, banner.height);
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.drawImage(statsImage, stats.x, stats.y, stats.width, stats.height);
        increaseScore();
    } else {
        ctx.drawImage(endscreenImage, 0, 0, canvas.width, canvas.height);
    }
}

gameLoop();