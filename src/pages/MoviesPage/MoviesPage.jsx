import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { searchMovies } from "../../apiService/tmdbapi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    setSearchParams({ query });
  };

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (!searchQuery) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await searchMovies(searchQuery);
        setMovies(data.results);
        if (data.results.length === 0) {
          toast.error("No movies found.");
        }
      } catch {
        setError("Failed to search movies.");
        toast.error("Failed to search movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>

      <Toaster position="top-right" />
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <MovieList movies={movies} from={location.pathname + location.search} />
      )}
    </div>
  );
};

export default MoviesPage;
