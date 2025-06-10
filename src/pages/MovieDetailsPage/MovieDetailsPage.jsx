// import { useParams, Link, useLocation, Outlet } from "react-router-dom";
// import css from "./MovieDetailsPage.module.css";

// function MovieDetailsPage() {
//   const { movieId } = useParams();
//   const location = useLocation();

//   const backLink = location.state?.from || "/movies";

//   return (
//     <div className={css.container}>
//       <Link to={backLink} className={css.backLink}>
//         ← Go back
//       </Link>
//       <h2>Movie Details for ID: {movieId}</h2>

//       <div className={css.subNav}>
//         <Link to="cast" state={{ from: backLink }} className={css.link}>
//           Cast
//         </Link>
//         <Link to="reviews" state={{ from: backLink }} className={css.link}>
//           Reviews
//         </Link>
//       </div>
//       <Outlet />
//     </div>
//   );
// }

// export default MovieDetailsPage;
