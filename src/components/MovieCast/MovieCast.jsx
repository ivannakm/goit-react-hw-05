import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";
import { getImageUrl, getMovieCredits } from "../../apiService/tmdbapi";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch {
        setError("Failed to load cast.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          <img
            src={getImageUrl(actor.profile_path)}
            alt={actor.name}
            className={css.photo}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
