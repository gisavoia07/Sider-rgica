// Constantes de Configuração do Sistema
let temperaturaAtual = 0;
const LIMITE_CRITICO = 1200;

// Elementos Mapeados da Interface (DOM)
const txtTemperatura = document.getElementById('temp-valor');
const fillProgresso = document.getElementById('progresso-termico');
const ledStatus = document.getElementById('led-status');
const btnAquecer = document.getElementById('btn-aquecer');
const painelAlerta = document.getElementById('painel-alerta');

/**
 * Função de Varredura - Analisa o estado térmico e aplica as regras de intertravamento
 */
function atualizarPainelIHM() {
    // 1. Atualiza a leitura numérica na tela
    txtTemperatura.innerText = temperaturaAtual;

    // 2. Atualiza a barra de preenchimento (Escala de 0% a 100% com base no limite de 1200°C)
    const percentualBarra = (temperaturaAtual / LIMITE_CRITICO) * 100;
    fillProgresso.style.width = `${percentualBarra}%`;

    // 3. Matriz Lógica de Intertravamento (Condicional if/else)
    if (temperaturaAtual >= LIMITE_CRITICO) {
        // [ESTADO CRÍTICO] - Segurança Ativada
        temperaturaAtual = LIMITE_CRITICO; // Impede sobrecarga de dados
        
        // Ativação do Intertravamento de Segurança (Bloqueia o acionador)
        btnAquecer.disabled = true;

        // Feedback Visual de Perigo
        txtTemperatura.style.color = 'var(--vermelho-alarme)';
        fillProgresso.style.backgroundColor = 'var(--vermelho-alarme)';
        fillProgresso.style.boxShadow = '0 0 12px var(--vermelho-brilho)';
        
        // Modificação do Alarme LED
        ledStatus.className = 'led led-danger';

        // Mostra Painel com Alerta Ambiental de Manutenção
        painelAlerta.style.display = 'block';
        painelAlerta.innerText = '⚠️ INTERTRAVAMENTO ATIVO: REVESTIMENTO REFRATÁRIO EM LIMITE CRÍTICO!';
        
    } else if (temperaturaAtual >= 800) {
        // [ESTADO DE ATENÇÃO] - Zona Amarela
        btnAquecer.disabled = false;
        txtTemperatura.style.color = 'var(--laranja-painel)';
        fillProgresso.style.backgroundColor = 'var(--laranja-painel)';
        fillProgresso.style.boxShadow = '0 0 12px var(--laranja-brilho)';
        ledStatus.className = 'led led-warning';
        painelAlerta.style.display = 'none';
        
    } else {
        // [ESTADO SEGURO] - Operação Normal (Igual à foto)
        btnAquecer.disabled = false;
        txtTemperatura.style.color = 'var(--laranja-painel)';
        fillProgresso.style.backgroundColor = 'var(--laranja-painel)';
        fillProgresso.style.boxShadow = '0 0 12px var(--laranja-brilho)';
        ledStatus.className = 'led led-safe';
        painelAlerta.style.display = 'none';
    }
}

/**
 * Acionamento Manual: Eleva a temperatura do forno (+200°C por ciclo)
 */
function adicionarCalor() {
    if (temperaturaAtual < LIMITE_CRITICO) {
        temperaturaAtual += 200;
        atualizarPainelIHM();
    }
}

/**
 * Resfriamento de Emergência: Desliga as resistências e resfria o núcleo instantaneamente para 0°C
 */
function resfriamentoTotal() {
    temperaturaAtual = 0;
    atualizarPainelIHM();
}

// Inicialização e calibração automática da HMI
atualizarPainelIHM();