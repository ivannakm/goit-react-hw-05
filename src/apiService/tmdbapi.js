import axios from "axios";

// const API_KEY = "8916dfd2bc36a67ba2c4ecedd9f6086c";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTE2ZGZkMmJjMzZhNjdiYTJjNGVjZWRkOWY2MDg2YyIsIm5iZiI6MTc0OTU2MzYzNC4yNjMsInN1YiI6IjY4NDgzOGYyZWQ2YmMxYTY5ZjlmNTRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ofa-jXRAG9IiJYdNP7SFZ0xVnAR0g1S95rhdbtOkfk";
const BASE_URL = "https://api.themoviedb.org/3";

const options = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const searchMovies = async (query, page = 1) => {
  const { data } = await options.get(`/search/movie`, {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });
  return data;
};
