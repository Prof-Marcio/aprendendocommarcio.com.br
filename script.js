let grafico = null;
const alunos = document.querySelectorAll(".aluno");
const contador = document.getElementById("contador");
const percentual = document.getElementById("percentual");
const btnLimpar = document.getElementById("btnLimpar");
const dataInput = document.getElementById("data");
const turmaSelect = document.getElementById("turma");
const btnRelatorio = document.getElementById("btnRelatorio");
const relatorioArea = document.getElementById("relatorioArea");
const relatorioConteudo = document.getElementById("relatorioConteudo");
const btnPDF = document.getElementById("btnPDF");
const btnExcel = document.getElementById("btnExcel");
const btnHistorico = document.getElementById("btnHistorico");
const historicoArea = document.getElementById("historicoArea");
const historicoConteudo = document.getElementById("historicoConteudo");

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
    let total = 0;

    alunos.forEach(aluno => {

        if (aluno.style.display === "none") return;

        total++;

        if (aluno.classList.contains("presente")) {
            presentes++;
        }

    });

    contador.textContent = "Presentes: " + presentes;

    if (total > 0) {
        const porcentagem = ((presentes / total) * 100).toFixed(1);
        percentual.textContent = "Presença: " + porcentagem + "%";
    } else {
        percentual.textContent = "";
    }
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
    const dataAtual = dataInput.value;

    let presentes = [];
    let ausentes = [];

    // ===== Presença da data atual =====
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

    // ===== Buscar todas as datas da turma =====
    let datasDaTurma = new Set();

    for (let i = 0; i < localStorage.length; i++) {

        const chave = localStorage.key(i);
        const partes = chave.split("_");

        if (partes.length === 3) {

            const turmaSalva = partes[1];
            const dataSalva = partes[2];

            if (turmaSalva === turma) {
                datasDaTurma.add(dataSalva);
            }
        }
    }

    const totalAulas = datasDaTurma.size;

    // ===== Calcular faltas acumuladas =====
    let estatisticas = [];

    alunos.forEach(aluno => {

        if (aluno.style.display === "none") return;

        const nome = aluno.textContent;
        let faltas = 0;

        datasDaTurma.forEach(data => {

            const chave = `${nome}_${turma}_${data}`;
            const status = localStorage.getItem(chave);

            if (status !== "presente") {
                faltas++;
            }

        });

        const frequencia = totalAulas > 0
            ? (((totalAulas - faltas) / totalAulas) * 100).toFixed(1)
            : 0;

        estatisticas.push({
            nome,
            faltas,
            frequencia
        });

    });

    // ===== Montar HTML =====
    relatorioConteudo.innerHTML = `
        <p><strong>Turma:</strong> ${turma}</p>
        <p><strong>Data:</strong> ${dataAtual}</p>
        <p><strong>Total de Aulas Registradas:</strong> ${totalAulas}</p>
        <p><strong>Presentes Hoje:</strong> ${presentes.length}</p>
        <p><strong>Ausentes Hoje:</strong> ${ausentes.length}</p>
        <hr>
        <h3>Frequência Acumulada</h3>
        <ul>
            ${estatisticas.map(aluno => `
                <li>
                    ${aluno.nome} - 
                    Faltas: ${aluno.faltas} | 
                    Frequência: ${aluno.frequencia}%
                </li>
            `).join("")}
        </ul>
    `;

    relatorioArea.style.display = "block";
}

// ================================
// GERAR GRÁFICO
// ================================

const ctx = document.getElementById("graficoPresenca").getContext("2d");

if (grafico !== null) {
    grafico.destroy();
}

grafico = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Presentes", "Ausentes"],
        datasets: [{
            data: [presentes.length, ausentes.length],
            backgroundColor: ["#4caf50", "#e53935"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});
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

// ================================
// EXPORTAR EXCEL (CSV)
// ================================

// ================================
// EXPORTAR EXCEL (CSV CORRIGIDO)
// ================================

document.getElementById("btnExcel").addEventListener("click", function () {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const turma = turmaSelect.value;
    const data = dataInput.value;

    let csv = "Aluno;Status\n";

    alunos.forEach(aluno => {

        if (aluno.style.display === "none") return;

        const nome = aluno.textContent;
        const chave = gerarChave(nome);
        const statusSalvo = localStorage.getItem(chave);

        let status = "Ausente";

        if (statusSalvo === "presente") status = "Presente";
        if (statusSalvo === "ausente") status = "Ausente";

        csv += nome + ";" + status + "\n";

    });

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute("download", "relatorio_" + turma + "_" + data + ".csv");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

});

// ================================
// HISTÓRICO DE AULAS
// ================================

btnHistorico.addEventListener("click", function () {

    const turma = turmaSelect.value;

    let datasEncontradas = new Set();

    alunos.forEach(aluno => {

        const nome = aluno.textContent;

        for (let i = 0; i < localStorage.length; i++) {

            const chave = localStorage.key(i);

            if (chave.startsWith(nome + "_" + turma + "_")) {

                const partes = chave.split("_");
                const dataSalva = partes[2];

                datasEncontradas.add(dataSalva);
            }
        }

    });

    if (datasEncontradas.size === 0) {
        historicoConteudo.innerHTML = "<p>Nenhuma aula registrada.</p>";
    } else {

        let lista = "<ul>";

        datasEncontradas.forEach(data => {
            lista += `<li><button onclick="carregarDataHistorico('${data}')">${data}</button></li>`;
        });

        lista += "</ul>";

        historicoConteudo.innerHTML = lista;
    }

    historicoArea.style.display = "block";
});

function carregarDataHistorico(dataSelecionada) {

    dataInput.value = dataSelecionada;

    carregarPresencas();

    historicoArea.style.display = "none";
}