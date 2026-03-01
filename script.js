// ================================
// VISUALIZADOR DE DOCUMENTOS
// ================================

function abrirDocumento(pasta, arquivos){

const overlay = document.getElementById("overlay");
const container = document.getElementById("documentoContainer");

if(!overlay || !container){
console.error("Overlay ou container não encontrado.");
return;
}

container.innerHTML = "";

// Carrega todas as imagens
arquivos.forEach(function(nome){

const img = document.createElement("img");
img.src = `${pasta}/${nome}`;
img.alt = nome;
img.loading = "lazy"; // melhora desempenho

container.appendChild(img);

});

overlay.style.display = "flex";
document.body.style.overflow = "hidden"; // trava scroll da página
}

// ================================
// FECHAR DOCUMENTO
// ================================

function fecharDocumento(){

const overlay = document.getElementById("overlay");

overlay.style.display = "none";
document.body.style.overflow = "auto"; // libera scroll

}

// ================================
// FECHAR AO CLICAR FORA
// ================================

document.addEventListener("click", function(e){

const overlay = document.getElementById("overlay");

if(e.target === overlay){
fecharDocumento();
}

});

// ================================
// FECHAR COM ESC
// ================================

document.addEventListener("keydown", function(e){

if(e.key === "Escape"){
fecharDocumento();
}

});

// ================================
// FUTURA EXPANSÃO (BIMESTRES)
// ================================

// Você poderá futuramente criar:
//
// function abrirBimestre2()
// function abrirBimestre3()
// function abrirBimestre4()
//
// sem precisar alterar a base do sistema.