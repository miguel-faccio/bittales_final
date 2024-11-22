const cells = document.querySelectorAll('.cell');
const newGameButton = document.getElementById('newGame');
const menuButton = document.getElementById('menu');
const message = document.getElementById('message');
const turnIndicator = document.getElementById('turnIndicator'); // Indicador de vez

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `Jogador ${currentPlayer} ganhou!`;
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        message.textContent = 'Empate!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnIndicator.textContent = `Vez do jogador: ${currentPlayer}`; // Atualiza o indicador de vez
    }
};

const checkWinner = () => {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    turnIndicator.textContent = `Vez do jogador: ${currentPlayer}`; // Reseta o indicador de vez
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

// Função para o botão de menu (ainda sem funcionalidade específica)
const openMenu = () => {
    alert("Menu não implementado.");
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newGameButton.addEventListener('click', resetGame);
menuButton.addEventListener('click', openMenu);
