document.addEventListener("DOMContentLoaded", function () {
    const trilhos = ["trilho1", "trilho2", "trilho3"];
    let trilhoAtual = 1; // Começa no trilho do meio (trilho2)
    const trem = document.getElementById("trem");

    function moverTrem(direcao) {
        // Atualiza o trilho atual com base na direção
        if (direcao === "cima" && trilhoAtual > 0) {
            trilhoAtual--;
        } else if (direcao === "baixo" && trilhoAtual < 2) {
            trilhoAtual++;
        }

        // Remove o trem do trilho atual e adiciona ao novo trilho
        trilhos.forEach(trilhoId => {
            const trilho = document.getElementById(trilhoId);
            if (trilho.contains(trem)) {
                trilho.removeChild(trem);
            }
        });

        // Coloca o trem no novo trilho
        document.getElementById(trilhos[trilhoAtual]).appendChild(trem);
    }

    // Eventos de teclado para mover o trem
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp") {
            moverTrem("cima");
        } else if (event.key === "ArrowDown") {
            moverTrem("baixo");
        }
    });
});
