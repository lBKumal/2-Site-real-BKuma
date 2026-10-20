/* =====================================================================
   main.js — Renderização de Planos e Loja a partir de data.js,
   página de detalhe do produto e botão "Adicionar ao carrinho".
   Cada bloco só roda se o elemento correspondente existir na página.
   ===================================================================== */

/* Mensagem rápida na parte inferior da tela */
function showToast(mensagem) {
  const el = document.querySelector(".toast");
  if (!el) return;
  el.textContent = mensagem;
  el.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { el.hidden = true; }, 2500);
}

/* ---------- Planos ---------- */
function condicoesDoPlano(plano) {
  if (plano.meses === 1) return "Sem fidelidade. Cancele quando quiser.";
  const periodo = plano.meses === 12 ? "ano" : plano.meses + " meses";
  return "Cobrança de " + formatBRL(plano.preco * plano.meses) + " por " + periodo + " (valores demonstrativos).";
}

function cartaoPlano(plano) {
  return `
  <article class="plano${plano.destaque ? " destaque" : ""}" data-plan-id="${plano.id}">
    ${plano.destaque ? '<span class="selo">Mais escolhido</span>' : ""}
    <h3>${plano.nome}</h3>
    <p class="preco">${formatBRL(plano.preco)}<small>/mês</small></p>
    <p class="condicoes">${condicoesDoPlano(plano)}</p>
    <ul>${plano.beneficios.map((b) => `<li>${b}</li>`).join("")}</ul>
    <a class="btn btn-primario" href="matricula.html?plano=${plano.id}">Quero este plano</a>
  </article>`;
}

const gradePlanos = document.getElementById("plans-grid");
if (gradePlanos) gradePlanos.innerHTML = PLANS.map(cartaoPlano).join("");

/* ---------- Loja ---------- */
function cartaoProduto(p) {
  return `
  <article class="produto" data-product-id="${p.id}">
    <a href="produto.html?id=${p.id}"><img src="${p.imagem}" alt="${p.nome}" width="240" height="240" loading="lazy"></a>
    <div class="produto-info">
      <h3><a href="produto.html?id=${p.id}">${p.nome}</a></h3>
      <p>${p.descricao}</p>
      <p class="preco-produto">${formatBRL(p.preco)}</p>
      <button class="btn btn-primario" type="button" data-add-to-cart="${p.id}">Adicionar ao carrinho</button>
    </div>
  </article>`;
}

const gradeLoja = document.getElementById("products-grid");
if (gradeLoja) {
  const filtros = document.getElementById("category-filters");
  let categoria = "todos";
  const desenhar = () => {
    const lista = PRODUCTS.filter((p) => categoria === "todos" || p.categoria === categoria);
    gradeLoja.innerHTML = lista.map(cartaoProduto).join("");
  };
  filtros.innerHTML = CATEGORIES.map(
    (c) => `<button type="button" data-category="${c.id}" aria-pressed="${c.id === categoria}">${c.nome}</button>`
  ).join("");
  filtros.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-category]");
    if (!botao) return;
    categoria = botao.dataset.category;
    filtros.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === botao));
    desenhar();
  });
  desenhar();
}

/* Destaques na Home */
const destaques = document.getElementById("featured-products");
if (destaques) destaques.innerHTML = PRODUCTS.slice(0, 3).map(cartaoProduto).join("");

/* ---------- Detalhe do produto (produto.html?id=...) ---------- */
const detalhe = document.getElementById("product-detail");
if (detalhe) {
  const p = getProduct(new URLSearchParams(location.search).get("id"));
  if (!p) {
    detalhe.innerHTML = '<p class="vazio-msg">Produto não encontrado. <a href="loja.html">Voltar para a loja</a>.</p>';
  } else {
    document.title = p.nome + " — MuscleX";
    detalhe.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" width="480" height="480">
      <div>
        <p class="migalha"><a href="loja.html">Loja</a> / ${p.nome}</p>
        <h1>${p.nome}</h1>
        <p class="preco-produto grande">${formatBRL(p.preco)}</p>
        <p>${p.descricao}</p>
        <ul class="lista-check">${p.detalhes.map((d) => `<li>${d}</li>`).join("")}</ul>
        <div class="linha-qtd">
          <label for="qtd">Quantidade</label>
          <input id="qtd" type="number" min="1" max="99" value="1" inputmode="numeric">
        </div>
        <button class="btn btn-primario" type="button" data-add-to-cart="${p.id}">Adicionar ao carrinho</button>
        <a class="btn btn-contorno" href="carrinho.html">Ver carrinho</a>
      </div>`;
  }
}

/* ---------- Botão "Adicionar ao carrinho" (vale para qualquer página) ---------- */
document.addEventListener("click", (e) => {
  const botao = e.target.closest("[data-add-to-cart]");
  if (!botao) return;
  const campoQtd = document.getElementById("qtd");
  const qtd = campoQtd ? campoQtd.value : 1;
  Cart.add(botao.dataset.addToCart, qtd);
  showToast("Produto adicionado ao carrinho.");
});
