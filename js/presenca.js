// ======================================================
// MÓDULO DE PRESENÇA - SISTEMA PROFISSIONAL
// ======================================================

// =============================
// ELEMENTOS
// =============================

const contador = document.getElementById("contador");
const percentual = document.getElementById("percentual");
const btnLimpar = document.getElementById("btnLimpar");
const dataInput = document.getElementById("data");
const turmaSelect = document.getElementById("turma");

// ======================================================
// ATUALIZAR CONTADOR + PERCENTUAL
// ======================================================

function atualizarContador() {

    const carteiras = document.querySelectorAll(".carteira");

    let presentes = 0;
    let total = 0;

    carteiras.forEach(carteira => {

        total++;

        if (carteira.classList.contains("presente")) {
            presentes++;
        }

    });

    contador.textContent = `Presentes: ${presentes}`;

    if (total > 0) {
        const perc = ((presentes / total) * 100).toFixed(1);
        percentual.textContent = `Presença: ${perc}%`;
    } else {
        percentual.textContent = "";
    }
}

// ======================================================
// CARREGAR PRESENÇAS SALVAS
// ======================================================

function carregarPresencas() {

    const carteiras = document.querySelectorAll(".carteira");

    carteiras.forEach(carteira => {

        carteira.classList.remove("presente", "ausente");

        if (!dataInput.value) return;

        const nome = carteira.dataset.nome;
        const turma = turmaSelect.value;
        const data = dataInput.value;

        const chave = `${nome}_${turma}_${data}`;
        const status = localStorage.getItem(chave);

        if (status === "presente") {
            carteira.classList.add("presente");
        }

        if (status === "ausente") {
            carteira.classList.add("ausente");
        }

    });

    atualizarContador();

    if (typeof atualizarBadges === "function") {
        atualizarBadges();
    }
}

// ======================================================
// LIMPAR PRESENÇA DA DATA ATUAL
// ======================================================

btnLimpar.addEventListener("click", () => {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const carteiras = document.querySelectorAll(".carteira");

    carteiras.forEach(carteira => {

        const nome = carteira.dataset.nome;
        const turma = turmaSelect.value;
        const data = dataInput.value;

        const chave = `${nome}_${turma}_${data}`;

        localStorage.removeItem(chave);

        carteira.classList.remove("presente");
        carteira.classList.remove("ausente");

    });

    atualizarContador();

    if (typeof atualizarBadges === "function") {
        atualizarBadges();
    }

});

// ======================================================
// EVENTOS DE DATA E TURMA
// ======================================================

dataInput.addEventListener("change", carregarPresencas);
turmaSelect.addEventListener("change", () => {

    // Aguarda carteiras serem recriadas
    setTimeout(() => {
        carregarPresencas();
    }, 50);

});

// ======================================================
// BADGES (FALTAS ACUMULADAS)
// ======================================================

function atualizarBadges() {

    const carteiras = document.querySelectorAll(".carteira");
    const turma = turmaSelect.value;

    carteiras.forEach(carteira => {

        const nome = carteira.dataset.nome;
        let faltas = 0;

        for (let i = 0; i < localStorage.length; i++) {

            const chave = localStorage.key(i);
            const partes = chave.split("_");

            if (partes.length === 3) {

                const nomeSalvo = partes[0];
                const turmaSalva = partes[1];

                if (nomeSalvo === nome && turmaSalva === turma) {

                    const status = localStorage.getItem(chave);

                    if (status === "ausente") {
                        faltas++;
                    }
                }
            }
        }

        const badge = carteira.querySelector(".badge");

        if (faltas > 0) {
            badge.classList.remove("hidden");
            badge.textContent = faltas;
        } else {
            badge.classList.add("hidden");
        }

    });
}