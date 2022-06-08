let message = "";
const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

const lugaresLista = [
  {
    id: 1,
    name: "MILFORD SOUND",
    img: "https://www.stokedforsaturday.com/stoked-content/uploads/2015/03/0W5A5526-640x427.jpg",
    pais: "Nova Zelândia",
    Informacoes:
      "Milford Sound é um dos lugares mais visitados da Nova Zelândia, recebendo quase um milhão de turistas por ano. A Nova Zelândia e o Chile são os únicos lugares no Hemisfério Sul onde fiordes podem ser vistos.",
    atracoes: ["Passeios de barco", " Curtir a praia"],
  },
  {
    id: 2,
    name: "HALONG BAY",
    img: "https://a.cdn-hotels.com/gdcs/production77/d1902/21336448-81d8-4643-a1b9-1545d08172de.jpg",
    pais: "Vietnã",
    Informacoes:
      "Halong Bay é um destino imperdível no Vietnã e não pode ficar de fora do roteiro de quem visita o país. Declarada Patrimônio Mundial da UNESCO, Halong Bay está presente na lista das 7 Maravilhas da Natureza.",
    atracoes: ["Passeios de barco", " Mergulho"],
  },
  {
    id: 3,
    name: "CINQUE TERRE",
    img: "https://images.memphistours.com/large/1688cfe359e9fa3f5f2f8cdf0101faf9.jpg",
    pais: "Itália",
    Informacoes:
      "Cerca de 100 quilômetros a sudeste de Gênova, pertinho de La Spezia, um dos tesouros da Itália brilha à beira do Mar da Ligúria. As maravilhas de Cinque Terre são imperdíveis em cada cantinho.",
    atracoes: ["Gastronomia Lugar", " Curtir o mirante"],
  },
  {
    id: 4,
    name: "MONTE RORAIMA",
    img: "https://freeway.tur.br/userfiles/175118107.jpg",
    pais: "Venezuela",
    Informacoes:
      " Destino certo dos aventureiros que apreciam a natureza a cerca de Mil metros de altura. O Monte Roraima está Lugarizado na tríplice fronteira da Guiana, Venezuela e Brasil. É dividido da seguinte maneira: 5% de sua área pertence ao Brasil, 10% a Guiana e 85% Venezuela.",
    atracoes: ["Caminhar", " Curtir o mirante"],
  },
  {
    id: 5,
    name: "PARIS",
    img: "https://www.conexaoparis.com.br/wp-content/uploads/2019/01/shutterstock_1248415558.jpg",
    pais: "França",

    Informacoes:
      "Destino certo dos aventureiros que apreciam a natureza a cerca de Mil metros de altura. O Monte Roraima está Lugarizado na tríplice fronteira da Guiana, Venezuela e Brasil. É dividido da seguinte maneira: 5% de sua área pertence ao Brasil, 10% a Guiana e 85% Venezuela.",
    atracoes: ["Gastronomia Lugar", " Visitar a Torre Eifell"],
  },
  {
    id: 6,
    name: "AMAZONIA",
    img: "https://brazillab.princeton.edu/sites/brazillab/files/styles/pwds_media_xxlarge_no_crop/public/pages/_b4u9169-1600.jpg?itok=2AFeSMqh",
    pais: "Brasil",
    Informacoes:
      "A Amazônia compreende um conjunto de ecossistemas que envolve a bacia hidrográfica do Rio Amazonas, bem como a Floresta Amazônica; é considerada a região de maior biodiversidade do planeta e o maior bioma do Brasil. Não é exclusivamente brasileira, sendo, portanto, encontrada em outros países.",
    atracoes: ["Passeios de barco", " Visita a Floresta"],
  },
  {
    id: 7,
    name: "NOVA YORK",
    img: "https://www.lauraperuchi.com/wp-content/uploads/2020/06/jermaine-ee-A2CChTZvzTE-unsplash.jpg",
    pais: "Estados Unidos",
    Informacoes:
      "A cidade de Nova York é uma das maiores cidades e maior centro financeiro e comercial do mundo. A capital do Estado de Nova York é Albany, uma cidade relativamente pequena se considerarmos o fato da mesma possuir menos de 100.000 habitantes.",
    atracoes: ["Walking tour", " Passeio gastronomico"],
  },
];

let lugar = undefined;

// Rotas
app.get("/", (req, res) => {
  res.render("index", { lugaresLista, lugar, message });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro", { lugaresLista, lugar });
});

app.get("/detalhes/:id", (req, res) => {
  const lugarAtual = lugaresLista.filter(
    (element) => element.id == req.params.id
  );
  res.render("detalhes.ejs", {
    lugarAtual,
  });
});

app.get("/atualiza/:id", (req, res) => {
  const id = +req.params.id;
  lugar = lugaresLista.find((lugar) => lugar.id == id);
  res.render("cadastro.ejs", { lugaresLista, lugar });
});

app.post("/cadastro", (req, res) => {
  const lugar = req.body;
  lugar.id = lugaresLista.length + 1;
  lugaresLista.push(lugar);
  message = "Lugar Cadastrado com SUCESSO!";
  res.redirect("/");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const novoLugar = req.body;
  novoLugar.id = id + 1;
  lugaresLista[id] = novoLugar;
  lugar = undefined;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete lugaresLista[id];
  message = "Lugar deletado do catálogo!";
  res.redirect("/#principal");
});
