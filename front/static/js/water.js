const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const modal = document.getElementById('modal');
const startButton = document.getElementById('start-button');
const backButton = document.getElementById('back-button');
const scoreDiv = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
const backgroundMusic = document.getElementById('background-music');

let score = 0;
let gameOver = false;
let timeRemaining = 60; // Tempo de 60 segundos

// Carregando as imagens
const playerImg = new Image();
playerImg.src = '/static/resources/images/elementos_graficos/esquilo.png';

const itemImg = new Image();
itemImg.src = '/static/resources/images/elementos_graficos/garrafa.png';

const obstacleImg = new Image();
obstacleImg.src = '/static/resources/images/elementos_graficos/arvore.png';

// Definindo o personagem
const player = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    speed: 5
};

// Arrays para itens e obstáculos
const items = [];
const obstacles = [];

// Movimentação do personagem
let keys = {};

window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

// Função para movimentar o personagem
function movePlayer() {
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y + player.height < canvas.height) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;
}

// Função para verificar colisão com itens ou obstáculos
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Função para gerar novos itens e obstáculos
function spawnItemOrObstacle() {
    const isObstacle = Math.random() < 0.35; // 35% de chance de gerar um obstáculo

    const newObject = {
        x: Math.random() * (canvas.width - 30),
        y: Math.random() * (canvas.height - 30),
        width: 40,
        height: 40,
        collected: false
    };

    if (isObstacle) {
        newObject.type = 'obstacle';
        obstacles.push(newObject);
    } else {
        newObject.type = 'item';
        items.push(newObject);
    }
}

// Função para atualizar o jogo
function updateGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimentação do personagem
    movePlayer();

    // Desenhando o personagem
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // Desenhando e coletando itens
    items.forEach(item => {
        if (!item.collected && checkCollision(player, item)) {
            item.collected = true;
            score += 10;
            document.getElementById('score-value').innerText = score;
        }
        if (!item.collected) {
            ctx.drawImage(itemImg, item.x, item.y, item.width, item.height);
        }
    });

    // Desenhando obstáculos
    obstacles.forEach(obstacle => {
        ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Verificar colisão com o personagem
        if (!gameOver && checkCollision(player, obstacle)) {
            gameOver = true;
            alert(`Game Over! Sua pontuação final é: ${score}`);
            alert(`Guarde sua pontuação, o jogo será reiniciado`);
            window.location.reload();
        }
    });

    // Exibir tempo e pontuação
    document.getElementById('time-value').innerText = timeRemaining;

    requestAnimationFrame(updateGame);
}

// Função para contar o tempo
function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
            gameOver = true;
            alert(`Tempo esgotado! Sua pontuação final é: ${score}`);
            alert(` ..:: (: ::.. o jogo será reiniciado`);
            window.location.reload();
        }
    }, 1000);
}

// Função para iniciar o jogo
startButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Esconde o modal
    scoreDiv.style.display = 'block'; // Mostra o placar
    gameContainer.style.display = 'block'; // Mostra o canvas
    backgroundMusic.play(); // Começa a música
    startTimer(); // Inicia o timer
    setInterval(spawnItemOrObstacle, 1200); // Adiciona itens e obstáculos
    updateGame(); // Começa o loop do jogo
});

// Função para voltar
backButton.addEventListener('click', () => {
    alert('Você escolheu voltar. Até a próxima!');
    window.history.back(); // Volta para a página anterior
});

// Pausa a música e reinicia o jogo ao recarregar
window.addEventListener('beforeunload', () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
});
