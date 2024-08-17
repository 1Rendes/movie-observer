import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import { MovieListItem } from "./MovieListItem";

const MovieLis = ({ movieList, type }) => {
  const location = useLocation();
  if (type === "all") type = "movie";

  return (
    <ul className={css.list}>
      {movieList.map((result) => {
        return (
          <div key={result.id} className={css.MovieListCard}>
            <Link to={`/${type}/${result.id}`} state={location}>
              <MovieListItem result={result} />
            </Link>
          </div>
        );
      })}
    </ul>
  );
};

export default MovieLis;
