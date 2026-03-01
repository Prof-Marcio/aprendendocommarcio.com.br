/* ==========================================================
   SISTEMA COMPLETO — APRENDENDO COM MÁRCIO
   Estrutura Profissional Escalável
========================================================== */

/* ==========================================================
   CONTROLE GLOBAL
========================================================== */

const SistemaVisualizador = {

    overlay: null,
    container: null,
    carregando: null,
    imagensAtuais: [],
    bloqueado: false,

    iniciar: function(){

        this.overlay = document.getElementById("overlay");
        this.container = document.getElementById("documentoContainer");

        if(!this.overlay || !this.container){
            console.warn("Overlay ou container não encontrado.");
            return;
        }

        this.criarLoader();
        this.registrarEventosGlobais();
    },

    /* ======================================================
       CRIAR LOADER VISUAL
    ====================================================== */

    criarLoader: function(){

        const loader = document.createElement("div");
        loader.id = "loaderVisualizador";
        loader.style.display = "none";
        loader.style.textAlign = "center";
        loader.style.padding = "20px";
        loader.innerHTML = "📖 Carregando páginas...";

        this.container.parentNode.insertBefore(loader, this.container);
        this.carregando = loader;
    },

    mostrarLoader: function(){
        if(this.carregando){
            this.carregando.style.display = "block";
        }
    },

    esconderLoader: function(){
        if(this.carregando){
            this.carregando.style.display = "none";
        }
    },

    /* ======================================================
       ABRIR DOCUMENTO
    ====================================================== */

    abrir: function(pasta, arquivos){

        if(this.bloqueado) return;

        this.bloqueado = true;
        this.mostrarLoader();

        this.container.innerHTML = "";
        this.imagensAtuais = [];

        let imagensCarregadas = 0;
        const total = arquivos.length;

        arquivos.forEach((nome) => {

            const img = document.createElement("img");

            img.src = `${pasta}/${nome}`;
            img.alt = nome;
            img.loading = "lazy";
            img.style.opacity = "0";
            img.style.transition = "opacity 0.3s ease";

            img.onload = () => {
                img.style.opacity = "1";
                imagensCarregadas++;

                if(imagensCarregadas === total){
                    this.esconderLoader();
                    this.bloqueado = false;
                }
            };

            img.onerror = () => {
                console.error("Erro ao carregar:", nome);
            };

            this.container.appendChild(img);
            this.imagensAtuais.push(img);

        });

        this.overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    },

    /* ======================================================
       FECHAR DOCUMENTO
    ====================================================== */

    fechar: function(){

        this.overlay.style.display = "none";
        document.body.style.overflow = "auto";
        this.container.innerHTML = "";
        this.imagensAtuais = [];
    },

    /* ======================================================
       EVENTOS GLOBAIS
    ====================================================== */

    registrarEventosGlobais: function(){

        // Fechar clicando fora
        document.addEventListener("click", (e) => {
            if(e.target === this.overlay){
                this.fechar();
            }
        });

        // Fechar com ESC
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape"){
                this.fechar();
            }
        });

    }

};


/* ==========================================================
   FUNÇÕES GLOBAIS PARA HTML
========================================================== */

function abrirDocumento(pasta, arquivos){
    SistemaVisualizador.abrir(pasta, arquivos);
}

function fecharDocumento(){
    SistemaVisualizador.fechar();
}

function emConstrucao(){
    alert("🚧 Este bimestre ainda está em construção 🚧");
}


/* ==========================================================
   INICIALIZAÇÃO AUTOMÁTICA
========================================================== */

document.addEventListener("DOMContentLoaded", function(){
    SistemaVisualizador.iniciar();
});