# MuscleX — site demonstrativo de academia

Site estático (HTML, CSS e JavaScript puros) de uma academia **fictícia**, feito para estudo de
desenvolvimento web e, depois, para você implementar GTM, GA4, Meta Pixel e conversões manualmente.

**O projeto não contém nenhum tracking**: sem GTM, GA4, Meta Pixel, dataLayer, analytics ou eventos de conversão.
Única requisição externa: fontes do Google Fonts (apenas visual).

## Estrutura

```
musclex/
├── index.html              Home
├── planos.html             Planos (cartões gerados de js/data.js)
├── faq.html                Dúvidas frequentes (blocos expansíveis)
├── contato.html            Contato + formulário + botão de WhatsApp
├── matricula.html          Formulário de matrícula (aceita ?plano=ID)
├── trabalhe-conosco.html   Formulário de candidatura
├── franqueado.html         Formulário de franquia
├── loja.html               Loja com categorias
├── produto.html            Detalhe do produto (?id=ID)
├── carrinho.html           Carrinho
├── checkout.html           Checkout simulado
├── confirmacao.html        Confirmação (?pedido=ID)
├── css/style.css           Estilos (cores em variáveis no topo)
├── js/data.js              Dados: marca, frete, planos, produtos
├── js/cart.js              Carrinho (dados e cálculos)
├── js/cart-page.js         Tela do carrinho
├── js/checkout.js          Checkout e confirmação
├── js/forms.js             Validação e envio demonstrativo
├── js/layout.js            Cabeçalho e rodapé compartilhados
├── js/main.js              Planos, loja, detalhe do produto, "adicionar ao carrinho"
└── assets/img/             Logo, ícone e imagens ilustrativas (SVG)
```

## Como executar

- Opção simples: abra `index.html` no navegador.
- Opção recomendada (comporta-se como o site publicado): na pasta do projeto, rode
  `python3 -m http.server 8000` e acesse `http://localhost:8000`.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub e envie **o conteúdo da pasta** (o `index.html` deve ficar na raiz do repositório).
2. Em **Settings → Pages**, em *Build and deployment*, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. Aguarde alguns minutos. O site ficará em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Todos os caminhos são relativos, então funcionam também em subpasta (como no endereço acima).

## Como editar

| O que | Onde |
|---|---|
| Nome da marca, frete, contatos, WhatsApp | `CONFIG` em `js/data.js` |
| Preços e benefícios dos planos | `PLANS` em `js/data.js` (o total é calculado: preço × meses) |
| Produtos, preços, descrições, imagens | `PRODUCTS` em `js/data.js` (o `id` deve ser único e não mudar) |
| Adicionar uma imagem de produto | coloque o arquivo em `assets/img/` e aponte o caminho em `imagem` |
| Cores | variáveis em `:root` no topo de `css/style.css` |
| Menu e rodapé | `js/layout.js` |
| Textos das páginas | no próprio `.html` |
| Fotos reais | troque os SVG (`hero.svg`, `espaco-*.svg`) por fotos, atualizando o `src` no HTML |

## Dados que o site gera (úteis para seus estudos de rastreamento)

- **Produto**: `id`, `nome`, `categoria`, `preco`, `moeda` (`BRL`).
- **Carrinho** (`localStorage`, chave `musclex_cart`): lista de `{ id, qty }`.
- **Pedido** (`localStorage`, chave `musclex_orders`): `orderId`, `currency`, `createdAt`, `items[{id,name,price,qty,subtotal}]`, `subtotal`, `shipping`, `total`, `paymentMethod`.
- **ID do pedido**: formato `MX-AAAAMMDD-XXXXXX`, gerado uma única vez no checkout.
- **Confirmação**: `confirmacao.html?pedido=ID` apenas lê o pedido salvo. Atualizar a página **não** cria nem conclui um novo pedido.

## Onde você vai inserir o tracking depois

Cada página tem seu próprio `<head>` e `<body>`; o snippet do GTM, por exemplo, deve ser colado nas 12 páginas `.html`.
Como cabeçalho e rodapé vêm de `js/layout.js`, o carrinho de `js/cart.js` e o pedido de `js/checkout.js`, esses são
bons pontos para localizar onde cada evento acontece.

## O que funcionaria só com backend ou serviço externo

- Envio real dos formulários (e-mail/CRM): Formspree, Netlify Forms, EmailJS ou backend próprio.
- Upload de currículo: armazenamento de arquivos (campo desativado nesta demonstração).
- Pagamento real, estoque e pedidos salvos em servidor.

## Testes manuais

**Navegação**
- [ ] Todos os links do menu e do rodapé abrem a página certa; o item atual fica destacado.
- [ ] O menu mobile abre e fecha (reduza a janela para menos de 900 px).
- [ ] Botões da Home levam a matrícula, planos, loja e contato.

**Planos e FAQ**
- [ ] Os 3 planos aparecem com preço e condições; cada botão abre `matricula.html` com o plano já selecionado.
- [ ] Os blocos do FAQ abrem e fecham.

**Formulários** (matrícula, trabalhe conosco, franqueado, contato)
- [ ] Enviar vazio mostra erros em cada campo.
- [ ] E-mail inválido e telefone com poucos dígitos são recusados.
- [ ] Preenchido corretamente, mostra a mensagem de sucesso demonstrativa.
- [ ] O campo de currículo aparece desativado.

**Loja e carrinho**
- [ ] Filtros de categoria mostram os produtos certos.
- [ ] "Ver detalhes" abre `produto.html?id=...` correto; um id inválido mostra mensagem.
- [ ] "Adicionar ao carrinho" atualiza o contador do cabeçalho.
- [ ] No carrinho: aumentar, diminuir, digitar quantidade e remover atualizam subtotais e total.
- [ ] Conferir: 3 camisetas (R$ 79,90) = R$ 239,70; frete grátis a partir de R$ 150,00.
- [ ] Recarregar ou navegar mantém os itens.
- [ ] Carrinho vazio mostra a mensagem e o botão para a loja.

**Checkout e confirmação**
- [ ] Abrir `checkout.html` com carrinho vazio redireciona para o carrinho.
- [ ] Enviar vazio mostra erros; preenchido, vai para a confirmação.
- [ ] A confirmação mostra ID `MX-...`, itens, frete, total e o aviso de demonstração.
- [ ] Atualizar a confirmação (F5) mantém o mesmo ID e não cria outro pedido.
- [ ] O carrinho fica vazio após o pedido; clicar duas vezes em "Concluir" gera um único pedido.

**Layout**
- [ ] Confira em 360 px, 768 px e desktop: sem rolagem lateral, textos legíveis.
