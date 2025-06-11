import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  Link,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieDetailsPage.module.css";
import { getImageUrl, getMovieDetails } from "../../apiService/tmdbapi";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const goBackLink = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Failed to load movie details.");
        toast.error("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(goBackLink.current);
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div className={css.container}>
      <button onClick={handleGoBack} className={css.backLink}>
        ← Go back
      </button>
      <Toaster position="top-right" />
      <div className={css.movieDetails}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.info}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      </div>

      <div className={css.subNav}>
        <Link
          to={`/movies/${movieId}/cast`}
          state={{ from: goBackLink.current }}
          className={css.link}
        >
          Cast
        </Link>
        <Link
          to={`/movies/${movieId}/reviews`}
          state={{ from: goBackLink.current }}
          className={css.link}
        >
          Reviews
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
