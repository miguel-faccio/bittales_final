// Variáveis principais
let score = 0;
let timeLeft = 10;
let insideSafeZone = false;
const initialTime = 10;
let panicMode = false;
const timerBar = document.querySelector('.timer-bar');
const safeZone = document.querySelector('.safe-zone');
const ball = document.querySelector('.player-ball');
let ballPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let gameInterval;
let moveInterval;
const gameOverModal = document.getElementById('game-over-modal');

// Movimentação da bolinha
let movement = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let speed = 5; // Velocidade inicial
const originalSafeZoneSize = safeZone.offsetWidth; // Tamanho original da safe-zone

// Função para mover a bolinha e aplicar limites da tela
function moveBall() {
    let newX = ballPosition.x;
    let newY = ballPosition.y;

    // Movimentos combinados (WASD e setas)
    if (movement.w || movement.ArrowUp) newY -= speed;
    if (movement.s || movement.ArrowDown) newY += speed;
    if (movement.a || movement.ArrowLeft) newX -= speed;
    if (movement.d || movement.ArrowRight) newX += speed;

    const ballDiameter = 20;
    newX = Math.max(0, Math.min(newX, window.innerWidth - ballDiameter));
    newY = Math.max(0, Math.min(newY, window.innerHeight - ballDiameter));

    ballPosition.x = newX;
    ballPosition.y = newY;
    ball.style.left = `${newX}px`;
    ball.style.top = `${newY}px`;
}

// Função que mantém o movimento constante da bolinha
function updateMovement() {
    moveBall();
    requestAnimationFrame(updateMovement);
}

// Define eventos para pressionar e soltar teclas
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key in movement) movement[key] = true;
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key in movement) movement[key] = false;
});

// Inicia o movimento constante
updateMovement();

// Função para exibir o modal de derrota
function showGameOverModal() {
    gameOverModal.style.display = 'flex';
    document.getElementById('final-score').textContent = `Pontuação Final: ${score}`;
}

function activatePanicMode() {
    const container = document.querySelector('.game-container');
    panicMode = true;
    container.classList.add('panic-mode');
    speed = 8; // Aumenta a velocidade da bolinha
    ball.classList.add('pulse-effect');
    shrinkSafeZone();
    moveBallMultipleTimes(5); // Move a bolinha 5 vezes no modo pânico
}

let moveCooldown = false; // Controla o tempo de espera para mover novamente

// Função para mover a bolinha para posições aleatórias repetidamente no modo pânico
function moveBallMultipleTimes(times) {
    if (moveCooldown) return; // Se já está no cooldown, não faz nada

    moveCooldown = true; // Inicia o cooldown

    let moves = 0;

    const interval = setInterval(() => {
        if (moves >= times) {
            clearInterval(interval); // Para o intervalo após 5 movimentos
            setTimeout(() => {
                moveCooldown = false; // Libera para o próximo ciclo de movimentação após 3 segundos
            }, 3000); // Espera 3 segundos antes de permitir o próximo ciclo
            return;
        }
        moveBallToRandomPosition(); // Move para uma posição aleatória
        moves++;
    }, 1000); // Intervalo entre movimentos
}

// Função para desativar o modo pânico
function deactivatePanicMode() {
    panicMode = false;
    const container = document.querySelector('.game-container');
    container.classList.remove('panic-mode');
    speed = 5; // Volta à velocidade normal
    ball.classList.remove('pulse-effect');
    restoreSafeZone();
}

// Reduz o tamanho da zona segura em modo pânico
function shrinkSafeZone() {
    safeZone.style.width = `${originalSafeZoneSize / 2}px`;
    safeZone.style.height = `${originalSafeZoneSize / 2}px`;
}

// Restaura o tamanho original da zona segura
function restoreSafeZone() {
    safeZone.style.width = `${originalSafeZoneSize}px`;
    safeZone.style.height = `${originalSafeZoneSize}px`;
}

// Função para mover a bolinha para uma posição aleatória
function moveBallToRandomPosition() {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const randomX = Math.random() * (containerWidth - 20);
    const randomY = Math.random() * (containerHeight - 20);

    ballPosition.x = randomX;
    ballPosition.y = randomY;
    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
}

// Intervalo para mover a bolinha a cada 5 segundos
function startMoveInterval() {
    moveInterval = setInterval(() => {
        moveBallToRandomPosition();
    }, 4500); // 4,5 segundos
}

// Função para parar o intervalo de movimentação aleatória
function stopMoveInterval() {
    clearInterval(moveInterval);
}

// Função para atualizar o tempo e a barra de temporizador
function updateTimer() {
    if (!insideSafeZone) {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            stopMoveInterval();
            showGameOverModal();
        }
    }

    const width = (timeLeft / initialTime) * 100;
    timerBar.style.width = `${width}%`;

    if (width < 50) {
        timerBar.classList.add("warning");
    }
    if (width < 20) {
        timerBar.classList.remove("warning");
        timerBar.classList.add("danger");
    }
}

// Checagem se a bolinha está na zona segura e atualização de pontuação
function updateTimerAndScore() {
    if (isBallInSafeZone()) {
        if (!insideSafeZone) {
            insideSafeZone = true;
            timeLeft = initialTime;
        }
        score += 1;
        document.getElementById('score').innerText = `Pontuação: ${score}`;
    } else {
        insideSafeZone = false;
    }

    if (score >= 2000 && !panicMode) {
        activatePanicMode(); // Ativa o modo pânico ao atingir 1000 pontos
    }
}

// Verifica se a bolinha está na zona segura
function isBallInSafeZone() {
    const safeZoneRect = safeZone.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const dx = (safeZoneRect.left + safeZoneRect.width / 2) - (ballRect.left + ballRect.width / 2);
    const dy = (safeZoneRect.top + safeZoneRect.height / 2) - (ballRect.top + ballRect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= safeZoneRect.width / 2;
}

// Atualiza o timer e a pontuação a cada 100ms
gameInterval = setInterval(() => {
    updateTimerAndScore();
    updateTimer();
}, 100);

// Inicia o intervalo de movimentação aleatória ao iniciar o jogo
startMoveInterval();

// Função para reiniciar o jogo
function restartGame() {
    location.reload();
}
