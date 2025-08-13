/*
 * script.js
 * * Este arquivo JavaScript contém todas as funcionalidades interativas do site.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Código para o botão de 'Ver Solução' da página de exercícios
    const toggleButton = document.querySelector('.toggle-solucao');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            const solucao = document.querySelector('.solucao-texto');
            solucao.classList.toggle('hidden');
            this.textContent = solucao.classList.contains('hidden') ? 'Ver Solução' : 'Esconder Solução';
        });
    }

    // Adicione outras funcionalidades aqui no futuro.
    // Exemplo:
    // const dashboardButtons = document.querySelectorAll('.card-button');
    // dashboardButtons.forEach(button => {
    //   button.addEventListener('click', () => {
    //     alert('Funcionalidade em desenvolvimento!');
    //   });
    // });
});