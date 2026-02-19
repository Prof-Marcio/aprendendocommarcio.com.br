const alunos = document.querySelectorAll(".aluno");
const contador = document.getElementById("contador");
const btnLimpar = document.getElementById("btnLimpar");
const dataInput = document.getElementById("data");
const turmaSelect = document.getElementById("turma");
const btnRelatorio = document.getElementById("btnRelatorio");
const relatorioArea = document.getElementById("relatorioArea");
const relatorioConteudo = document.getElementById("relatorioConteudo");
const btnPDF = document.getElementById("btnPDF");

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
btnRelatorio.addEventListener("click", gerarRelatorio);

function gerarRelatorio() {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const turma = turmaSelect.value;
    const data = dataInput.value;

    let presentes = [];
    let ausentes = [];

    alunos.forEach(aluno => {

        if (aluno.style.display === "none") return;

        const nome = aluno.textContent;
        const chave = gerarChave(nome);
        const status = localStorage.getItem(chave);

        if (status === "presente") {
            presentes.push(nome);
        } else {
            ausentes.push(nome);
        }

    });

    relatorioConteudo.innerHTML = `
        <p><strong>Turma:</strong> ${turma}</p>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Total:</strong> ${presentes.length + ausentes.length}</p>
        <p><strong>Presentes:</strong> ${presentes.length}</p>
        <p><strong>Ausentes:</strong> ${ausentes.length}</p>
        <hr>
        <h3>Lista de Presentes</h3>
        <ul>${presentes.map(nome => `<li>${nome}</li>`).join("")}</ul>
        <h3>Lista de Ausentes</h3>
        <ul>${ausentes.map(nome => `<li>${nome}</li>`).join("")}</ul>
    `;

    document.getElementById("relatorioArea").style.display = "block";
}

// ================================
// EXPORTAR PDF
// ================================

btnPDF.addEventListener("click", function () {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const turma = turmaSelect.value;
    const data = dataInput.value;

    let y = 10;

    doc.text("Relatório de Presença", 10, y);
    y += 10;

    doc.text("Turma: " + turma, 10, y);
    y += 8;

    doc.text("Data: " + data, 10, y);
    y += 10;

    alunos.forEach(aluno => {

        if (aluno.style.display === "none") return;

        const nome = aluno.textContent;
        const chave = gerarChave(nome);
        const status = localStorage.getItem(chave);

        let situacao = "Ausente";

        if (status === "presente") situacao = "Presente";
        if (status === "ausente") situacao = "Ausente";

        doc.text(nome + " - " + situacao, 10, y);
        y += 8;

    });

    doc.save("relatorio_" + turma + "_" + data + ".pdf");

});