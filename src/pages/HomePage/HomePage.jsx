import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { getTrendingMovies } from "../../apiService/tmdbapi";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setError("Failed to load trending movies.");
        toast.error("Failed to load trending movies.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending Movies</h1>
      <Toaster position="top-right" />
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
