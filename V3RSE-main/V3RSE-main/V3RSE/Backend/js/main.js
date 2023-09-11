// Obtém uma referência ao elemento HTML com o ID "filmes"
const ElementoParaInserirFilmes = document.getElementById("filmes");

// Declara uma array vazia para armazenar os filmes favoritos
export const listaDeFavoritos = [];

// Função que insere os filmes na tela
function InserirFilmesNaTela(filmes) {
  // Limpa o conteúdo do elemento "filmes"
  ElementoParaInserirFilmes.innerHTML = "";

  // Itera sobre a array de filmes
  filmes.forEach((movie) => {
    // Extrai informações do filme
    const movieId = movie.id;
    const title = movie.title;
    const releaseYear = movie.release_date.split("-")[0];
    const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const rating = movie.vote_average.toFixed(1);
    const overview = movie.overview;

    // Cria um elemento "section" para representar um card de filme
    const section = document.createElement("section");
    section.className = "cards"; // Define a classe CSS do card
    section.dataset.movieId = movieId; // Armazena o ID do filme como um atributo de dados

    // Cria a primeira parte do card
    const parte1 = document.createElement("div");
    parte1.className = "cards__parte1";

    // Cria uma imagem para a capa do filme
    const img = document.createElement("img");
    img.src = posterPath; // Define a imagem do cartaz
    img.alt = "Capa"; // Define um texto alternativo para a imagem
    img.className = "cards__parte1-capa"; // Define a classe CSS da imagem

    // Adiciona a imagem à primeira parte do card
    parte1.appendChild(img);
    section.appendChild(parte1);

    // Cria a segunda parte do card
    const parte2 = document.createElement("div");
    parte2.className = "cards__parte2";

    // Cria um título para o filme
    const titulo = document.createElement("h2");
    titulo.className = "cards__parte2-titulo";
    titulo.textContent = `${title} (${releaseYear})`;

    // Cria uma seção para detalhes, incluindo a classificação
    const details = document.createElement("div");
    details.className = "cards__parte2-details";

    // Cria um ícone de classificação
    const ratingDiv = document.createElement("div");
    ratingDiv.className = "cards_parte2-stars"
    const ratingImg = document.createElement("img");
    ratingImg.src = "../src/Star.svg"; // Ícone de estrela
    ratingImg.alt = "star";
    ratingImg.className = "cards__parte2-icon";

    // Cria um texto para exibir a classificação
    const ratingText = document.createElement("h2");
    ratingText.className = "cards__parte2-text";
    ratingText.textContent = rating;

    // Adiciona o ícone e o texto de classificação à seção de detalhes
    ratingDiv.appendChild(ratingImg);
    ratingDiv.appendChild(ratingText);
    details.appendChild(ratingDiv);

    // Cria um elemento para favoritar o filme
    const favoriteDiv = document.createElement("div");
    favoriteDiv.className = "cards_parte2-favorite"
    const favoriteCheckbox = document.createElement("input");
    favoriteCheckbox.type = "checkbox"; // Cria uma caixa de seleção
    favoriteCheckbox.className = "cards__parte2-checkbox";

    // Verifica se o filme já está na lista de favoritos e marca a caixa de seleção, se necessário
    if (listaDeFavoritos.includes(movieId)) {
      favoriteCheckbox.checked = true;
    }

    // Adiciona um ouvinte de evento para a caixa de seleção
    favoriteCheckbox.addEventListener("change", () => {
      if (favoriteCheckbox.checked) {
        // Adiciona o filme à lista de favoritos se a caixa estiver marcada
        if (!listaDeFavoritos.includes(movieId)) {
          listaDeFavoritos.push(movieId);
        }
      } else {
        // Remove o filme da lista de favoritos se a caixa estiver desmarcada
        const index = listaDeFavoritos.indexOf(movieId);
        if (index !== -1) {
          listaDeFavoritos.splice(index, 1);
        }
      }
      // Exibe a lista de filmes favoritos no console
      console.log("Favoritos:", listaDeFavoritos);
    });

    // Cria um texto para o botão de favoritar
    const favoriteText = document.createElement("h2");
    favoriteText.className = "cards__parte2-text";
    favoriteText.textContent = "Favoritar";

    // Adiciona a caixa de seleção e o texto de favoritar à seção de detalhes
    favoriteDiv.appendChild(favoriteCheckbox);
    favoriteDiv.appendChild(favoriteText);
    details.appendChild(favoriteDiv);

    // Adiciona o título e os detalhes à segunda parte do card
    parte2.appendChild(titulo);
    parte2.appendChild(details);
    section.appendChild(parte2);

    // Cria a terceira parte do card
    const parte3 = document.createElement("div");
    parte3.className = "cards__parte3";

    // Cria um parágrafo para exibir a sinopse do filme
    const texto = document.createElement("p");
    texto.className = "cards__parte3-texto";
    texto.textContent = overview;

    // Adiciona o parágrafo à terceira parte do card
    parte3.appendChild(texto);
    section.appendChild(parte3);

    // Adiciona o card completo ao elemento "filmes"
    ElementoParaInserirFilmes.appendChild(section);
  });
}

// Exporta a função "InserirFilmesNaTela" para uso em outros módulos
export { InserirFilmesNaTela };
