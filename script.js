// ==========================================================
// SISTEMA DE VISUALIZAÇÃO TIPO PDF REAL
// ==========================================================

let paginasAtuais = [];
let paginaAtual = 0;
let pastaAtual = "";

// ==========================================================
// ABRIR DOCUMENTO
// ==========================================================

function abrirDocumento(pasta, listaPaginas, chaveProgresso){

    pastaAtual = pasta;
    paginasAtuais = listaPaginas;
    paginaAtual = 0;

    document.getElementById("overlay").style.display = "flex";

    renderizarPagina();

    atualizarProgresso(chaveProgresso);
}

// ==========================================================
// RENDERIZAR PÁGINA
// ==========================================================

function renderizarPagina(){

    const container = document.getElementById("documentoContainer");

    container.innerHTML = `
        <div class="pdf-wrapper">
            <img src="${pastaAtual}/${paginasAtuais[paginaAtual]}" class="pdf-page">
        </div>

        <div class="pdf-controls">
            <button onclick="paginaAnterior()">⬅</button>
            <span>Página ${paginaAtual + 1} de ${paginasAtuais.length}</span>
            <button onclick="proximaPagina()">➡</button>
        </div>
    `;
}

// ==========================================================
// NAVEGAÇÃO
// ==========================================================

function proximaPagina(){
    if(paginaAtual < paginasAtuais.length - 1){
        paginaAtual++;
        animarTrocaPagina();
    }
}

function paginaAnterior(){
    if(paginaAtual > 0){
        paginaAtual--;
        animarTrocaPagina();
    }
}

function animarTrocaPagina(){

    const img = document.querySelector(".pdf-page");
    img.style.opacity = 0;

    setTimeout(() => {
        renderizarPagina();
    },150);
}

// ==========================================================
// FECHAR
// ==========================================================

function fecharDocumento(){
    document.getElementById("overlay").style.display = "none";
}

// ==========================================================
// SWIPE PARA CELULAR
// ==========================================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(e){
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function(e){
    touchEndX = e.changedTouches[0].screenX;
    detectarSwipe();
});

function detectarSwipe(){

    if(document.getElementById("overlay").style.display !== "flex") return;

    if(touchEndX < touchStartX - 50){
        proximaPagina();
    }

    if(touchEndX > touchStartX + 50){
        paginaAnterior();
    }
}

// ==========================================================
// PROGRESSO AUTOMÁTICO
// ==========================================================

function atualizarProgresso(chave){

    if(!chave) return;

    localStorage.setItem(chave, "concluido");
}

// ==========================================================
// EM CONSTRUÇÃO
// ==========================================================

function emConstrucao(){
    alert("🚧 Página em construção 🚧");
}