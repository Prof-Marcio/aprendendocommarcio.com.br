// =====================================================
// SALA VIRTUAL PEDAGÓGICA - BASE PARA MODELO ILUSTRADO
// =====================================================

let grafico = null;

// ==========================
// ELEMENTOS
// ==========================

const carteiras = document.querySelectorAll(".carteira");
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

// =====================================================
// GERAR CHAVE
// =====================================================

function gerarChave(nome, turma, data) {
    return `${nome}_${turma}_${data}`;
}

// =====================================================
// ATUALIZAR CONTADOR
// =====================================================

function atualizarContador() {

    let presentes = 0;
    let total = 0;

    carteiras.forEach(carteira => {

        if (carteira.style.display === "none") return;

        total++;

        if (carteira.classList.contains("presente")) {
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

// =====================================================
// CARREGAR PRESENÇAS
// =====================================================

function carregarPresencas() {

    carteiras.forEach(carteira => {

        carteira.classList.remove("presente", "ausente");

        if (!dataInput.value) return;
        if (carteira.style.display === "none") return;

        const nome = carteira.dataset.nome;

        const chave = gerarChave(
            nome,
            turmaSelect.value,
            dataInput.value
        );

        const status = localStorage.getItem(chave);

        if (status === "presente") carteira.classList.add("presente");
        if (status === "ausente") carteira.classList.add("ausente");

    });

    atualizarContador();
}

// =====================================================
// EVENTO CLIQUE CARTEIRA (CICLO)
// =====================================================

carteiras.forEach(carteira => {

    carteira.addEventListener("click", function () {

        if (!dataInput.value) {
            alert("Selecione uma data primeiro!");
            return;
        }

        if (carteira.style.display === "none") return;

        const nome = carteira.dataset.nome;

        const chave = gerarChave(
            nome,
            turmaSelect.value,
            dataInput.value
        );

        carteira.classList.remove("presente", "ausente");

        const statusAtual = localStorage.getItem(chave);

        if (!statusAtual) {
            carteira.classList.add("presente");
            localStorage.setItem(chave, "presente");
        }
        else if (statusAtual === "presente") {
            carteira.classList.add("ausente");
            localStorage.setItem(chave, "ausente");
        }
        else {
            localStorage.removeItem(chave);
        }

        atualizarContador();
    });

});

// =====================================================
// FILTRAR TURMA
// =====================================================

function filtrarTurma() {

    const turmaAtual = turmaSelect.value;

    carteiras.forEach(carteira => {

        if (carteira.dataset.turma === turmaAtual) {
            carteira.style.display = "block";
        } else {
            carteira.style.display = "none";
        }

    });

    carregarPresencas();
}

turmaSelect.addEventListener("change", filtrarTurma);
dataInput.addEventListener("change", carregarPresencas);

// =====================================================
// LIMPAR PRESENÇA
// =====================================================

btnLimpar.addEventListener("click", function () {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    carteiras.forEach(carteira => {

        if (carteira.style.display === "none") return;

        const chave = gerarChave(
            carteira.dataset.nome,
            turmaSelect.value,
            dataInput.value
        );

        localStorage.removeItem(chave);
        carteira.classList.remove("presente", "ausente");

    });

    atualizarContador();
});

// =====================================================
// RELATÓRIO + GRÁFICO
// =====================================================

btnRelatorio.addEventListener("click", function () {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const turma = turmaSelect.value;
    const data = dataInput.value;

    let presentes = [];
    let ausentes = [];

    carteiras.forEach(carteira => {

        if (carteira.style.display === "none") return;

        const nome = carteira.dataset.nome;
        const chave = gerarChave(nome, turma, data);
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
        <p><strong>Presentes:</strong> ${presentes.length}</p>
        <p><strong>Ausentes:</strong> ${ausentes.length}</p>
    `;

    relatorioArea.style.display = "block";

    // GRÁFICO

    const canvas = document.getElementById("graficoPresenca");

    if (canvas) {

        const ctx = canvas.getContext("2d");

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
    }
});

// =====================================================
// EXPORTAR PDF
// =====================================================

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

    carteiras.forEach(carteira => {

        if (carteira.style.display === "none") return;

        const nome = carteira.dataset.nome;
        const chave = gerarChave(nome, turma, data);
        const status = localStorage.getItem(chave);

        let situacao = "Ausente";
        if (status === "presente") situacao = "Presente";

        doc.text(nome + " - " + situacao, 10, y);
        y += 8;

    });

    doc.save("relatorio_" + turma + "_" + data + ".pdf");
});

// =====================================================
// EXPORTAR EXCEL
// =====================================================

btnExcel.addEventListener("click", function () {

    if (!dataInput.value) {
        alert("Selecione uma data primeiro!");
        return;
    }

    const turma = turmaSelect.value;
    const data = dataInput.value;

    let csv = "Aluno;Status\n";

    carteiras.forEach(carteira => {

        if (carteira.style.display === "none") return;

        const nome = carteira.dataset.nome;
        const chave = gerarChave(nome, turma, data);
        const status = localStorage.getItem(chave);

        let situacao = "Ausente";
        if (status === "presente") situacao = "Presente";

        csv += nome + ";" + situacao + "\n";
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

// =====================================================
// INICIALIZAÇÃO
// =====================================================

filtrarTurma();