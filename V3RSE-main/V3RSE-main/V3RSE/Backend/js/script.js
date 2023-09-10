import { InserirFilmesNaTela } from "./main.js";

export const apiKey = "9bbf7d734588f0a01ba0510c39e7e786";
let movies = [];

fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
)
  .then((response) => response.json())
  .then((data) => {
    movies = data.results.slice(0, 50); // Atribui o valor a movies, por exemplo (top 10 filmes populares)
    InserirFilmesNaTela(movies);
  })
  .catch((error) => {
    console.error("Ocorreu um erro ao obter os filmes populares:", error);
  });
