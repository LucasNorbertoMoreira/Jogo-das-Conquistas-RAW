const btnNovaMeta = document.querySelector(".btn-nova-meta");
const colunaAlta = document.querySelector("#pAlta .blocoMeta");
const xpTexto = document.querySelector(".xp-texto");
const barraXp = document.querySelector(".barraXp");

let xpAtual = 0;
const xpMaximo = 500;
const xpPorMeta = 50;

function criarCartaoMeta(titulo, prazo) {
  const cartao = document.createElement("div");
  cartao.classList.add("cartaoMeta");

  const textoPrazo = prazo ? `Prazo: ${prazo}` : "Sem prazo definido";

  cartao.innerHTML = `
        <div class="cartao-info">
            <h3 class="titulo-meta">${titulo}</h3>
            <p class="prazo-meta">${textoPrazo}</p>
        </div>
        
        <div class="cartao-acoes flex-coluna">
            <button class="btn-acao btn-concluir">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#4ade80" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="#4ade80" stroke="none"></circle><polyline points="9 12 11 14 15 10"></polyline></svg>
            </button>
            <button class="btn-acao btn-deletar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        </div>
    `;

  const btnConcluir = cartao.querySelector(".btn-concluir");
  const btnDeletar = cartao.querySelector(".btn-deletar");

  btnConcluir.addEventListener("click", () => {
    adicionarXP(xpPorMeta);
    cartao.remove();
  });

  btnDeletar.addEventListener("click", () => {
    cartao.remove();
  });

  return cartao;
}

function adicionarXP(quantidade) {
  xpAtual += quantidade;

  if (xpAtual > xpMaximo) {
    xpAtual = xpMaximo;
  }

  xpTexto.innerText = `${xpAtual} / ${xpMaximo} XP`;
  const porcentagem = (xpAtual / xpMaximo) * 100;
  barraXp.style.width = `${porcentagem}%`;
}

btnNovaMeta.addEventListener("click", () => {
  const titulo = prompt("Qual é o nome da meta?");
  if (!titulo) return;

  const prazo = prompt(
    "Qual é o prazo? (Ex: 25/02/2026)\nPode deixar em branco se não tiver data.",
  );

  const novoCartao = criarCartaoMeta(titulo, prazo);
  if (colunaAlta) {
    colunaAlta.appendChild(novoCartao);
  } else {
    alert(
      "Erro: A div class='blocoMeta' não foi encontrada dentro da Prioridade Alta no seu HTML.",
    );
  }
});
