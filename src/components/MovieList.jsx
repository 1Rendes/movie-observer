import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movieList }) => {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movieList.map((result) => (
        <div key={result.id}>
          <Link to={`/movies/${result.id}`} state={location}>
            <li>{result.title}</li>
          </Link>
        </div>
      ))}
    </ul>
  );
};

export default MovieList;
