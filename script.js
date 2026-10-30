"use strict";

const NUMERO_WHATSAPP = "5583900000000";

const imoveis = [
  {
    id: 1,
    titulo: "Casa branca com vista para o mar em Cabo Branco",
    descricao: "Casa em bairro nobre com vista para o mar.",
    preco: 500000,
    quartos: 3,
    vagas: 2,
    areaConstruida: 150,
    bairro: "Cabo Branco",
    cidade: "João Pessoa",
    imagem: "casa.jpg",
    altImagem: "Casa branca com fachada moderna e duas vagas de garagem",
    vendido: true,
  },
  {
    id: 2,
    titulo: "Casa branca com vista para o mar em Cabo Branco",
    descricao: "Casa em bairro nobre com vista para o mar.",
    preco: 450000,
    quartos: 3,
    vagas: 2,
    areaConstruida: 150,
    bairro: "Cabo Branco",
    cidade: "João Pessoa",
    imagem: "casa.jpg",
    altImagem: "Casa branca com fachada moderna e duas vagas de garagem",
    vendido: false,
  },
  {
    id: 3,
    titulo: "Casa branca com vista para o mar em Cabo Branco",
    descricao: "Casa em bairro nobre com vista para o mar.",
    preco: 350000,
    quartos: 3,
    vagas: 2,
    areaConstruida: 150,
    bairro: "Cabo Branco",
    cidade: "João Pessoa",
    imagem: "casa.jpg",
    altImagem: "Casa branca com fachada moderna e duas vagas de garagem",
    vendido: false,
  },
];

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function criarlinkwhatsapp(imovel) {
  const mensagem = `Olá, tenho interesse na casa: ${imovel.titulo}`;
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

function criarCard(imovel, indice) {
  const card = criarElemento("article", "card-imovel");

  const imagem = document.createElement("img");
  imagem.src = imovel.imagem;
  imagem.alt = imovel.altImagem;
  imagem.width = 800;
  imagem.height = 600;
  if (indice > 0) imagem.loading = "lazy";

  const conteudo = criarElemento("div", "card-conteudo");

  const titulo = criarElemento("h3", "", imovel.titulo);
  const preco = criarElemento(
    "p",
    "preco",
    formatadorMoeda.format(imovel.preco),
  );
  const descricao = criarElemento("p", "", imovel.descricao);

  const detalhes = document.createElement("ul");
  const textoQuartos = imovel.quartos === 1 ? "quarto" : "quartos";
  const textoVagas = imovel.vagas === 1 ? "vaga" : "vagas";
  const itens = [
    `${imovel.quartos} ${textoQuartos}`,
    `${imovel.vagas} ${textoVagas}`,
    `${imovel.areaConstruida} m² de área construída`,
    `${imovel.bairro}, ${imovel.cidade}`,
  ];

  for (const texto of itens) {
    detalhes.appendChild(criarElemento("li", "", texto));
  }

  const botao = criarElemento("a", "botao-contato", "Tenho interesse");
  botao.href = criarlinkwhatsapp(imovel);
  botao.target = "_blank";
  botao.rel = "noopener noreferrer";
  botao.setAttribute(
    "aria-label",
    `Tenho interesse nessa casa: ${imovel.titulo} (abre o Whatsapp em outra aba)`,
  );

  conteudo.append(titulo, preco, descricao, detalhes, botao);
  card.append(imagem, conteudo);
  return card;
}

function renderizarImoveis(lista) {
  const container = document.querySelector(".lista-imoveis");
  if (!container) return;

  const disponiveis = lista.filter((imovel) => !imovel.vendido);

  container.replaceChildren();

  if (disponiveis.length === 0) {
    container.appendChild(
      criarElemento("p", "", "Nenhuma casa disponível no momento."),
    );
    return;
  }

  const fragmento = document.createDocumentFragment();
  disponiveis.forEach((imovel, indice) => {
    fragmento.appendChild(criarCard(imovel, indice));
  });
  container.appendChild(fragmento);
}

function atualizarAno() {
  const elementoAno = document.getElementById("ano");
  if (elementoAno) elementoAno.textContent = new Date().getFullYear();
}

atualizarAno();
renderizarImoveis(imoveis);
