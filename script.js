const btnNovaMeta = document.querySelector(".btn-nova-meta");
const colunaAlta = document.querySelector("#pAlta .blocoMeta");
const colunaMedia = document.querySelector("#pMedia .blocoMeta");
const colunaBaixa = document.querySelector("#pBaixa .blocoMeta");
const xpTexto = document.querySelector(".xp-texto");
const barraXp = document.querySelector(".barraXp");

let xpAtual = 0;
const xpMaximo = 500;
const xpPorMeta = 50;

function criarCartaoMeta(titulo, prazo, prioridade) {
  const cartao = document.createElement("div");
  cartao.classList.add("cartaoMeta");

  if (prioridade === "2") cartao.classList.add("prioridade-media");
  if (prioridade === "3") cartao.classList.add("prioridade-baixa");

  const textoPrazo = prazo ? `Prazo: ${prazo}` : "Sem prazo definido";

  cartao.innerHTML = `
        <div class="cartao-info">
            <h3 class="titulo-meta"></h3>
            <p class="prazo-meta"></p>
        </div>
        
        <div class="cartao-acoes flex-coluna">
            <button type="button" class="btn-acao btn-concluir">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#4ade80" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="#4ade80" stroke="none"></circle><polyline points="9 12 11 14 15 10"></polyline></svg>
            </button>
            <button type="button" class="btn-acao btn-deletar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        </div>
    `;

  cartao.querySelector(".titulo-meta").textContent = titulo;
  cartao.querySelector(".prazo-meta").textContent = textoPrazo;

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

btnNovaMeta.addEventListener("click", (e) => {
  e.preventDefault(); // Trava qualquer comportamento padrão que recarregue a tela

  let titulo = prompt("Qual é o nome da meta?");

  if (!titulo || titulo.trim() === "") return;
  titulo = titulo.trim();

  let prazo = prompt(
    "Qual é o prazo? (Ex: 25/02/2026)\nPode deixar em branco se não tiver data.",
  );
  if (prazo) prazo = prazo.trim();

  let prioridade = prompt(
    "Qual a prioridade da meta?\nDigite 1 para Alta\nDigite 2 para Média\nDigite 3 para Baixa",
  );

  if (prioridade !== "1" && prioridade !== "2" && prioridade !== "3") {
    alert("Opção inválida. A meta será criada como Prioridade Alta.");
    prioridade = "1";
  }

  const novoCartao = criarCartaoMeta(titulo, prazo, prioridade);

  if (prioridade === "1" && colunaAlta) {
    colunaAlta.appendChild(novoCartao);
  } else if (prioridade === "2" && colunaMedia) {
    colunaMedia.appendChild(novoCartao);
  } else if (prioridade === "3" && colunaBaixa) {
    colunaBaixa.appendChild(novoCartao);
  }
});
