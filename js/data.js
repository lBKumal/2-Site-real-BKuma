/* =====================================================================
   data.js — ÚNICA FONTE DE DADOS DO SITE
   Edite aqui: marca, frete, planos, produtos, preços e imagens.
   Todo o resto do site (Home, Planos, Loja, Carrinho, Checkout,
   Confirmação) lê os dados deste arquivo.
   ===================================================================== */

const CONFIG = {
  marca: "MuscleX",
  moeda: "BRL",                       // código da moeda usado em produtos e pedidos
  whatsapp: "5500000000000",          // número demonstrativo (DDI+DDD+número)
  frete: { valor: 15.0, gratisAcima: 150.0 }, // frete fixo demonstrativo
  contato: {
    email: "contato@musclex.exemplo",
    telefone: "(00) 0000-0000",
    endereco: "Av. Exemplo, 1000 — Centro, Cidade/UF (endereço demonstrativo)",
    horario: "Seg a sex: 5h às 23h · Sáb e dom: 8h às 16h"
  }
};

/* Planos — para alterar preço, edite "preco" (valor por mês) e "meses".
   O total da cobrança é calculado automaticamente (preco x meses). */
const PLANS = [
  {
    id: "plano-mensal", nome: "Mensal", preco: 109.9, meses: 1, destaque: false,
    beneficios: ["Musculação ilimitada", "Avaliação física inicial", "Acesso ao app de treinos", "Sem taxa de adesão"]
  },
  {
    id: "plano-trimestral", nome: "Trimestral", preco: 99.9, meses: 3, destaque: true,
    beneficios: ["Tudo do plano Mensal", "Aulas coletivas inclusas", "1 convidado por mês", "Reavaliação física"]
  },
  {
    id: "plano-anual", nome: "Anual", preco: 79.9, meses: 12, destaque: false,
    beneficios: ["Tudo do plano Trimestral", "Kit camiseta MuscleX", "Armário fixo", "Prioridade nas aulas"]
  }
];

/* Produtos — "id" deve ser único e não mudar depois de definido.
   categoria: "vestuario" ou "suplementos". Imagem em assets/img/. */
const CATEGORIES = [
  { id: "todos", nome: "Todos" },
  { id: "vestuario", nome: "Vestuário" },
  { id: "suplementos", nome: "Suplementos e alimentação" }
];

const PRODUCTS = [
  { id: "camiseta-preta",   nome: "Camiseta MuscleX Preta",   categoria: "vestuario",   preco: 79.9,  moeda: "BRL", imagem: "assets/img/produto-camiseta-preta.svg",
    descricao: "Camiseta preta de algodão com a logo MuscleX no peito.",
    detalhes: ["Algodão penteado", "Caimento reto", "Tamanhos P ao GG (demonstrativo)"] },
  { id: "camiseta-amarela", nome: "Camiseta MuscleX Amarela", categoria: "vestuario",   preco: 79.9,  moeda: "BRL", imagem: "assets/img/produto-camiseta-amarela.svg",
    descricao: "Camiseta amarela com a logo MuscleX em preto.",
    detalhes: ["Algodão penteado", "Caimento reto", "Tamanhos P ao GG (demonstrativo)"] },
  { id: "camiseta-branca",  nome: "Camiseta MuscleX Branca",  categoria: "vestuario",   preco: 79.9,  moeda: "BRL", imagem: "assets/img/produto-camiseta-branca.svg",
    descricao: "Camiseta branca com a logo MuscleX em preto.",
    detalhes: ["Algodão penteado", "Caimento reto", "Tamanhos P ao GG (demonstrativo)"] },
  { id: "whey-chocolate",   nome: "Whey Protein Chocolate 900 g", categoria: "suplementos", preco: 149.9, moeda: "BRL", imagem: "assets/img/produto-whey-chocolate.svg",
    descricao: "Whey protein demonstrativo sabor chocolate, pote de 900 g.",
    detalhes: ["Produto fictício", "Sabor chocolate", "Pote de 900 g"] },
  { id: "whey-baunilha",    nome: "Whey Protein Baunilha 900 g", categoria: "suplementos", preco: 149.9, moeda: "BRL", imagem: "assets/img/produto-whey-baunilha.svg",
    descricao: "Whey protein demonstrativo sabor baunilha, pote de 900 g.",
    detalhes: ["Produto fictício", "Sabor baunilha", "Pote de 900 g"] },
  { id: "barrinhas-proteina", nome: "Barrinhas de Proteína (caixa com 12)", categoria: "suplementos", preco: 89.9, moeda: "BRL", imagem: "assets/img/produto-barrinhas-proteina.svg",
    descricao: "Caixa demonstrativa com 12 barrinhas de proteína.",
    detalhes: ["Produto fictício", "Caixa com 12 unidades", "Sabores sortidos"] }
];

/* ---------- Funções utilitárias compartilhadas ---------- */
const formatBRL = (valor) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

const getProduct = (id) => PRODUCTS.find((p) => p.id === id) || null;
const getPlan = (id) => PLANS.find((p) => p.id === id) || null;
