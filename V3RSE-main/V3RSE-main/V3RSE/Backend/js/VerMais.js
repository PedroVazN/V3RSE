// Importe a função InserirFilmesNaTela do módulo "./main.js"
import { InserirFilmesNaTela } from "./main.js";

// Defina sua chave de API como uma constante
export const apiKey = "9bbf7d734588f0a01ba0510c39e7e786";

// Inicialize uma matriz vazia chamada "movies" para armazenar os filmes populares
let movies = [];

// Faça uma solicitação à API do TMDb para obter os filmes populares
fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
)
  .then((response) => response.json())
  .then((data) => {
    // Após receber os dados da API, pegue os resultados (filmes populares)
    movies = data.results.slice(0, 50); // Exemplo: limite para os top 50 filmes populares

    // Chame a função InserirFilmesNaTela para inserir os filmes na tela
    InserirFilmesNaTela(movies);
  })
  .catch((error) => {
    // Em caso de erro, registre o erro no console
    console.error("Ocorreu um erro ao obter os filmes populares:", error);
  });


/**
 * Função de interpolação que fornece uma animação de rolagem suave com aceleração e desaceleração suaves.
 * 
 * @param {number} t - O tempo decorrido desde o início da animação (em milissegundos).
 * @param {number} b - O valor inicial da propriedade que está sendo animada.
 * @param {number} c - A mudança total de valor que se deseja atingir (valor final - valor inicial).
 * @param {number} d - A duração total da animação (em milissegundos).
 * @returns {number} - O valor interpolado no momento especificado.
 */

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
}
