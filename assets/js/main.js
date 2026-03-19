/**
 * ENGINE_NAME: A4_STUDY_TRACKER v1.0
 * DESCRIPTION: Gerencia o estado de conclusão dos tópicos do edital.
 */

const StudyApp = {
    // Inicialização do Sistema
    init() {
        console.log("System Status: Online [A4_Study_Engine]");
        this.loadProgress();
        this.bindEvents();
    },

    // Mapeia todos os cliques nos tópicos da folha A4
    bindEvents() {
        const topics = document.querySelectorAll('.topic-item');
        
        topics.forEach((topic, index) => {
            // Geramos um ID único baseado no texto e posição para o Storage
            const topicID = `topic_${window.location.pathname}_${index}`;
            
            topic.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTopic(topic, topicID);
            });
        });
    },

    // Alterna o estado Visual e o Storage
    toggleTopic(element, id) {
        const isCompleted = element.classList.toggle('completed');
        
        if (isCompleted) {
            localStorage.setItem(id, 'done');
            element.style.color = '#27ae60'; // Verde Sucesso
            console.log(`Topic [${id}] marked as DONE.`);
        } else {
            localStorage.removeItem(id);
            element.style.color = '#000000'; // Reset para preto
            console.log(`Topic [${id}] reset.`);
        }
    },

    // Carrega o que já foi estudado ao abrir a página
    loadProgress() {
        const topics = document.querySelectorAll('.topic-item');
        
        topics.forEach((topic, index) => {
            const topicID = `topic_${window.location.pathname}_${index}`;
            if (localStorage.getItem(topicID) === 'done') {
                topic.classList.add('completed');
                topic.style.color = '#27ae60';
                // Marca o checkbox visual se existir
                const cb = topic.querySelector('.checkbox');
                if (cb) cb.innerHTML = '✓';
            }
        });
    }
};

// Start
document.addEventListener('DOMContentLoaded', () => StudyApp.init());