document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const playButton = document.getElementById("playButton");
  const audio = document.getElementById("background-audio");
  const turnIndicator = document.getElementById("turn"); // Indicador de turno

  // Exibir o modal
  modal.style.display = "flex";

  // Iniciar jogo após fechar o modal
  playButton.addEventListener("click", function () {
    modal.style.display = "none";
    audio.play();  // Iniciar áudio em loop
    iniciarTabuleiro(); // Inicializar o tabuleiro de damas
    turnIndicator.textContent = "Turno: Jogador Dourado"; // Inicializar o turno
  });

  let turnoDourado = true; // Variável para alternar o turno entre jogadores
  let selecionada = null;

  function iniciarTabuleiro() {
    console.log("Iniciando tabuleiro...");
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = ""; // Limpa o tabuleiro

    const totalRows = 8;
    const totalCols = 8;

    // Configura o tabuleiro e coloca as peças
    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalCols; col++) {
        const cell = document.createElement("div");
        cell.classList.add((row + col) % 2 === 0 ? "white-cell" : "black-cell");
        cell.dataset.row = row;
        cell.dataset.col = col;

        // Adicionar peças
        if (row < 3 && (row + col) % 2 !== 0) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "gold-piece"); // Classe para peças douradas
          cell.appendChild(piece);
        } else if (row > 4 && (row + col) % 2 !== 0) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "silver-piece"); // Classe para peças prateadas
          cell.appendChild(piece);
        }

        cell.addEventListener("click", selecionarCasa); // Adicionar evento de seleção de casa
        tabuleiro.appendChild(cell);
      }
    }
  }

  function selecionarCasa(event) {
    const cell = event.currentTarget;
    console.log("Casa selecionada:", cell.dataset.row, cell.dataset.col); // Verificar se a casa foi selecionada
    const peca = cell.querySelector(".piece");

    // Verificar se é o turno correto da peça
    if (peca && !((turnoDourado && peca.classList.contains("gold-piece")) || (!turnoDourado && peca.classList.contains("silver-piece")))) {
      console.log("Não é o turno desta peça.");
      return; // Ignora o clique se não for o turno do jogador
    }

    // Se já há uma peça selecionada e clica em uma casa vazia para mover
    if (selecionada && cell !== selecionada && !cell.querySelector(".piece")) {
      moverPeca(cell);
      return;
    }

    // Seleciona ou desseleciona uma peça
    if (peca) {
      if (selecionada) {
        limparMovimentosPossiveis(); // Limpa os destaques azuis de movimentos anteriores
      }
      selecionada = cell;
      mostrarMovimentosPossiveis(cell);
    }
  }

  function moverPeca(destino) {
    if (!selecionada) return;

    const peca = selecionada.querySelector(".piece");
    destino.appendChild(peca); // Move a peça para a nova casa
    limparMovimentosPossiveis();

    // Alterna o turno
    turnoDourado = !turnoDourado;
    turnIndicator.textContent = turnoDourado ? "Turno: Jogador Dourado" : "Turno: Jogador Prata";
    console.log("Turno atual:", turnoDourado ? "Jogador Dourado" : "Jogador Prata"); // Verificar qual jogador tem o turno
    selecionada = null; // Desseleciona a peça após mover
  }

  function mostrarMovimentosPossiveis(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const movimentos = turnoDourado
      ? [[row + 1, col - 1], [row + 1, col + 1]] // Movimentos para peças douradas
      : [[row - 1, col - 1], [row - 1, col + 1]]; // Movimentos para peças prateadas

    movimentos.forEach(([r, c]) => {
      const destino = document.querySelector(`div[data-row='${r}'][data-col='${c}']`);
      if (destino && !destino.querySelector(".piece") && destino.classList.contains("black-cell")) {
        destino.classList.add("highlight"); // Adiciona a classe de destaque em azul
      }
    });
  }

  function limparMovimentosPossiveis() {
    const highlightedCells = document.querySelectorAll(".highlight");
    highlightedCells.forEach(cell => cell.classList.remove("highlight"));
  }
});
