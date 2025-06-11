import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../apiService/tmdbapi";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
