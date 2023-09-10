import { listaDeFavoritos } from "./main.js";
import { apiKey } from "./script.js";
import { InserirFilmesNaTela } from "./main.js";

const inputPesquisa = document.querySelector(".cabecalho__pesquisa-input");
inputPesquisa.addEventListener("input", pesquisarFilmes);

function pesquisarFilmes() {
  const searchTerm = inputPesquisa.value.trim();

  if (searchTerm !== "") {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchTerm}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        let movieIds = [];
        let movieList = [];

        const exactMatch = movies.find((movie) => movie.title === searchTerm); // Verifica se há um filme com título exato

        if (exactMatch) {
          movieIds.push(exactMatch.id); // Adiciona o ID do filme com título exato
          movieList.push(exactMatch); // Adiciona o filme à lista de filmes
        } else {
          movieIds = movies.map((movie) => movie.id); // Adiciona os IDs de todos os filmes correspondentes
          movieList = movies; // Define a lista de filmes como todos os filmes correspondentes
        }

        InserirFilmesNaTela(movieList);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao pesquisar filmes:", error);
      });
  } else {
    loadDefaultMovies();
  }
}

async function loadDefaultMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    const movies = data.results.slice(0, 50);
    InserirFilmesNaTela(movies);
  } catch (error) {
    console.error("Ocorreu um erro ao obter os filmes populares:", error);
  }
}

document.addEventListener("load", () => {
  getFilmesFavoritos();
});

async function getFilmesFavoritos() {
  if (listaDeFavoritos.length === 0) {
    document.getElementById("filmes").innerHTML = "";
    document.querySelector(".card__lista-vazia").style.display = "flex";
  } else {
    document.querySelector(".card__lista-vazia").style.display = "none";
    try {
      const filmes = [];
      for (const movieId of listaDeFavoritos) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
        );
        const movie = await response.json();
        filmes.push(movie);
      }
      InserirFilmesNaTela(filmes);
    } catch (error) {
      console.error("Ocorreu um erro ao obter detalhes dos filmes:", error);
    }
  }
}
