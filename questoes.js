const questoes = [
  {
  id: 10,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Conotação e denotação",
    enfoque: "Identificação de sentido conotativo",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "10",

  textoProva: `Acerca da conotação e denotação, assinale a alternativa que representa uma frase conotativa.`,

  enunciado:
    "Assinale a alternativa em que a linguagem é utilizada em sentido figurado:",

  alternativas: {
    A: "No próximo ano, faremos uma excursão à Argentina.",
    B: "A professora pediu para que os alunos pegassem seus cadernos.",
    C: "Ele deverá chegar daqui a uma hora.",
    D: "Todos compraram aquelas roupas bem satisfeitos.",
    E: "O dono do bar não deixará ele pendurar a conta mais uma vez."
  },

  delimitacao:
    "A análise restringe-se ao valor semântico das expressões.",

  decisao:
    "Identificar o uso de linguagem conotativa.",

  extracao:
    "A expressão “pendurar a conta” é empregada em sentido figurado.",

  limites:
    "Não se analisam aspectos sintáticos ou morfológicos.",

  analiseAlternativas: {
    A: "Linguagem objetiva, com sentido literal.",
    B: "Uso literal da linguagem.",
    C: "Sentido denotativo, sem figura de linguagem.",
    D: "Sentido literal da ação descrita.",
    E: "Expressão idiomática com sentido figurado."
  },

  confirmacao:
    "O sentido figurado da expressão caracteriza linguagem conotativa.",

  gabarito: "E"
  },
  {
  id: 9,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Formação de palavras",
    enfoque: "Identificação do processo de formação de palavras",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "09",

  textoProva: `Acerca do processo de formação de palavras, relacione a coluna da direita com a da esquerda.`,

  enunciado:
    "Assinale a alternativa que apresenta a ordem correta de formação das palavras:",

  alternativas: {
    A: "1 – 2 – 3.",
    B: "2 – 1 – 3.",
    C: "2 – 3 – 1.",
    D: "3 – 2 – 1.",
    E: "3 – 1 – 2."
  },

  delimitacao:
    "A análise restringe-se aos processos de prefixação e sufixação.",

  decisao:
    "Identificar corretamente o processo de formação de cada palavra.",

  extracao:
    "Infeliz é formada por prefixação; pedreiro, por sufixação; entristecer, por prefixação e sufixação.",

  limites:
    "Não se analisam outros processos de formação, como composição ou parassíntese.",

  analiseAlternativas: {
    A: "A ordem apresentada não corresponde aos processos corretos.",
    B: "A sequência corresponde corretamente aos processos de formação.",
    C: "Há erro na identificação do processo de 'entristecer'.",
    D: "A ordem inverte os processos de prefixação e sufixação.",
    E: "A identificação de 'pedreiro' está incorreta."
  },

  confirmacao:
    "A ordem correta é prefixação, sufixação, prefixação e sufixação.",

  gabarito: "B"
  },
  {
  id: 8,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Crase",
    enfoque: "Identificação do emprego correto da crase",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "08",

  textoProva: `A crase está CORRETAMENTE empregada em:`,

  enunciado:
    "Assinale a alternativa em que o uso do acento indicativo de crase está correto:",

  alternativas: {
    A: "Os juízes estavam dispostos à uma nova avaliação do caso.",
    B: "Jamais convidarão à ele para a festa.",
    C: "Aquele pacote cheirava à vinho.",
    D: "Todos ficaram a observar o evento, à cerca de vinte metros do local.",
    E: "Ele não se referiu à tua proposta, mas sim à minha."
  },

  delimitacao:
    "A análise restringe-se às regras de emprego da crase.",

  decisao:
    "Identificar a alternativa com uso correto do acento grave.",

  extracao:
    "Há crase correta antes de pronomes possessivos femininos quando há artigo implícito.",

  limites:
    "Não se analisam outros aspectos de regência além dos relacionados à crase.",

  analiseAlternativas: {
    A: "Não há crase antes de artigo indefinido.",
    B: "Não ocorre crase antes de pronome pessoal.",
    C: "Não há crase antes de substantivo masculino.",
    D: "A expressão correta é 'a cerca de', sem crase.",
    E: "O verbo 'referir-se' exige preposição, e há artigo feminino subentendido."
  },

  confirmacao:
    "O uso do acento grave está correto na alternativa E.",

  gabarito: "E"
  },
  {
  id: 7,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Concordância verbal",
    enfoque: "Identificação de erro de concordância verbal",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "07",

  textoProva: `Assinale a alternativa em que ocorre ERRO de concordância verbal:`,

  enunciado:
    "Identifique a alternativa que apresenta erro de concordância verbal:",

  alternativas: {
    A: "Boa parte dos inscritos no último concurso irá realizar a prova no centro de Porto Alegre.",
    B: "32% de todo o dinheiro arrecadado serão doados para instituições de caridade.",
    C: "Os 15% restantes do grupo será selecionados para a próxima etapa.",
    D: "Mais de vinte alunos foram reprovados neste ano em nossa escola.",
    E: "Vossa Senhoria gostaria de que eu lavasse o seu carro?"
  },

  delimitacao:
    "A análise restringe-se à concordância verbal.",

  decisao:
    "Identificar erro na relação entre sujeito e verbo.",

  extracao:
    "Na alternativa C, há desacordo entre o núcleo do sujeito e o verbo.",

  limites:
    "Não se analisam aspectos de concordância nominal ou regência.",

  analiseAlternativas: {
    A: "A concordância com expressão partitiva está correta.",
    B: "A concordância percentual está correta.",
    C: "O verbo deveria concordar com o núcleo do sujeito no plural.",
    D: "A concordância está correta com numeral plural.",
    E: "A concordância com pronome de tratamento está correta."
  },

  confirmacao:
    "O erro ocorre na alternativa C, por falha de concordância verbal.",

  gabarito: "C"
  },
  {
  id: 6,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Conjunções subordinativas",
    enfoque: "Identificação de conjunção subordinativa concessiva",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "06",

  textoProva: `Assinale a alternativa em que há ocorrência de conjunção subordinativa concessiva:`,

  enunciado:
    "Identifique a alternativa que apresenta conjunção subordinativa concessiva:",

  alternativas: {
    A: "Embora ele estivesse conosco, não poderia ter feito nada para salvar a vida do amigo.",
    B: "Velho que era, evitava lugares altos e grandes emoções.",
    C: "Os advogados procederam segundo ordenava a lei.",
    D: "Falou tanto que ficou rouco.",
    E: "Participaremos do evento, salvo se houver algum empecilho de última hora."
  },

  delimitacao:
    "A análise restringe-se ao valor semântico da conjunção empregada.",

  decisao:
    "Identificar conjunção subordinativa de valor concessivo.",

  extracao:
    "A conjunção “embora” exprime ideia de concessão.",

  limites:
    "Não se analisam outros tipos de orações subordinadas.",

  analiseAlternativas: {
    A: "“Embora” é conjunção subordinativa concessiva.",
    B: "A expressão tem valor explicativo.",
    C: "“Segundo” indica conformidade.",
    D: "“Que” introduz oração consecutiva.",
    E: "“Salvo se” tem valor condicional."
  },

  confirmacao:
    "A conjunção “embora” caracteriza oração subordinada concessiva.",

  gabarito: "A"
  },
  {
  id: 5,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Novo Acordo Ortográfico",
    enfoque: "Análise das regras do novo acordo ortográfico",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "05",

  textoProva: `Acerca das novas regras ortográficas, analise:`,

  enunciado:
    "Dos itens apresentados, assinale a alternativa correta:",

  alternativas: {
    A: "Apenas o item I está correto.",
    B: "Apenas o item III está correto.",
    C: "Apenas os itens I e II estão corretos.",
    D: "Apenas os itens I e III estão corretos.",
    E: "Todos os itens estão corretos."
  },

  delimitacao:
    "A análise restringe-se às regras do Novo Acordo Ortográfico.",

  decisao:
    "Verificar quais afirmações sobre o Acordo Ortográfico estão corretas.",

  extracao:
    "Os itens I e III estão de acordo com as regras ortográficas vigentes.",

  limites:
    "Não se analisam aspectos fonéticos ou morfológicos além das regras ortográficas.",

  analiseAlternativas: {
    A: "O item III também está correto.",
    B: "O item I também está correto.",
    C: "O item II contém erro quanto ao uso do acento circunflexo.",
    D: "Os itens I e III estão corretos.",
    E: "O item II está incorreto."
  },

  confirmacao:
    "O Novo Acordo Ortográfico confirma como corretos apenas os itens I e III.",

  gabarito: "D"
  },
  {
  id: 4,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Análise sintática",
    enfoque: "Identificação da função sintática do sujeito",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "04",

  textoProva: `Acerca da análise sintática, assinale a alternativa em que os termos destacados exercem função de sujeito:`,

  enunciado:
    "Assinale a alternativa em que os termos destacados são sujeitos:",

  alternativas: {
    A: "Deslizavam montanha abaixo as águas do desgelo.",
    B: "Caso não lhe venham a parecer oportunas essas medidas, faça você mesmo como quiser.",
    C: "Ainda cabe aos alunos consertar o dano que causaram à escola.",
    D: "Se a cada um de nós efetivamente perturbassem os que agem mal, a impunidade seria impossível.",
    E: "Está na hora de a onça beber água."
  },

  delimitacao:
    "A análise restringe-se à identificação do sujeito das orações.",

  decisao:
    "Verificar em qual alternativa o termo destacado exerce função de sujeito.",

  extracao:
    "Na alternativa D, o termo destacado exerce a função sintática de sujeito.",

  limites:
    "Não se analisam outros termos da oração além do sujeito.",

  analiseAlternativas: {
    A: "O sujeito é posposto, mas não corresponde ao termo destacado.",
    B: "O termo destacado não exerce função de sujeito.",
    C: "Há sujeito oracional, não correspondendo ao termo destacado.",
    D: "O termo destacado funciona como sujeito da oração.",
    E: "O sujeito é a oração reduzida, não o termo destacado."
  },

  confirmacao:
    "A alternativa D apresenta corretamente o termo destacado exercendo função de sujeito.",

  gabarito: "D"
  },
  {
  id: 3,

  identificacao: {
    disciplina: "Língua Portuguesa",
    conteudo: "Emprego do hífen",
    enfoque: "Identificação de erro no emprego do hífen",
    banca: "IACP antiga (ADVISE)",
    ano: "2018"
  },

  numero: "03",

  textoProva: `Todas as alternativas abaixo estão corretas quanto ao emprego do hífen, EXCETO:`,

  enunciado:
    "Assinale a alternativa incorreta quanto ao uso do hífen:",

  alternativas: {
    A: "Circum-navegação.",
    B: "Tele-educação.",
    C: "Couve-flor.",
    D: "Semi-reta.",
    E: "Água-de-colônia."
  },

  delimitacao:
    "A análise restringe-se às regras do Acordo Ortográfico quanto ao uso do hífen.",

  decisao:
    "Identificar a forma grafada em desacordo com as regras do hífen.",

  extracao:
    "A palavra formada com o prefixo 'circum' não admite hífen.",

  limites:
    "Não se analisam outros aspectos ortográficos além do uso do hífen.",

  analiseAlternativas: {
    A: "A forma correta é 'circunnavegação', sem hífen.",
    B: "O uso do hífen é correto com o prefixo 'tele-'.",
    C: "Composto consagrado pelo uso, grafado com hífen.",
    D: "Prefixo 'semi-' seguido de vogal admite hífen.",
    E: "Composto tradicional grafado com hífen."
  },

  confirmacao:
    "O prefixo 'circum' não se liga por hífen ao segundo elemento.",

  gabarito: "A"
  },
  {
    id: 2,

    identificacao: {
      disciplina: "Língua Portuguesa",
      conteudo: "Elementos da comunicação",
      enfoque: "Análise conceitual dos elementos da comunicação",
      banca: "IACP antiga (ADVISE)",
      ano: "2018"
    },

    numero: "02",

    textoProva: `Acerca dos elementos de comunicação, segundo o Dicionário Brasileiro da Língua Portuguesa Michaelis, analise.`,

    enunciado:
      "Dos itens apresentados, assinale a alternativa correta:",

    alternativas: {
      A: "Apenas o item I está correto.",
      B: "Apenas o item III está correto.",
      C: "Apenas os itens I e II estão corretos.",
      D: "Apenas os itens I e III estão corretos.",
      E: "Todos os itens estão corretos."
    },

    delimitacao:
      "A análise restringe-se aos conceitos de emissor, receptor e código.",

    decisao:
      "Verificar a correção conceitual dos elementos da comunicação.",

    extracao:
      "O item III define corretamente o conceito de código.",

    limites:
      "Os itens I e II apresentam definições conceituais incorretas.",

    analiseAlternativas: {
      A: "O item I está conceitualmente incorreto.",
      B: "Somente o item III apresenta definição adequada.",
      C: "O item II também está incorreto.",
      D: "O item I não está correto.",
      E: "Nem todos os itens estão corretos."
    },

    confirmacao:
      "Apenas o conceito de código está corretamente definido.",

    gabarito: "B"
  },
  {
    id: 1,

    identificacao: {
      disciplina: "Língua Portuguesa",
      conteudo: "Colocação pronominal",
      enfoque: "Identificação do tipo de colocação pronominal",
      banca: "IACP antiga (ADVISE)",
      ano: "2018"
    },

    numero: "01",

    textoProva: `Perceberam-nos assim que chegamos ao local.`,

    enunciado:
      "Considere a frase a seguir. A frase é um claro exemplo de:",

    alternativas: {
      A: "Próclise.",
      B: "Mesóclise.",
      C: "Ênclise.",
      D: "Frase sem verbo.",
      E: "Período composto por uma oração, apenas."
    },

    delimitacao:
      "A análise restringe-se à posição do pronome oblíquo átono.",

    decisao:
      "Identificar o tipo de colocação pronominal.",

    extracao:
      "O pronome oblíquo átono “nos” aparece posposto ao verbo.",

    limites:
      "Não há elemento atrativo que justifique próclise nem tempo verbal que admita mesóclise.",

    analiseAlternativas: {
      A: "Não há elemento atrativo para próclise.",
      B: "Mesóclise ocorre apenas com futuro do presente ou do pretérito.",
      C: "O pronome está posposto ao verbo, caracterizando ênclise.",
      D: "A frase apresenta verbo.",
      E: "Há mais de uma oração no período."
    },

    confirmacao:
      "A posição do pronome após o verbo confirma a ocorrência de ênclise.",

    gabarito: "C"
  }
]
