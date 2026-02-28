// ======================================================
// MÓDULO DE ALUNOS - SISTEMA PROFISSIONAL
// ======================================================

// =============================
// BANCO DE DADOS BASE
// =============================

const bancoAlunos = {
    "6º A": [
        "Ana", "Bruno", "Camila", "Diego",
        "João", "Júlia", "Leonardo", "Luana",
        "Marcos", "Matheus"
    ],
    "6º B": [
        "Carlos", "Marina", "Rafael",
        "Beatriz", "Thiago", "Sofia",
        "Daniel", "Fernanda"
    ],
    "7º B": [
        "Gabriel", "Isabela", "Pedro",
        "Larissa", "Gustavo", "Amanda",
        "Lucas", "Helena"
    ]
};

// =============================
// ELEMENTOS
// =============================

const areaCarteiras = document.getElementById("areaCarteiras");
const turmaSelect = document.getElementById("turma");

// =============================
// GERAR CARTEIRAS
// =============================

function gerarCarteiras() {

    areaCarteiras.innerHTML = "";

    const turmaAtual = turmaSelect.value;
    const lista = bancoAlunos[turmaAtual] || [];

    lista.forEach(nome => {

        const carteira = document.createElement("div");
        carteira.classList.add("carteira");
        carteira.dataset.nome = nome;
        carteira.dataset.turma = turmaAtual;

        carteira.innerHTML = `
            <div class="badge hidden">0</div>
            <div class="avatar">
                <img src="https://i.pravatar.cc/100?u=${nome}" alt="${nome}">
            </div>
            <div class="nome-aluno">${nome}</div>
        `;

        areaCarteiras.appendChild(carteira);

    });

    // Ativa eventos após gerar
    ativarEventosCarteiras();

    // Carrega presença salva
    if (typeof carregarPresencas === "function") {
        carregarPresencas();
    }

    // Atualiza badges
    if (typeof atualizarBadges === "function") {
        atualizarBadges();
    }
}

// =============================
// ATIVAR EVENTOS DE CLIQUE
// =============================

function ativarEventosCarteiras() {

    const carteiras = document.querySelectorAll(".carteira");

    carteiras.forEach(carteira => {

        carteira.addEventListener("click", () => {

            if (!dataInput.value) {
                alert("Selecione uma data primeiro!");
                return;
            }

            const nome = carteira.dataset.nome;
            const turma = turmaSelect.value;
            const data = dataInput.value;

            const chave = `${nome}_${turma}_${data}`;
            const status = localStorage.getItem(chave);

            carteira.classList.remove("presente", "ausente");

            // CICLO: vazio → presente → ausente → vazio

            if (!status) {

                carteira.classList.add("presente");
                localStorage.setItem(chave, "presente");

            } else if (status === "presente") {

                carteira.classList.add("ausente");
                localStorage.setItem(chave, "ausente");

            } else {

                localStorage.removeItem(chave);

            }

            if (typeof atualizarContador === "function") {
                atualizarContador();
            }

            if (typeof atualizarBadges === "function") {
                atualizarBadges();
            }

        });

    });
}

// =============================
// EVENTO TROCA DE TURMA
// =============================

turmaSelect.addEventListener("change", gerarCarteiras);

// =============================
// INICIALIZAÇÃO
// =============================

document.addEventListener("DOMContentLoaded", () => {
    gerarCarteiras();
});