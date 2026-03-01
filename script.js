/* ==========================================================
   SISTEMA LIVRO REAL + ZOOM MOBILE
========================================================== */

let livro = {
    pasta: "",
    paginas: [],
    atual: 0
};

let zoom = {
    escala: 1,
    posX: 0,
    posY: 0,
    ativo: false
};

function abrirDocumento(pasta, arquivos){

    livro.pasta = pasta;
    livro.paginas = arquivos;
    livro.atual = 0;

    document.getElementById("overlay").style.display = "flex";
    document.body.style.overflow = "hidden";

    renderizarPagina();
}

function renderizarPagina(){

    const container = document.getElementById("documentoContainer");

    container.innerHTML = `
        <div class="pagina-livro animar">
            <div class="zoom-wrapper">
                <img id="imagemLivro"
                     src="${livro.pasta}/${livro.paginas[livro.atual]}"
                     alt="Página ${livro.atual + 1}">
            </div>
        </div>

        <div class="controle-livro">
            <button onclick="paginaAnterior()">◀</button>
            <span>${livro.atual + 1} / ${livro.paginas.length}</span>
            <button onclick="proximaPagina()">▶</button>
        </div>
    `;

    iniciarZoom();
}

function proximaPagina(){
    if(livro.atual < livro.paginas.length - 1){
        livro.atual++;
        renderizarPagina();
    }
}

function paginaAnterior(){
    if(livro.atual > 0){
        livro.atual--;
        renderizarPagina();
    }
}

function fecharDocumento(){
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = "auto";
}

/* ==========================================================
   SISTEMA DE ZOOM
========================================================== */

function iniciarZoom(){

    const img = document.getElementById("imagemLivro");

    let ultimoToque = 0;
    let distanciaInicial = 0;

    img.addEventListener("touchstart", function(e){

        if(e.touches.length === 2){

            zoom.ativo = true;
            distanciaInicial = calcularDistancia(e.touches[0], e.touches[1]);

        }

        // Duplo toque
        const agora = new Date().getTime();
        if(agora - ultimoToque < 300){
            alternarZoom(img);
        }
        ultimoToque = agora;

    });

    img.addEventListener("touchmove", function(e){

        if(zoom.ativo && e.touches.length === 2){

            e.preventDefault();

            const novaDistancia = calcularDistancia(e.touches[0], e.touches[1]);

            zoom.escala = novaDistancia / distanciaInicial;

            if(zoom.escala < 1) zoom.escala = 1;
            if(zoom.escala > 4) zoom.escala = 4;

            aplicarTransform(img);

        }

    });

    img.addEventListener("touchend", function(e){
        if(e.touches.length < 2){
            zoom.ativo = false;
        }
    });

}

function calcularDistancia(t1, t2){
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function alternarZoom(img){

    if(zoom.escala === 1){
        zoom.escala = 2;
    } else {
        zoom.escala = 1;
    }

    aplicarTransform(img);
}

function aplicarTransform(img){
    img.style.transform = `scale(${zoom.escala})`;
    img.style.transition = "transform 0.2s ease";
}

function emConstrucao(){
    alert("🚧 Este bimestre ainda está em construção 🚧");
}