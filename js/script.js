/* ===================================================== */
/* CENTRO DE FORMAÇÃO EDUCACIONAL E TECNOLÓGICA */
/* SCRIPT PROFISSIONAL DEFINITIVO */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuLateral = document.querySelector(".menu-lateral");
    const header = document.querySelector("header");

    /* ===================================================== */
    /* 1️⃣ SCROLL SUAVE INTELIGENTE (CORRIGIDO) */
    /* ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const destino = this.getAttribute("href");

            if (!destino || destino === "#") return;

            const target = document.querySelector(destino);

            if (target) {

                e.preventDefault();

                const offset = menuLateral && window.innerWidth > 900 ? 60 : 100;
                const offsetTop = target.offsetTop - offset;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                if (window.innerWidth <= 900 && menuLateral) {
                    menuLateral.classList.remove("ativo");
                }
            }
        });
    });


    /* ===================================================== */
    /* 2️⃣ ANIMAÇÃO DE ENTRADA DAS SEÇÕES */
    /* ===================================================== */

    const secoes = document.querySelectorAll(".secao, .capitulo");

    if (secoes.length > 0) {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.15 });

        secoes.forEach(secao => {
            secao.style.opacity = "0";
            secao.style.transform = "translateY(40px)";
            secao.style.transition = "all 0.8s ease";
            observer.observe(secao);
        });
    }


    /* ===================================================== */
    /* 3️⃣ EFEITO 3D + LUZ DINÂMICA UNIFICADO */
    /* ===================================================== */

    document.querySelectorAll(".livro-estrutura").forEach(livro => {

        livro.addEventListener("mousemove", e => {

            const rect = livro.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / 18);
            const rotateY = ((centerX - x) / 18);

            livro.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.04)
            `;

            /* Luz dinâmica */
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            livro.style.setProperty("--x", percentX + "%");
            livro.style.setProperty("--y", percentY + "%");
        });

        livro.addEventListener("mouseleave", () => {
            livro.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });

        /* Efeito abrir ao clicar */
        livro.addEventListener("click", () => {
            livro.classList.add("abrindo");

            setTimeout(() => {
                livro.classList.remove("abrindo");
            }, 600);
        });

    });


    /* ===================================================== */
    /* 4️⃣ DESTAQUE AUTOMÁTICO DO CAPÍTULO */
    /* ===================================================== */

    const capitulos = document.querySelectorAll(".capitulo");
    const linksMenu = document.querySelectorAll(".menu-lateral nav a[href^='#']");

    if (capitulos.length > 0 && linksMenu.length > 0) {

        window.addEventListener("scroll", () => {

            let scrollPos = window.scrollY + 200;
            let capituloAtual = "";

            capitulos.forEach(cap => {
                if (
                    scrollPos >= cap.offsetTop &&
                    scrollPos < cap.offsetTop + cap.offsetHeight
                ) {
                    capituloAtual = cap.getAttribute("id");
                }
            });

            linksMenu.forEach(link => {
                link.classList.remove("ativo-capitulo");

                if (link.getAttribute("href") === "#" + capituloAtual) {
                    link.classList.add("ativo-capitulo");
                }
            });

        });
    }


    /* ===================================================== */
    /* 5️⃣ BARRA DE PROGRESSO (APENAS LIVROS) */
    /* ===================================================== */

    if (document.querySelector(".capitulo")) {

        const progressBar = document.createElement("div");

        Object.assign(progressBar.style, {
            position: "fixed",
            top: "0",
            left: "0",
            height: "5px",
            width: "0%",
            background: "linear-gradient(to right, #2563eb, #16a34a)",
            zIndex: "9999",
            transition: "width 0.2s ease"
        });

        document.body.appendChild(progressBar);

        window.addEventListener("scroll", () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollAtual = window.scrollY;
            const progresso = (scrollAtual / scrollTotal) * 100;

            progressBar.style.width = progresso + "%";
        });
    }


    /* ===================================================== */
    /* 6️⃣ BOTÃO VOLTAR AO TOPO */
    /* ===================================================== */

    const btnTopo = document.createElement("button");
    btnTopo.innerHTML = "↑";

    Object.assign(btnTopo.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        padding: "14px 18px",
        border: "none",
        borderRadius: "50%",
        background: "#111827",
        color: "white",
        fontSize: "18px",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        display: "none",
        transition: "all 0.3s ease",
        zIndex: "9999"
    });

    document.body.appendChild(btnTopo);

    btnTopo.addEventListener("mouseenter", () => {
        btnTopo.style.transform = "scale(1.15)";
    });

    btnTopo.addEventListener("mouseleave", () => {
        btnTopo.style.transform = "scale(1)";
    });

    btnTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {

        const scrollAtual = window.scrollY;

        if (scrollAtual > 400) {
            btnTopo.style.display = "block";
        } else {
            btnTopo.style.display = "none";
        }

        /* Parallax suave */
        if (header) {
            header.style.backgroundPositionY = scrollAtual * 0.4 + "px";
        }
    });

});