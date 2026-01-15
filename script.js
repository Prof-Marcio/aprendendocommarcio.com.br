const btnBuscar = document.getElementById("btn-buscar");
const resultado = document.getElementById("resultado");

btnBuscar.addEventListener("click", buscarQuestoes);

function buscarQuestoes() {
  const disciplina = document.getElementById("filtro-disciplina").value;
  const conteudo = document.getElementById("filtro-conteudo").value;
  const enfoque = document.getElementById("filtro-enfoque").value;
  const banca = document.getElementById("filtro-banca").value;
  const ano = document.getElementById("filtro-ano").value;

  const filtradas = questoes.filter(q =>
    (disciplina === "" || q.identificacao.disciplina === disciplina) &&
    (conteudo === "" || q.identificacao.conteudo === conteudo) &&
    (enfoque === "" || q.identificacao.enfoque === enfoque) &&
    (banca === "" || q.identificacao.banca === banca) &&
    (ano === "" || q.identificacao.ano === ano)
  );

  mostrarQuestoes(filtradas);
}

function mostrarQuestoes(lista) {
  resultado.innerHTML = "";

  if (lista.length === 0) {
    resultado.innerHTML = "<p>Nenhuma questão encontrada.</p>";
    return;
  }

  lista.forEach(q => {
    resultado.innerHTML += `
      <section>
        <h2>1) Identificação da prova</h2>
        <p><strong>Disciplina:</strong> ${q.identificacao.disciplina}</p>
        <p><strong>Conteúdo:</strong> ${q.identificacao.conteudo}</p>
        <p><strong>Enfoque:</strong> ${q.identificacao.enfoque}</p>
        <p><strong>Banca:</strong> ${q.identificacao.banca}</p>
        <p><strong>Ano:</strong> ${q.identificacao.ano}</p>
        <p><strong>Número da questão:</strong> ${q.numero}</p>
      </section>

      <section>
        <h2>2) Questão</h2>
        <pre class="texto-prova">${q.textoProva}</pre>

        <p><strong>Enunciado:</strong></p>
        <p>${q.enunciado}</p>

        <ul>
          ${Object.entries(q.alternativas)
            .map(([l, t]) => `<li>${l}) ${t}</li>`)
            .join("")}
        </ul>
      </section>

      <section>
        <h2>3) Delimitação</h2>
        <p>${q.delimitacao}</p>
      </section>

      <section>
        <h2>4) Decisão exigida</h2>
        <p>${q.decisao}</p>
      </section>

      <section>
        <h2>5) Extração textual / conceitual</h2>
        <p>${q.extracao}</p>
      </section>

      <section>
        <h2>6) Limites impostos pelo texto</h2>
        <p>${q.limites}</p>
      </section>

      <section>
        <h2>7) Análise das alternativas</h2>
        ${Object.entries(q.analiseAlternativas)
          .map(([l, t]) => `<p><strong>${l})</strong> ${t}</p>`)
          .join("")}
      </section>

      <section>
        <h2>8) Confirmação</h2>
        <p>${q.confirmacao}</p>
      </section>

      <section>
        <h2>9) Registro final (gabarito)</h2>
        <p><strong>Gabarito: ${q.gabarito}</strong></p>
      </section>

      <hr>
    `;
  });
}
