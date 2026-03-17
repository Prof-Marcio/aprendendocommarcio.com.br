document.addEventListener("DOMContentLoaded", function() {
    const dataElemento = document.getElementById("data-registro");
    if (dataElemento) {
        const agora = new Date();
        dataElemento.innerText = agora.toLocaleString('pt-BR');
    }
});