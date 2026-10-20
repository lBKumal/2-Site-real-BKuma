/* =====================================================================
   cart-page.js — Tela do carrinho (carrinho.html).
   Lê os itens com Cart.lines() e redesenha a cada alteração.
   ===================================================================== */

const areaCarrinho = document.getElementById("cart-page");

function desenharCarrinho() {
  const linhas = Cart.lines();
  if (linhas.length === 0) {
    areaCarrinho.innerHTML = `
      <div class="vazio-msg">
        <h2>Seu carrinho está vazio</h2>
        <p>Que tal conhecer os produtos da loja MuscleX?</p>
        <a class="btn btn-primario" href="loja.html">Ir para a loja</a>
      </div>`;
    return;
  }

  areaCarrinho.innerHTML = `
    <div class="carrinho-grid">
      <div class="carrinho-itens">
        ${linhas.map((l) => `
        <article class="item-carrinho" data-line-id="${l.id}">
          <img src="${l.imagem}" alt="${l.nome}" width="96" height="96">
          <div class="item-info">
            <h3>${l.nome}</h3>
            <p>${formatBRL(l.preco)} cada</p>
            <button class="link-remover" type="button" data-remove="${l.id}">Remover</button>
          </div>
          <div class="item-qtd">
            <button type="button" data-dec="${l.id}" aria-label="Diminuir quantidade de ${l.nome}">−</button>
            <input type="number" min="1" max="99" value="${l.qty}" data-qty="${l.id}" aria-label="Quantidade de ${l.nome}" inputmode="numeric">
            <button type="button" data-inc="${l.id}" aria-label="Aumentar quantidade de ${l.nome}">+</button>
          </div>
          <p class="item-subtotal">${formatBRL(l.subtotal)}</p>
        </article>`).join("")}
      </div>
      <aside class="resumo">
        <h2>Resumo</h2>
        <dl>
          <div><dt>Subtotal</dt><dd>${formatBRL(Cart.subtotal())}</dd></div>
          <div><dt>Frete</dt><dd>${Cart.shipping() === 0 ? "Grátis" : formatBRL(Cart.shipping())}</dd></div>
          <div class="total"><dt>Total</dt><dd>${formatBRL(Cart.total())}</dd></div>
        </dl>
        <p class="nota-pequena">Frete grátis acima de ${formatBRL(CONFIG.frete.gratisAcima)} (demonstrativo).</p>
        <a class="btn btn-primario" href="checkout.html">Finalizar pedido</a>
        <a class="btn btn-contorno" href="loja.html">Continuar comprando</a>
      </aside>
    </div>`;
}

areaCarrinho.addEventListener("click", (e) => {
  const t = e.target;
  const linha = (id) => Cart.lines().find((l) => l.id === id);
  if (t.dataset.remove) Cart.remove(t.dataset.remove);
  else if (t.dataset.inc) Cart.setQty(t.dataset.inc, linha(t.dataset.inc).qty + 1);
  else if (t.dataset.dec) Cart.setQty(t.dataset.dec, linha(t.dataset.dec).qty - 1);
});

areaCarrinho.addEventListener("change", (e) => {
  if (e.target.dataset.qty) Cart.setQty(e.target.dataset.qty, e.target.value);
});

document.addEventListener("cart:changed", desenharCarrinho);
desenharCarrinho();
