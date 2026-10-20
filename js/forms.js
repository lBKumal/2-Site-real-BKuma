/* =====================================================================
   forms.js — Validação básica e envio DEMONSTRATIVO dos formulários.
   Nenhum dado é enviado ou salvo. Em produção seria preciso integrar
   um serviço (Formspree, Netlify Forms, EmailJS) ou um backend.
   Formulários com atributo data-demo-form usam este arquivo.
   O checkout usa FormValidator.validate() em checkout.js.
   ===================================================================== */

const FormValidator = {
  mensagem(campo) {
    const valor = campo.value.trim();
    if (campo.required && !valor) return "Preencha este campo.";
    if (campo.type === "email" && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Informe um e-mail válido.";
    if (campo.type === "tel" && valor) {
      const digitos = valor.replace(/\D/g, "");
      if (digitos.length < 10 || digitos.length > 11) return "Informe telefone com DDD (10 ou 11 dígitos).";
    }
    if (campo.dataset.min && valor.length < Number(campo.dataset.min)) return "Escreva pelo menos " + campo.dataset.min + " caracteres.";
    return "";
  },

  mostrarErro(campo, texto) {
    const grupo = campo.closest(".campo");
    if (!grupo) return;
    let erro = grupo.querySelector(".erro");
    if (!erro) {
      erro = document.createElement("small");
      erro.className = "erro";
      erro.id = campo.id + "-erro";
      grupo.appendChild(erro);
    }
    erro.textContent = texto;
    campo.setAttribute("aria-invalid", texto ? "true" : "false");
    campo.setAttribute("aria-describedby", erro.id);
  },

  /* Retorna true se todos os campos estão válidos */
  validate(form) {
    let primeiroInvalido = null;
    form.querySelectorAll("input, select, textarea").forEach((campo) => {
      if (campo.disabled) return;
      const texto = this.mensagem(campo);
      this.mostrarErro(campo, texto);
      if (texto && !primeiroInvalido) primeiroInvalido = campo;
    });
    if (primeiroInvalido) primeiroInvalido.focus();
    return !primeiroInvalido;
  }
};

/* Formulários demonstrativos: valida, esconde o formulário e mostra sucesso */
document.querySelectorAll("form[data-demo-form]").forEach((form) => {
  form.setAttribute("novalidate", "");

  /* Pré-seleciona o plano vindo de planos.html?plano=... */
  const selectPlano = form.querySelector("#plano");
  if (selectPlano) {
    selectPlano.innerHTML = '<option value="">Selecione</option>' +
      PLANS.map((p) => `<option value="${p.id}">${p.nome} — ${formatBRL(p.preco)}/mês</option>`).join("");
    const doUrl = new URLSearchParams(location.search).get("plano");
    if (getPlan(doUrl)) selectPlano.value = doUrl;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!FormValidator.validate(form)) return;
    form.reset();
    form.hidden = true;
    const sucesso = document.getElementById("form-sucesso");
    sucesso.hidden = false;
    sucesso.focus();
  });
});
