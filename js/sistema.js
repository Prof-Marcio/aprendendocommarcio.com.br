const areaCarteiras = document.getElementById("areaCarteiras");
const turmaSelect = document.getElementById("turma");
const dataInput = document.getElementById("data");

const alunos = [
    "Ana","Bruno","Camila","Diego","João",
    "Júlia","Leonardo","Luana","Marcos","Matheus"
];

function gerarCarteiras() {

    areaCarteiras.innerHTML = "";

    alunos.forEach((nome, i) => {

        const div = document.createElement("div");
        div.className = "carteira c" + (i+1);
        div.dataset.nome = nome;

        div.innerHTML = `
            <div class="badge">0</div>
            <div class="avatar">
                <img src="https://i.pravatar.cc/100?u=${nome}">
            </div>
            <div class="nome-aluno">${nome}</div>
        `;

        div.addEventListener("click", () => marcarPresenca(div));

        areaCarteiras.appendChild(div);
    });

}

function marcarPresenca(carteira) {

    if(!dataInput.value){
        alert("Selecione data");
        return;
    }

    const nome = carteira.dataset.nome;
    const turma = turmaSelect.value;
    const data = dataInput.value;
    const chave = `${nome}_${turma}_${data}`;

    carteira.classList.remove("presente","ausente");

    const status = localStorage.getItem(chave);

    if(!status){
        carteira.classList.add("presente");
        localStorage.setItem(chave,"presente");
    }
    else if(status === "presente"){
        carteira.classList.add("ausente");
        localStorage.setItem(chave,"ausente");
    }
    else{
        localStorage.removeItem(chave);
    }

    atualizarBadges();
}

function atualizarBadges(){

    const carteiras = document.querySelectorAll(".carteira");
    const turma = turmaSelect.value;

    carteiras.forEach(carteira=>{

        const nome = carteira.dataset.nome;
        let faltas = 0;

        for(let i=0;i<localStorage.length;i++){

            const chave = localStorage.key(i);
            const partes = chave.split("_");

            if(partes.length===3){

                const nomeSalvo = partes[0];
                const turmaSalva = partes[1];

                if(nomeSalvo===nome && turmaSalva===turma){

                    const status = localStorage.getItem(chave);
                    if(status==="ausente") faltas++;
                }
            }
        }

        const badge = carteira.querySelector(".badge");

        if(faltas>0){
            badge.style.display="block";
            badge.textContent=faltas;
        }else{
            badge.style.display="none";
        }

    });

}

document.addEventListener("DOMContentLoaded", gerarCarteiras);