/* =====================================================================
   layout.js — Cabeçalho e rodapé compartilhados por todas as páginas.
   Para mudar o menu ou o rodapé, edite apenas este arquivo.
   ===================================================================== */

(function () {
  const pagina = document.body.dataset.page || "";
  const link = (href, texto, chave) =>
    `<a href="${href}"${pagina === chave ? ' aria-current="page"' : ""}>${texto}</a>`;

  const header = `
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="MuscleX — página inicial"><img src="assets/img/logo.svg" alt="MuscleX" width="150" height="40"></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu">
        <span></span><span></span><span></span>
      </button>
      <nav id="menu-principal" class="menu" aria-label="Principal">
        ${link("index.html", "Início", "home")}
        ${link("planos.html", "Planos", "planos")}
        ${link("loja.html", "Loja", "loja")}
        ${link("faq.html", "Dúvidas", "faq")}
        ${link("contato.html", "Contato", "contato")}
        <a class="menu-carrinho" href="carrinho.html" aria-label="Carrinho">Carrinho <span class="badge" data-cart-count>0</span></a>
        <a class="btn btn-primario" href="matricula.html">Matricule-se</a>
      </nav>
    </div>
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <img src="assets/img/logo.svg" alt="MuscleX" width="150" height="40">
        <p>Site demonstrativo de uma academia fictícia, criado para estudo de desenvolvimento web e rastreamento.</p>
      </div>
      <div>
        <h3>Links úteis</h3>
        <ul>
          <li><a href="planos.html">Planos</a></li>
          <li><a href="loja.html">Loja</a></li>
          <li><a href="faq.html">Dúvidas frequentes</a></li>
          <li><a href="trabalhe-conosco.html">Trabalhe conosco</a></li>
          <li><a href="franqueado.html">Seja um franqueado</a></li>
        </ul>
      </div>
      <div>
        <h3>Contato</h3>
        <ul>
          <li>${CONFIG.contato.email}</li>
          <li>${CONFIG.contato.telefone}</li>
          <li>${CONFIG.contato.horario}</li>
        </ul>
      </div>
      <div>
        <h3>Redes sociais</h3>
        <ul>
          <li><a href="#" data-demo-link>Instagram (demonstrativo)</a></li>
          <li><a href="#" data-demo-link>Facebook (demonstrativo)</a></li>
          <li><a href="#" data-demo-link>YouTube (demonstrativo)</a></li>
        </ul>
      </div>
    </div>
    <p class="footer-nota container">© 2026 MuscleX — projeto fictício e demonstrativo. Nenhum dado real é coletado.</p>
  </footer>
  <a class="whatsapp-flutuante" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
  <div class="toast" role="status" aria-live="polite" hidden></div>`;

  document.getElementById("site-header").innerHTML = header;
  document.getElementById("site-footer").innerHTML = footer;

  /* Menu mobile */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-principal");
  toggle.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    toggle.setAttribute("aria-expanded", aberto);
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  /* Links de redes sociais demonstrativos não navegam */
  document.querySelectorAll("[data-demo-link]").forEach((a) =>
    a.addEventListener("click", (e) => e.preventDefault())
  );

  /* Contador do carrinho no cabeçalho */
  function atualizarContador() {
    const n = Cart.count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = n;
      el.classList.toggle("vazio", n === 0);
    });
  }
  atualizarContador();
  document.addEventListener("cart:changed", atualizarContador);
})();
