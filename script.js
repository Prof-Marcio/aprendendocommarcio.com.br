// ==========================================================
// SISTEMA PROFISSIONAL DE VISUALIZAÇÃO TIPO PDF REAL
// VERSÃO PREMIUM DEFINITIVA
// RESPONSIVO + MOBILE + PERFORMANCE + ESTABILIDADE
// ==========================================================

let paginasAtuais = [];
let paginaAtual = 0;
let pastaAtual = "";
let chaveProgressoAtual = "";

let escalaAtual = 1;
let overlayAtivo = false;
let distanciaInicialPinch = null;

let touchStartX = 0;
let touchEndX = 0;

// ==========================================================
// ABRIR DOCUMENTO
// ==========================================================

function abrirDocumento(pasta, listaPaginas, chaveProgresso){

    pastaAtual = pasta;
    paginasAtuais = listaPaginas;
    paginaAtual = 0;
    chaveProgressoAtual = chaveProgresso || "";
    escalaAtual = 1;

    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    overlayAtivo = true;

    document.body.style.overflow = "hidden";

    preloadPaginas();
    renderizarPagina();
    atualizarProgresso(chaveProgressoAtual);
}

// ==========================================================
// PRELOAD OTIMIZADO
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

            <button onclick="paginaAnterior()" ${paginaAtual === 0 ? "disabled" : ""}>
                ⬅
            </button>

            <span>
                📖 Página ${paginaAtual + 1} de ${paginasAtuais.length}
            </span>

            <button onclick="proximaPagina()" ${paginaAtual === paginasAtuais.length - 1 ? "disabled" : ""}>
                ➡
            </button>

        </div>
    `;

    aplicarEventosZoom();
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
// ANIMAÇÃO DE TRANSIÇÃO
// ==========================================================

function animarTrocaPagina(direcao){

    const img = document.getElementById("pdfPage");
    if(!img) return;

    img.style.transition = "all 0.2s ease";
    img.style.opacity = "0";
    img.style.transform = direcao === "next"
        ? "translateX(-15px)"
        : "translateX(15px)";

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
    overlayAtivo = false;

    document.body.style.overflow = "auto";

    escalaAtual = 1;
    distanciaInicialPinch = null;
}

// ==========================================================
// SWIPE MOBILE CONTROLADO
// ==========================================================

document.addEventListener("touchstart", function(e){
    if(!overlayAtivo) return;
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function(e){

    if(!overlayAtivo) return;

    touchEndX = e.changedTouches[0].screenX;
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
// ZOOM PROFISSIONAL (MOUSE + PINCH)
// ==========================================================

function aplicarEventosZoom(){

    const img = document.getElementById("pdfPage");
    if(!img) return;

    escalaAtual = 1;
    img.style.transform = "scale(1)";

    // RODA DO MOUSE
    img.addEventListener("wheel", function(e){

        e.preventDefault();

        if(e.deltaY < 0){
            escalaAtual += 0.1;
        } else {
            escalaAtual -= 0.1;
        }

        limitarEscala();
        aplicarEscala(img);

    }, { passive:false });

    // PINCH TOUCH
    img.addEventListener("touchmove", function(e){

        if(e.touches.length === 2){

            e.preventDefault();

            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;

            const distanciaAtual = Math.sqrt(dx * dx + dy * dy);

            if(!distanciaInicialPinch){
                distanciaInicialPinch = distanciaAtual;
            }

            const diferenca = distanciaAtual - distanciaInicialPinch;

            escalaAtual += diferenca * 0.005;
            distanciaInicialPinch = distanciaAtual;

            limitarEscala();
            aplicarEscala(img);
        }

    }, { passive:false });

    img.addEventListener("touchend", function(){
        distanciaInicialPinch = null;
    });
}

// ==========================================================
// ESCALA
// ==========================================================

function aplicarEscala(img){
    img.style.transform = `scale(${escalaAtual})`;
}

function limitarEscala(){
    if(escalaAtual < 1) escalaAtual = 1;
    if(escalaAtual > 3) escalaAtual = 3;
}

// ==========================================================
// TECLADO DESKTOP
// ==========================================================

document.addEventListener("keydown", function(e){

    if(!overlayAtivo) return;

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

    const barra = document.querySelector(".progresso-barra");

    if(barra){
        barra.style.width = "100%";
    }
}

// ==========================================================
// NOTIFICAÇÃO PREMIUM PROFISSIONAL
// ==========================================================

function criarNotificacao(texto){

    const aviso = document.createElement("div");

    aviso.innerText = texto;

    aviso.style.position = "fixed";
    aviso.style.bottom = "110px";
    aviso.style.left = "50%";
    aviso.style.transform = "translateX(-50%)";
    aviso.style.background = "#2563eb";
    aviso.style.color = "white";
    aviso.style.padding = "14px 22px";
    aviso.style.borderRadius = "14px";
    aviso.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    aviso.style.zIndex = "6000";
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