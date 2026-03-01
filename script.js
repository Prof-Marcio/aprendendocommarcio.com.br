/* ==========================================================
   VARIÁVEIS GLOBAIS
========================================================== */

const conteudosBimestre1 = [
    "u1-naturais",
    "u1-operacoes",
    "u1-divisores",
    "u2-ideia",
    "u2-operacoes",
    "u2-potencia",
    "avaliacao-diagnostica",
    "avaliacao-formativa",
    "avaliacao-bimestral"
];


/* ==========================================================
   ABRIR DOCUMENTO (SISTEMA LIVRO)
========================================================== */

function abrirDocumento(pasta, arquivos, idConteudo){

    const container = document.getElementById("documentoContainer");
    container.innerHTML = "";

    arquivos.forEach(arquivo => {
        container.innerHTML += `
            <img src="${pasta}/${arquivo}" alt="Página">
        `;
    });

    document.getElementById("overlay").style.display = "flex";

    marcarConcluido(idConteudo);
}


/* ==========================================================
   FECHAR DOCUMENTO
========================================================== */

function fecharDocumento(){
    document.getElementById("overlay").style.display = "none";
}


/* ==========================================================
   SISTEMA DE PROGRESSO AUTOMÁTICO
========================================================== */

function carregarProgresso(){

    let dados = JSON.parse(localStorage.getItem("progressoB1")) || [];
    atualizarBarra(dados.length);

}

function marcarConcluido(idConteudo){

    let dados = JSON.parse(localStorage.getItem("progressoB1")) || [];

    if(!dados.includes(idConteudo)){
        dados.push(idConteudo);
        localStorage.setItem("progressoB1", JSON.stringify(dados));
    }

    atualizarBarra(dados.length);
}

function atualizarBarra(qtdConcluidos){

    const total = conteudosBimestre1.length;
    const porcentagem = Math.round((qtdConcluidos / total) * 100);

    const barra = document.getElementById("barraProgressoVisual");
    const texto = document.getElementById("progressoTexto");

    if(barra){
        barra.style.width = porcentagem + "%";
    }

    if(texto){
        texto.innerText = porcentagem + "% concluído";
    }
}

function resetarProgresso(){

    localStorage.removeItem("progressoB1");
    atualizarBarra(0);

}


/* ==========================================================
   NAVEGAÇÃO INFERIOR (Ripple + Elástico)
========================================================== */

document.addEventListener("DOMContentLoaded", function(){

    carregarProgresso();

    document.querySelectorAll(".nav-item").forEach(item => {

        item.addEventListener("click", function(){

            document.querySelectorAll(".nav-item").forEach(el=>{
                el.classList.remove("active-nav");
            });

            this.classList.add("active-nav");

            // Ripple
            this.classList.remove("ripple");
            void this.offsetWidth;
            this.classList.add("ripple");

            // Elástico no ícone
            const icon = this.querySelector(".icon");

            if(icon){
                icon.classList.remove("elastic");
                void icon.offsetWidth;
                icon.classList.add("elastic");
            }

        });

    });

});


/* ==========================================================
   SCROLL SUAVE ENTRE SEÇÕES
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const target = document.querySelector(this.getAttribute('href'));

        if(target){
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }

    });

});


/* ==========================================================
   EM CONSTRUÇÃO
========================================================== */

function emConstrucao(){

    const aviso = document.createElement("div");

    aviso.innerText = "🚧 Página em construção 🚧";
    aviso.style.position = "fixed";
    aviso.style.bottom = "30px";
    aviso.style.right = "30px";
    aviso.style.background = "#2563eb";
    aviso.style.color = "white";
    aviso.style.padding = "15px 25px";
    aviso.style.borderRadius = "12px";
    aviso.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    aviso.style.zIndex = "5000";
    aviso.style.opacity = "0";
    aviso.style.transition = "0.3s";

    document.body.appendChild(aviso);

    setTimeout(()=>{ aviso.style.opacity = "1"; },50);

    setTimeout(()=>{
        aviso.style.opacity = "0";
        setTimeout(()=>{ aviso.remove(); },300);
    },3000);

}


/* ==========================================================
   FECHAR OVERLAY COM ESC (DESKTOP)
========================================================== */

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){
        fecharDocumento();
    }

});