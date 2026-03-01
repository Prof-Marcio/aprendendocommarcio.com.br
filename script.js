/* ==========================================================
   SISTEMA LIVRO REAL + ZOOM + PROGRESSO
========================================================== */

let livro = {
    pasta: "",
    paginas: [],
    atual: 0,
    unidade: ""
};

let zoom = {
    escala: 1,
    ativo: false
};

/* ==========================================================
   ABRIR DOCUMENTO
========================================================== */

function abrirDocumento(pasta, arquivos, unidade){

    livro.pasta = pasta;
    livro.paginas = arquivos;
    livro.atual = 0;
    livro.unidade = unidade;

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

    atualizarProgresso();
    iniciarZoom();
}

/* ==========================================================
   PAGINAÇÃO
========================================================== */

function proximaPagina(){
    if(livro.atual < livro.paginas.length - 1){
        livro.atual++;
        salvarProgresso();
        renderizarPagina();
    }
}

function paginaAnterior(){
    if(livro.atual > 0){
        livro.atual--;
        salvarProgresso();
        renderizarPagina();
    }
}

function fecharDocumento(){
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = "auto";
}

/* ==========================================================
   PROGRESSO POR UNIDADE
========================================================== */

function salvarProgresso(){

    let progresso = JSON.parse(localStorage.getItem("progressoLivro")) || {};

    progresso[livro.unidade] = livro.atual;

    localStorage.setItem("progressoLivro", JSON.stringify(progresso));
}

function atualizarProgresso(){

    let progresso = JSON.parse(localStorage.getItem("progressoLivro")) || {};
    let indice = progresso[livro.unidade] || 0;

    let porcentagem = ((indice + 1) / livro.paginas.length) * 100;

    const barra = document.getElementById("barraProgresso");

    if(barra){
        barra.style.width = porcentagem + "%";
    }
}

/* ==========================================================
   ZOOM MOBILE
========================================================== */

function iniciarZoom(){

    const img = document.getElementById("imagemLivro");
    let ultimoToque = 0;

    img.addEventListener("touchstart", function(e){

        const agora = new Date().getTime();

        if(agora - ultimoToque < 300){
            alternarZoom(img);
        }

        ultimoToque = agora;
    });
}

function alternarZoom(img){

    zoom.escala = zoom.escala === 1 ? 2 : 1;
    img.style.transform = `scale(${zoom.escala})`;
    img.style.transition = "transform 0.3s ease";
}

/* ==========================================================
   EM CONSTRUÇÃO
========================================================== */

function emConstrucao(){
    alert("🚧 Este bimestre ainda está em construção 🚧");
}