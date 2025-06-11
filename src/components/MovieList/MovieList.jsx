import { Link } from "react-router-dom";
import { getImageUrl } from "../../apiService/tmdbapi";
import css from "./MovieList.module.css";

const MovieList = ({ movies, from }) => {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link to={`/movies/${movie.id}`} state={{ from }}>
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={css.poster}
            />
            <h3>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
