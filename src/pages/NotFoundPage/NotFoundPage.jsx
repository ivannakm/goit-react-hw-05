import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.errorWrapper}>
      <h1 className={css.title}>Page not found!</h1>
      <p className={css.descr}>
        Sorry, the page you are looking for does not exist
      </p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
