// ======================================================
// MÓDULO DE RELATÓRIO - SISTEMA PROFISSIONAL
// ======================================================

let grafico = null;

// =============================
// ELEMENTOS
// =============================

const btnRelatorio = document.getElementById("btnRelatorio");
const modalRelatorio = document.getElementById("modalRelatorio");
const relatorioConteudo = document.getElementById("relatorioConteudo");
const btnPDF = document.getElementById("btnPDF");
const btnExcel = document.getElementById("btnExcel");

// ======================================================
// GERAR RELATÓRIO
// ======================================================

btnRelatorio.addEventListener("click", gerarRelatorio);

function gerarRelatorio() {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const turma = turmaSelect.value;
    const data = dataInput.value;

    const carteiras = document.querySelectorAll(".carteira");

    let presentes = [];
    let ausentes = [];

    // =============================
    // PRESENÇA DA DATA ATUAL
    // =============================

    carteiras.forEach(carteira => {

        const nome = carteira.dataset.nome;
        const chave = `${nome}_${turma}_${data}`;
        const status = localStorage.getItem(chave);

        if (status === "presente") {
            presentes.push(nome);
        } else {
            ausentes.push(nome);
        }

    });

    // =============================
    // BUSCAR TODAS AS DATAS DA TURMA
    // =============================

    let datasTurma = new Set();

    for (let i = 0; i < localStorage.length; i++) {

        const chave = localStorage.key(i);
        const partes = chave.split("_");

        if (partes.length === 3) {

            const turmaSalva = partes[1];
            const dataSalva = partes[2];

            if (turmaSalva === turma) {
                datasTurma.add(dataSalva);
            }
        }
    }

    const totalAulas = datasTurma.size;

    // =============================
    // FREQUÊNCIA ACUMULADA
    // =============================

    let estatisticas = [];

    carteiras.forEach(carteira => {

        const nome = carteira.dataset.nome;
        let faltas = 0;

        datasTurma.forEach(d => {

            const chave = `${nome}_${turma}_${d}`;
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

    // =============================
    // MONTAR HTML DO RELATÓRIO
    // =============================

    relatorioConteudo.innerHTML = `
        <p><strong>Turma:</strong> ${turma}</p>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Total de Aulas:</strong> ${totalAulas}</p>
        <p><strong>Presentes Hoje:</strong> ${presentes.length}</p>
        <p><strong>Ausentes Hoje:</strong> ${ausentes.length}</p>
        <hr>
        <h3>Frequência Acumulada</h3>
        <ul>
            ${estatisticas.map(aluno => `
                <li>
                    ${aluno.nome} —
                    Faltas: ${aluno.faltas} |
                    Frequência: ${aluno.frequencia}%
                </li>
            `).join("")}
        </ul>
    `;

    modalRelatorio.classList.remove("hidden");

    gerarGrafico(presentes.length, ausentes.length);
}

// ======================================================
// GRÁFICO
// ======================================================

function gerarGrafico(presentes, ausentes) {

    const ctx = document.getElementById("graficoPresenca").getContext("2d");

    if (grafico !== null) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Presentes", "Ausentes"],
            datasets: [{
                data: [presentes, ausentes],
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
}

// ======================================================
// EXPORTAR PDF PROFISSIONAL
// ======================================================

btnPDF.addEventListener("click", () => {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const texto = relatorioConteudo.innerText;

    doc.setFont("helvetica");
    doc.setFontSize(12);

    doc.text("Relatório de Presença", 10, 10);
    doc.text(texto, 10, 20);

    doc.save("relatorio.pdf");
});

// ======================================================
// EXPORTAR EXCEL (CSV UTF-8)
// ======================================================

btnExcel.addEventListener("click", () => {

    let csv = "Aluno;Faltas;Frequência\n";

    const itens = relatorioConteudo.querySelectorAll("li");

    itens.forEach(item => {

        const texto = item.innerText
            .replace(" — ", ";")
            .replace("Faltas: ", "")
            .replace(" | Frequência: ", ";")
            .replace("%", "");

        csv += texto + "\n";
    });

    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio.csv";
    link.click();
});

// ======================================================
// FECHAR MODAL
// ======================================================

function fecharRelatorio() {
    modalRelatorio.classList.add("hidden");
}