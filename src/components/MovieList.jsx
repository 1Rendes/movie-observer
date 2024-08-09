import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movieList, type }) => {
  const location = useLocation();
  console.log(movieList);

  return (
    <ul className={css.list}>
      {movieList.map((result) => {
        return (
          <div key={result.id}>
            <Link to={`/${type}/${result.id}`} state={location}>
              {result.title && <li>{result.title}</li>}
              {result.name && <li>{result.name}</li>}
            </Link>
          </div>
        );
      })}
    </ul>
  );
};

export default MovieList;
