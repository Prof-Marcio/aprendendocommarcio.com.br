// ======================================================
// MÓDULO DE HISTÓRICO - SISTEMA PROFISSIONAL
// ======================================================

// =============================
// ELEMENTOS
// =============================

const btnHistorico = document.getElementById("btnHistorico");
const modalHistorico = document.getElementById("modalHistorico");
const historicoConteudo = document.getElementById("historicoConteudo");

// ======================================================
// ABRIR HISTÓRICO
// ======================================================

btnHistorico.addEventListener("click", abrirHistorico);

function abrirHistorico() {

    const turma = turmaSelect.value;

    let datasEncontradas = new Set();

    // Buscar todas as datas no localStorage
    for (let i = 0; i < localStorage.length; i++) {

        const chave = localStorage.key(i);
        const partes = chave.split("_");

        if (partes.length === 3) {

            const turmaSalva = partes[1];
            const dataSalva = partes[2];

            if (turmaSalva === turma) {
                datasEncontradas.add(dataSalva);
            }
        }
    }

    // Converter para array e ordenar desc
    const datasOrdenadas = Array.from(datasEncontradas)
        .sort((a, b) => new Date(b) - new Date(a));

    if (datasOrdenadas.length === 0) {

        historicoConteudo.innerHTML =
            "<p>Nenhuma aula registrada para esta turma.</p>";

    } else {

        let html = "<ul>";

        datasOrdenadas.forEach(data => {

            html += `
                <li>
                    <button onclick="carregarDataHistorico('${data}')">
                        ${data}
                    </button>
                </li>
            `;
        });

        html += "</ul>";

        historicoConteudo.innerHTML = html;
    }

    modalHistorico.classList.remove("hidden");
}

// ======================================================
// CARREGAR DATA DO HISTÓRICO
// ======================================================

function carregarDataHistorico(dataSelecionada) {

    dataInput.value = dataSelecionada;

    if (typeof carregarPresencas === "function") {
        carregarPresencas();
    }

    fecharHistorico();
}

// ======================================================
// FECHAR HISTÓRICO
// ======================================================

function fecharHistorico() {
    modalHistorico.classList.add("hidden");
}