// Importe variáveis e funções necessárias de outros módulos
import { listaDeFavoritos } from "./main.js";
import { apiKey } from "./script.js";
import { InserirFilmesNaTela } from "./main.js";

// Obtenha a referência para o input de pesquisa
const inputPesquisa = document.querySelector(".cabecalho__pesquisa-input");

// Adicione um ouvinte de evento para detectar a entrada de texto no input de pesquisa
inputPesquisa.addEventListener("input", pesquisarFilmes);

// Função para pesquisar filmes
function pesquisarFilmes() {
  // Obtenha o termo de pesquisa do valor do input, removendo espaços em branco extras
  const searchTerm = inputPesquisa.value.trim();

  if (searchTerm !== "") {
    // Faça uma solicitação à API do TMDb para pesquisar filmes com base no termo de pesquisa
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchTerm}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((data) => {
        // Processar os resultados da pesquisa
        const movies = data.results;
        let movieIds = [];
        let movieList = [];

        // Verificar se há um filme com título exato
        const exactMatch = movies.find((movie) => movie.title === searchTerm);

        if (exactMatch) {
          // Se houver um título exato, adicione o ID e o filme à lista
          movieIds.push(exactMatch.id);
          movieList.push(exactMatch);
        } else {
          // Caso contrário, adicione todos os IDs e filmes correspondentes
          movieIds = movies.map((movie) => movie.id);
          movieList = movies;
        }

        // Chame a função para inserir filmes na tela
        InserirFilmesNaTela(movieList);
      })
      .catch((error) => {
        // Tratar erros
        console.error("Ocorreu um erro ao pesquisar filmes:", error);
      });
  } else {
    // Se o campo de pesquisa estiver vazio, carregue os filmes populares padrão
    loadDefaultMovies();
  }
}

// Função para carregar os filmes populares padrão
async function loadDefaultMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    const movies = data.results.slice(0, 50);
    InserirFilmesNaTela(movies);
  } catch (error) {
    // Tratar erros
    console.error("Ocorreu um erro ao obter os filmes populares:", error);
  }
}

// Adicione um ouvinte de evento para a carga da página
document.addEventListener("load", () => {
  // Chame a função para obter filmes favoritos
  getFilmesFavoritos();
});

// Obtenha a referência para o elemento de filtro (Não está claro no código HTML onde está o filtro, você deve substituir esta linha pelo ID correto)
const filtroAtivo = document.getElementById('.container-favoritos');

// Função para obter filmes favoritos
async function getFilmesFavoritos() {
  if (listaDeFavoritos.length === 0) {
    // Se não houver favoritos, limpe a lista de filmes e exiba uma mensagem de lista vazia
    document.getElementById('filmes').innerHTML = '';
    document.querySelector('.card__lista-vazia').style.display = 'flex';
  }

  if (filtroAtivo.checked) {
    try {
      // Faça uma solicitação para obter detalhes dos filmes favoritos
      const filmes = [];
      for (const movieId of listaDeFavoritos) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
        const movie = await response.json();
        filmes.push(movie);
      }

      // Chame a função para inserir filmes na tela
      InserirFilmesNaTela(filmes);

      // Marque todos os elementos de checkbox como "checked"
      document.querySelectorAll('.cards').forEach(elemento => {
        elemento.querySelector('.cards__parte2-checkbox').checked = true;
      });
    } catch (error) {
      // Tratar erros
      console.error('Ocorreu um erro ao obter detalhes dos filmes:', error);
    }
  } else {
    // Oculte a mensagem de lista vazia
    document.querySelector('.card__lista-vazia').style.display = 'none';
    try {
      // Faça uma solicitação para obter os filmes populares
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`);
      const data = await response.json();
      const movies = data.results.slice(0, 10);

      // Chame a função para inserir filmes na tela
      InserirFilmesNaTela(movies);
    } catch (error) {
      // Tratar erros
      console.error('Ocorreu um erro ao obter os filmes populares:', error);
    }
  }
}
