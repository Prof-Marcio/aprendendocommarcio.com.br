/* =====================================================
   APRENDENDO COM MÁRCIO 2026
   SCRIPT MOBILE + INTERATIVO JOVEM
===================================================== */

/* ================= MENU MOBILE ================= */

function toggleMenu(){
    const nav = document.querySelector(".nav");
    nav.classList.toggle("ativo");
}

/* ================= BANCO DE DADOS ================= */

const banco = {

    conteudos: [
        {titulo:"Missão 1 🚀", texto:"Sequências numéricas e padrões."},
        {titulo:"Missão 2 🔍", texto:"Múltiplos, divisores e números primos."},
        {titulo:"Missão 3 ⚙️", texto:"MMC e MDC aplicados."},
        {titulo:"Missão 4 🔢", texto:"Números inteiros e operações."},
        {titulo:"Missão Final 🏁", texto:"Revisão geral do bimestre."}
    ],

    exercicios: [
        {titulo:"Desafio 1 🧠", texto:"Sequências e lógica."},
        {titulo:"Desafio 2 🔢", texto:"Inteiros e operações."},
        {titulo:"Desafio 3 🏆", texto:"Problemas mistos."}
    ],

    avaliacoes: [
        {titulo:"Diagnóstico 🎯", texto:"Avaliação inicial."},
        {titulo:"Progresso 📈", texto:"Acompanhamento contínuo."},
        {titulo:"Fase Final 📝", texto:"Prova bimestral."}
    ]

};

/* ================= VARIÁVEIS ================= */

let paginas = [];
let paginaAtual = 0;

const overlay = document.getElementById("overlay");
const conteudo = document.getElementById("conteudoLivro");

/* ================= SISTEMA DE LIVRO ================= */

function abrirLivro(tipo){

    paginas = banco[tipo];
    paginaAtual = 0;

    renderizar();
    overlay.classList.add("ativo");
}

function fecharLivro(){
    overlay.classList.remove("ativo");
}

function proximaPagina(){
    if(paginaAtual < paginas.length - 1){
        paginaAtual++;
        salvarProgresso();
        renderizar();
        animacaoSuave();
    }
}

function paginaAnterior(){
    if(paginaAtual > 0){
        paginaAtual--;
        renderizar();
        animacaoSuave();
    }
}

function renderizar(){

    const pagina = paginas[paginaAtual];

    conteudo.innerHTML = `
        <h2>${pagina.titulo}</h2>
        <p>${pagina.texto}</p>
        <div class="progresso-info">
            Página ${paginaAtual + 1} de ${paginas.length}
        </div>
    `;

    atualizarBarra();
}

/* ================= PROGRESSO SALVO ================= */

function salvarProgresso(){
    localStorage.setItem("progressoBimestre", paginaAtual);
}

function carregarProgresso(){
    const salvo = localStorage.getItem("progressoBimestre");
    if(salvo !== null){
        paginaAtual = parseInt(salvo);
    }
}

/* ================= BARRA DE PROGRESSO ================= */

function atualizarBarra(){

    let barra = document.querySelector(".barra-progresso");

    if(!barra){
        barra = document.createElement("div");
        barra.className = "barra-progresso";
        conteudo.appendChild(barra);
    }

    const porcentagem = ((paginaAtual + 1) / paginas.length) * 100;
    barra.style.width = porcentagem + "%";
}

/* ================= ANIMAÇÃO ================= */

function animacaoSuave(){
    conteudo.style.transform = "scale(0.98)";
    setTimeout(()=>{
        conteudo.style.transform = "scale(1)";
    },150);
}

/* ================= SWIPE MOBILE ================= */

let startX = 0;

if(overlay){

overlay.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
});

overlay.addEventListener("touchend", e=>{
    let endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){
        proximaPagina();
    }

    if(endX - startX > 50){
        paginaAnterior();
    }
});

}

/* ================= TECLADO ================= */

document.addEventListener("keydown", function(e){

    if(!overlay.classList.contains("ativo")) return;

    if(e.key === "ArrowRight") proximaPagina();
    if(e.key === "ArrowLeft") paginaAnterior();
    if(e.key === "Escape") fecharLivro();
});

/* ================= NOTIFICAÇÃO DIVERTIDA ================= */

function emConstrucao(){
    mostrarNotificacao("🚧 Ainda estamos preparando essa fase!");
}

function mostrarNotificacao(texto){

    const aviso = document.createElement("div");
    aviso.className = "notificacao-jovem";
    aviso.innerText = texto;

    document.body.appendChild(aviso);

    setTimeout(()=>{
        aviso.classList.add("mostrar");
    },50);

    setTimeout(()=>{
        aviso.classList.remove("mostrar");
        setTimeout(()=>{
            aviso.remove();
        },300);
    },3000);
}