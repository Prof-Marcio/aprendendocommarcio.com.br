// ==========================================================
// SISTEMA PROFISSIONAL DE VISUALIZAÇÃO TIPO PDF REAL
// RESPONSIVO + MOBILE + ANIMAÇÕES + PERFORMANCE
// ==========================================================

let paginasAtuais = [];
let paginaAtual = 0;
let pastaAtual = "";
let chaveProgressoAtual = "";

// ==========================================================
// ABRIR DOCUMENTO
// ==========================================================

function abrirDocumento(pasta, listaPaginas, chaveProgresso){

    pastaAtual = pasta;
    paginasAtuais = listaPaginas;
    paginaAtual = 0;
    chaveProgressoAtual = chaveProgresso || "";

    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";

    document.body.style.overflow = "hidden";

    preloadPaginas();
    renderizarPagina();
    atualizarProgresso(chaveProgressoAtual);
}

// ==========================================================
// PRELOAD PARA PERFORMANCE
// ==========================================================

function preloadPaginas(){
    paginasAtuais.forEach(p => {
        const img = new Image();
        img.src = `${pastaAtual}/${p}`;
    });
}

// ==========================================================
// RENDERIZAR PÁGINA
// ==========================================================

function renderizarPagina(){

    const container = document.getElementById("documentoContainer");

    container.innerHTML = `
        <div class="pdf-wrapper">

            <img 
                src="${pastaAtual}/${paginasAtuais[paginaAtual]}" 
                class="pdf-page" 
                id="pdfPage"
                draggable="false"
            >

        </div>

        <div class="pdf-controls">

            <button onclick="paginaAnterior()" ${paginaAtual === 0 ? "disabled" : ""}>⬅</button>

            <span>
                📖 Página ${paginaAtual + 1} de ${paginasAtuais.length}
            </span>

            <button onclick="proximaPagina()" ${paginaAtual === paginasAtuais.length - 1 ? "disabled" : ""}>➡</button>

        </div>
    `;

    aplicarZoomMobile();
}

// ==========================================================
// NAVEGAÇÃO
// ==========================================================

function proximaPagina(){
    if(paginaAtual < paginasAtuais.length - 1){
        paginaAtual++;
        animarTrocaPagina("next");
    }
}

function paginaAnterior(){
    if(paginaAtual > 0){
        paginaAtual--;
        animarTrocaPagina("prev");
    }
}

// ==========================================================
// ANIMAÇÃO SUAVE
// ==========================================================

function animarTrocaPagina(direcao){

    const img = document.getElementById("pdfPage");

    img.style.transition = "all 0.2s ease";
    img.style.opacity = "0";
    img.style.transform = direcao === "next" ? "translateX(-15px)" : "translateX(15px)";

    setTimeout(() => {
        renderizarPagina();
    },180);
}

// ==========================================================
// FECHAR DOCUMENTO
// ==========================================================

function fecharDocumento(){
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

// ==========================================================
// SWIPE MOBILE PROFISSIONAL
// ==========================================================

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(e){
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", function(e){

    touchEndX = e.changedTouches[0].screenX;

    if(document.getElementById("overlay").style.display !== "flex") return;

    detectarSwipe();
});

function detectarSwipe(){

    const distancia = touchEndX - touchStartX;

    if(distancia < -60){
        proximaPagina();
    }

    if(distancia > 60){
        paginaAnterior();
    }
}

// ==========================================================
// ZOOM PINCH PARA CELULAR
// ==========================================================

function aplicarZoomMobile(){

    const img = document.getElementById("pdfPage");

    let escala = 1;

    img.addEventListener("wheel", function(e){
        e.preventDefault();

        if(e.deltaY < 0){
            escala += 0.1;
        }else{
            escala -= 0.1;
        }

        if(escala < 1) escala = 1;
        if(escala > 3) escala = 3;

        img.style.transform = `scale(${escala})`;
    });

}

// ==========================================================
// TECLADO (DESKTOP)
// ==========================================================

document.addEventListener("keydown", function(e){

    if(document.getElementById("overlay").style.display !== "flex") return;

    if(e.key === "ArrowRight"){
        proximaPagina();
    }

    if(e.key === "ArrowLeft"){
        paginaAnterior();
    }

    if(e.key === "Escape"){
        fecharDocumento();
    }
});

// ==========================================================
// PROGRESSO AUTOMÁTICO
// ==========================================================

function atualizarProgresso(chave){

    if(!chave) return;

    localStorage.setItem(chave, "concluido");

    // Atualiza barra visual se existir
    const barra = document.querySelector(".progresso-barra");

    if(barra){
        barra.style.width = "100%";
    }
}

// ==========================================================
// NOTIFICAÇÃO PREMIUM
// ==========================================================

function criarNotificacao(texto){

    const aviso = document.createElement("div");

    aviso.innerText = texto;

    aviso.style.position = "fixed";
    aviso.style.bottom = "100px";
    aviso.style.left = "50%";
    aviso.style.transform = "translateX(-50%)";
    aviso.style.background = "#2563eb";
    aviso.style.color = "white";
    aviso.style.padding = "14px 22px";
    aviso.style.borderRadius = "14px";
    aviso.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    aviso.style.zIndex = "3000";
    aviso.style.opacity = "0";
    aviso.style.transition = "0.3s";

    document.body.appendChild(aviso);

    setTimeout(()=> aviso.style.opacity = "1",50);

    setTimeout(()=>{
        aviso.style.opacity = "0";
        setTimeout(()=> aviso.remove(),300);
    },2500);
}

// ==========================================================
// EM CONSTRUÇÃO
// ==========================================================

function emConstrucao(){
    criarNotificacao("🚧 Página em construção 🚧");
}