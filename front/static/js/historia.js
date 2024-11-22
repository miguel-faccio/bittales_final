let currentIndex = 0;

function showSlides(index) {
    const slides = document.querySelector('.slides'); // Altera para selecionar o contêiner de slides
    const totalSlides = slides.children.length;
    const cardsToShow = 1; // Um slide por vez com 3 cards
    const maxIndex = Math.ceil(totalSlides / cardsToShow) - 1;

    // Controla o índice, respeitando o número de cards visíveis por vez
    currentIndex = (index + maxIndex + 1) % (maxIndex + 1);
    
    const offset = currentIndex * (100 / (totalSlides)); // Calcula o deslocamento em porcentagem
    slides.style.transform = `translateX(-${offset}%)`; // Aplica a transformação
}

function nextSlide() {
    showSlides(currentIndex + 1);
}

function prevSlide() {
    showSlides(currentIndex - 1);
}


