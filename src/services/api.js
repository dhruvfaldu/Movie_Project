import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchTrendingMovies = async () => {
  const res = await api.get(`/trending/movie/week?api_key=${API_KEY}`);
  return res.data;
};

export const fetchPopularMovies = async (page = 1) => {
  const res = await api.get(
    `/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  return res.data;
};

export const fetchMovieDetails = async (id) => {
  const res = await api.get(`/movie/${id}?api_key=${API_KEY}`);
  return res.data;
};

export const fetchMovieVideos = async (id) => {
  const res = await api.get(`/movie/${id}/videos?api_key=${API_KEY}`);
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await api.get(
    `/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return res.data.results;
};

export const fetchGenres = async () => {
  const res = await api.get(`/genre/movie/list?api_key=${API_KEY}`);
  return res.data.genres;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const res = await api.get(
    `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
  );

  return res.data;
};

export default api;