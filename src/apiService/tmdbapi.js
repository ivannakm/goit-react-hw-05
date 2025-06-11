import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTE2ZGZkMmJjMzZhNjdiYTJjNGVjZWRkOWY2MDg2YyIsIm5iZiI6MTc0OTU2MzYzNC4yNjMsInN1YiI6IjY4NDgzOGYyZWQ2YmMxYTY5ZjlmNTRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ofa-jXRAG9IiJYdNP7SFZ0xVnAR0g1S95rhdbtOkfk";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: "application/json",
  },
});

export const searchMovies = async (query, page = 1) => {
  try {
    const { data } = await api.get("/search/movie", {
      params: { query, page, include_adult: false, language: "en-US" },
    });
    return data;
  } catch (error) {
    console.error(
      "Search movies failed:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const { data } = await api.get("/trending/movie/day?language=en-US");
    return data.results;
  } catch (error) {
    console.error(
      "Get trending movies failed:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await api.get(`/movie/${movieId}?language=en-US`);
    return data;
  } catch (error) {
    console.error(
      "Get movie details failed:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/credits?language=en-US`);
    return data.cast;
  } catch (error) {
    console.error(
      "Get movie credits failed:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/reviews?language=en-US`);
    return data.results;
  } catch (error) {
    console.error(
      "Get movie reviews failed:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getImageUrl = (path) => (path ? `${IMAGE_BASE_URL}${path}` : null);
