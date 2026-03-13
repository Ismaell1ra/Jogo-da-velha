const tabuleiro = Array(9).fill(null);
let jogadorAtual = 'X';
let JogoTerminado = false;
let placarX = 0;
let placarO = 0;

const casas = document.querySelectorAll('.casa');
const statusE1 = document.getElementById('status');
const reiniciarBtn = document.getElementById('reiniciar');
const jogadorXE1 = document.getElementById('jogadorX');
const jogadorOE1 = document.getElementById('jogadorO');

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function atualizarPlacar() {
    jogadorXE1.textContent = `X: ${placarX}`;
    jogadorOE1.textContent = `O: ${placarO}`;
}

function verificarVitoria() {
  for (let combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return tabuleiro[a];
    }
  }
  return tabuleiro.every(casa => casa !== null) ? 'Empate' : null;
}

function fazerJogada(posicao) {
  if (tabuleiro[posicao] || JogoTerminado) return;

  tabuleiro[posicao] = jogadorAtual;
  casas[posicao].textContent = jogadorAtual;
  casas[posicao].classList.add(jogadorAtual.toLowerCase());

  const vencedor = verificarVitoria();
  if (vencedor) {
    JogoTerminado = true;
    if (vencedor === 'Empate') {
      statusE1.textContent = 'Empate!';
    } else {
      statusE1.textContent = `Jogador ${vencedor} venceu!`;
      if (vencedor === 'X') placarX++;
       else placarO++;
      atualizarPlacar();
    }
  return;
}

  jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
  statusE1.textContent = `É a vez do jogador ${jogadorAtual}`;
}

function novoJogo() {
  tabuleiro.fill(null);
  jogadorAtual = 'X';
  JogoTerminado = false;
  statusE1.textContent = 'Jogador x começa!';
  casas.forEach((casa, i) => {
    casa.textContent = '';
    casa.className = 'casa';
  });
}

casas.forEach((casa, i) => {
  casa.addEventListener('click', () => fazerJogada(i));
});

reiniciarBtn.addEventListener('click', novoJogo);
atualizarPlacar();