// Mostrar/ocultar el enlace de scroll to top basado en la posición del scroll
window.addEventListener('scroll', function() {
    const scrollToTopLink = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        scrollToTopLink.style.display = 'flex';
    } else {
        scrollToTopLink.style.display = 'none';
    }
});

// Inicializar el estado del enlace al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopLink = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        scrollToTopLink.style.display = 'flex';
    } else {
        scrollToTopLink.style.display = 'none';
    }
}); 