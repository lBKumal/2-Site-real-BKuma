/* =====================================================================
   checkout.js — Checkout simulado (checkout.html) e confirmação
   (confirmacao.html). NÃO há pagamento real.

   Fluxo do pedido:
   1. checkout.html valida o formulário e monta o objeto do pedido.
   2. O pedido é salvo em localStorage ("musclex_orders") com um ID único.
   3. O carrinho é esvaziado e o usuário vai para confirmacao.html?pedido=ID.
   4. confirmacao.html apenas LÊ o pedido salvo. Atualizar a página não
      cria um novo pedido nem conclui o mesmo pedido outra vez.

   Estrutura do pedido:
   { orderId, currency, createdAt, items:[{id,name,price,qty,subtotal}],
     subtotal, shipping, total, paymentMethod }
   (nome, e-mail e endereço digitados NÃO são salvos.)
   ===================================================================== */

const ORDERS_KEY = "musclex_orders";

function lerPedidos() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || {}; } catch (e) { return {}; }
}

function gerarIdPedido() {
  const data = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const aleatorio = Math.random().toString(36).slice(2, 8).toUpperCase();
  return "MX-" + data + "-" + aleatorio;
}

/* ---------- checkout.html ---------- */
const formCheckout = document.getElementById("checkout-form");
if (formCheckout) {
  const resumo = document.getElementById("checkout-summary");

  /* Carrinho vazio: não há o que finalizar */
  if (Cart.lines().length === 0) {
    location.replace("carrinho.html");
  } else {
    const linhas = Cart.lines();
    resumo.innerHTML = `
      <h2>Seu pedido</h2>
      <ul class="resumo-lista">
        ${linhas.map((l) => `<li><span>${l.qty} × ${l.nome}</span><span>${formatBRL(l.subtotal)}</span></li>`).join("")}
      </ul>
      <dl>
        <div><dt>Subtotal</dt><dd>${formatBRL(Cart.subtotal())}</dd></div>
        <div><dt>Frete</dt><dd>${Cart.shipping() === 0 ? "Grátis" : formatBRL(Cart.shipping())}</dd></div>
        <div class="total"><dt>Total</dt><dd>${formatBRL(Cart.total())}</dd></div>
      </dl>`;

    let enviando = false; // evita clique duplo
    formCheckout.addEventListener("submit", (e) => {
      e.preventDefault();
      if (enviando || !FormValidator.validate(formCheckout)) return;
      const itens = Cart.lines();
      if (itens.length === 0) return;
      enviando = true;
      formCheckout.querySelector("button[type=submit]").disabled = true;

      const pedido = {
        orderId: gerarIdPedido(),
        currency: CONFIG.moeda,
        createdAt: new Date().toISOString(),
        items: itens.map((l) => ({ id: l.id, name: l.nome, price: l.preco, qty: l.qty, subtotal: l.subtotal })),
        subtotal: Cart.subtotal(),
        shipping: Cart.shipping(),
        total: Cart.total(),
        paymentMethod: formCheckout.elements["pagamento"].value
      };

      const pedidos = lerPedidos();
      pedidos[pedido.orderId] = pedido;
      try { localStorage.setItem(ORDERS_KEY, JSON.stringify(pedidos)); } catch (err) {}
      Cart.clear();
      location.href = "confirmacao.html?pedido=" + encodeURIComponent(pedido.orderId);
    });
  }
}

/* ---------- confirmacao.html ---------- */
const areaConfirmacao = document.getElementById("order-confirmation");
if (areaConfirmacao) {
  const id = new URLSearchParams(location.search).get("pedido");
  const pedido = lerPedidos()[id];

  if (!pedido) {
    areaConfirmacao.innerHTML = `
      <div class="vazio-msg">
        <h2>Pedido não encontrado</h2>
        <p>Não localizamos este pedido de teste neste navegador.</p>
        <a class="btn btn-primario" href="loja.html">Voltar para a loja</a>
      </div>`;
  } else {
    const metodos = { cartao: "Cartão (demonstrativo)", pix: "Pix (demonstrativo)", boleto: "Boleto (demonstrativo)" };
    areaConfirmacao.innerHTML = `
      <div class="confirmacao">
        <p class="selo-ok">Pedido de teste concluído</p>
        <h1>Obrigado pela compra!</h1>
        <p>Número do pedido: <strong id="order-id">${pedido.orderId}</strong></p>
        <p class="nota-pequena">Nenhum pagamento foi realizado. Este é um ambiente demonstrativo.</p>
        <ul class="resumo-lista">
          ${pedido.items.map((i) => `<li><span>${i.qty} × ${i.name}</span><span>${formatBRL(i.subtotal)}</span></li>`).join("")}
        </ul>
        <dl>
          <div><dt>Subtotal</dt><dd>${formatBRL(pedido.subtotal)}</dd></div>
          <div><dt>Frete</dt><dd>${pedido.shipping === 0 ? "Grátis" : formatBRL(pedido.shipping)}</dd></div>
          <div class="total"><dt>Total (${pedido.currency})</dt><dd>${formatBRL(pedido.total)}</dd></div>
          <div><dt>Pagamento</dt><dd>${metodos[pedido.paymentMethod] || pedido.paymentMethod}</dd></div>
        </dl>
        <a class="btn btn-primario" href="loja.html">Continuar na loja</a>
      </div>`;
  }
}
