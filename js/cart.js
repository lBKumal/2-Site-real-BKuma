/* =====================================================================
   cart.js — Carrinho de compras (camada de dados)
   Guarda apenas [{ id, qty }] no localStorage (chave "musclex_cart").
   Nome, preço e imagem vêm sempre de data.js (PRODUCTS).
   Todos os cálculos são feitos em centavos para evitar erros de decimal.
   ===================================================================== */

const Cart = (function () {
  const KEY = "musclex_cart";

  function read() {
    try {
      const itens = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(itens) ? itens : [];
    } catch (e) { return []; }
  }

  function write(itens) {
    try { localStorage.setItem(KEY, JSON.stringify(itens)); } catch (e) {}
    document.dispatchEvent(new CustomEvent("cart:changed"));
  }

  function add(id, qty) {
    if (!getProduct(id)) return;
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const itens = read();
    const existente = itens.find((i) => i.id === id);
    if (existente) existente.qty = Math.min(99, existente.qty + qty);
    else itens.push({ id: id, qty: Math.min(99, qty) });
    write(itens);
  }

  function setQty(id, qty) {
    qty = parseInt(qty, 10);
    if (!qty || qty < 1) return remove(id);
    write(read().map((i) => (i.id === id ? { id: id, qty: Math.min(99, qty) } : i)));
  }

  function remove(id) { write(read().filter((i) => i.id !== id)); }
  function clear() { write([]); }

  /* Linhas completas: produto + quantidade + subtotal da linha */
  function lines() {
    return read()
      .map((i) => {
        const produto = getProduct(i.id);
        if (!produto) return null;
        const subtotal = (Math.round(produto.preco * 100) * i.qty) / 100;
        return { id: produto.id, nome: produto.nome, imagem: produto.imagem, preco: produto.preco, moeda: produto.moeda, qty: i.qty, subtotal: subtotal };
      })
      .filter(Boolean);
  }

  function count() { return lines().reduce((t, l) => t + l.qty, 0); }

  function subtotal() {
    return lines().reduce((t, l) => t + Math.round(l.subtotal * 100), 0) / 100;
  }

  function shipping() {
    const sub = subtotal();
    if (sub === 0 || sub >= CONFIG.frete.gratisAcima) return 0;
    return CONFIG.frete.valor;
  }

  function total() { return Math.round((subtotal() + shipping()) * 100) / 100; }

  return { add, setQty, remove, clear, lines, count, subtotal, shipping, total };
})();
