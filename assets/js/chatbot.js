const result = document.getElementById("result");
const inputQuestion = document.getElementById("inputQuestion");

let atendimentoIniciado = false;
let respostaEsperada = false; 

function sendMessage() {
  const message = inputQuestion.value.trim();
  if (message !== '') {
    displayUserMessage(message);
    if (!atendimentoIniciado) {
      initiateChat(message);
    } else {
      if (!respostaEsperada) {
        respondToUser(message.toLowerCase());
      }
    }
    inputQuestion.value = '';
  }
}

function displayUserMessage(message) {
  result.value += `Você: ${message}\n\n`;
  result.scrollTop = result.scrollHeight;
}

function displayBotMessage(message) {
  result.value += `Sara: ${message}\n\n`;
  result.scrollTop = result.scrollHeight;
}

let totalCompra = 0;
let planosSelecionados = [];

function initiateChat(message) {
  if (message === '1') {
    displayBotMessage('Iniciando atendimento. Escolha uma das opções: \n\n1 Para solicitar um serviço de desenvolvimento de software.\n2 Para solicitar um serviço de consultoria.\n3 Para solicitar um serviço de teste de software.');
    atendimentoIniciado = true;
    respostaEsperada = true;
    document.addEventListener('keydown', handleKeyDown);
  } else if (message === '0') {
    displayBotMessage('Obrigado pela atenção. Volte sempre!');
  } else {
    displayBotMessage('Por favor, escolha 1 para iniciar o atendimento ou 0 para sair.');
  }
}

function handleKeyDown(event) {
  const key = event.key;
  if (atendimentoIniciado && respostaEsperada) {
    respondToUser(key);
  }
}

function respondToUser(message) {
  switch (message) {
    case '1':
      displayBotMessage('Opção 1 selecionada: Desenvolvimento de Software.\n\nAgora selecione o seu plano para o serviço\n\n4 - START (R$ 500)\n5 - MEGA (R$ 1000)\n6 - ULTRA (R$ 1500)\n\nDigite o número correspondente ao plano desejado ou 7 para finalizar.\n');
      respostaEsperada = true;
      break;
    case '2':
      displayBotMessage('Opção 2 selecionada: Consultoria em TI.\n\nAgora selecione o seu plano para o serviço\n\n4 - START (R$ 500)\n5 - MEGA (R$ 1000)\n6 - ULTRA (R$ 1500)\n\nDigite o número correspondente ao plano desejado ou 7 para finalizar.\n');
      respostaEsperada = true;
      break;
    case '3':
      displayBotMessage('Opção 3 selecionada: Teste de Software.\n\nAgora selecione o seu plano para o serviço\n\n4 - START (R$ 500)\n5 - MEGA (R$ 1000)\n6 - ULTRA (R$ 1500)\n\nDigite o número correspondente ao plano desejado ou enter 7 finalizar.\n');
      respostaEsperada = true;
      break;
    case '4':
      adicionarPlano('START', 500);
      break;
    case '5':
      adicionarPlano('MEGA', 1000);
      break;
    case '6':
      adicionarPlano('ULTRA', 1500);
      break;
    case '7':
      encerrarCompra();
      document.removeEventListener('keydown', handleKeyDown);
      break;
    case '7':
      encerrarCompra();
      document.removeEventListener('keydown', handleKeyDown);
      break;
    default:
      displayBotMessage('Por favor, escolha uma das opções listadas ou pressione 7 para encerrar.');
      break;
  }
}

function adicionarPlano(nomePlano, valorPlano) {
  totalCompra += valorPlano;
  planosSelecionados.push(nomePlano);
  displayBotMessage(`${nomePlano} adicionado ao carrinho.`);
  displayBotMessage('Digite 1 para escolher outro plano ou pressione 7 para encerrar a compra.');
  respostaEsperada = true;
}

function encerrarCompra() {
  if (planosSelecionados.length === 0) {
    displayBotMessage('Nenhum plano selecionado. Obrigado pela atenção. Volte sempre!');
  } else {
    let message = 'Planos selecionados:\n';
    for (let i = 0; i < planosSelecionados.length; i++) {
      message += `${i + 1} - ${planosSelecionados[i]}\n`;
    }
    message += `Total da compra: R$ ${totalCompra} volte sempre!`;
    displayBotMessage(message);
  }
  atendimentoIniciado = false;
  respostaEsperada = false;
}
