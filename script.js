const alunos = document.querySelectorAll(".aluno");
const contador = document.getElementById("contador");
const btnLimpar = document.getElementById("btnLimpar");
const dataInput = document.getElementById("data");
const turmaSelect = document.getElementById("turma");

// ==========================
// GERAR CHAVE
// ==========================

function gerarChave(nome) {
    return `${nome}_${turmaSelect.value}_${dataInput.value}`;
}

// ==========================
// ATUALIZAR CONTADOR
// ==========================

function atualizarContador() {

    let presentes = 0;

    alunos.forEach(aluno => {
        if (aluno.classList.contains("presente")) {
            presentes++;
        }
    });

    contador.textContent = "Presentes: " + presentes;
}

// ==========================
// CARREGAR PRESENÇAS
// ==========================

function carregarPresencas() {

    const data = dataInput.value;

    alunos.forEach(aluno => {

        aluno.classList.remove("presente");
        aluno.classList.remove("ausente");

        if (!data) return;

        const chave = gerarChave(aluno.textContent);
        const status = localStorage.getItem(chave);

        if (status === "presente") aluno.classList.add("presente");
        if (status === "ausente") aluno.classList.add("ausente");

    });

    atualizarContador();
}

// ==========================
// EVENTO CLIQUE (CICLO)
// ==========================

alunos.forEach(aluno => {

    aluno.addEventListener("click", () => {

        if (!dataInput.value) {
            alert("Selecione uma data primeiro!");
            return;
        }

        const chave = gerarChave(aluno.textContent);

        if (!aluno.classList.contains("presente") && !aluno.classList.contains("ausente")) {

            aluno.classList.add("presente");
            localStorage.setItem(chave, "presente");

        } else if (aluno.classList.contains("presente")) {

            aluno.classList.remove("presente");
            aluno.classList.add("ausente");
            localStorage.setItem(chave, "ausente");

        } else {

            aluno.classList.remove("ausente");
            localStorage.removeItem(chave);
        }

        atualizarContador();
    });

});

// ==========================
// LIMPAR PRESENÇA
// ==========================

btnLimpar.addEventListener("click", () => {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    alunos.forEach(aluno => {

        const chave = gerarChave(aluno.textContent);
        localStorage.removeItem(chave);

        aluno.classList.remove("presente");
        aluno.classList.remove("ausente");

    });

    atualizarContador();
});

// ==========================
// EVENTO DATA
// ==========================

dataInput.addEventListener("change", carregarPresencas);
function filtrarTurma() {

    const turmaAtual = turmaSelect.value;

    alunos.forEach(aluno => {

        if (aluno.getAttribute("data-turma") === turmaAtual) {
            aluno.style.display = "block";
        } else {
            aluno.style.display = "none";
        }

    });

    carregarPresencas();
}

turmaSelect.addEventListener("change", filtrarTurma);

// ==========================
// INICIALIZAÇÃO
// ==========================

filtrarTurma();