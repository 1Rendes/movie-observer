import { Link, useLocation } from "react-router-dom";
import css from "./ResultsList.module.css";
import { ResultsListItem } from "../ResultsListItem/ResultsListItem";

const ResultsList = ({ movieList, type }) => {
  const location = useLocation();
  if (type === "all") {
    return (
      <ul className={css.list}>
        {movieList.map((result) => {
          type = result.media_type;
          return (
            <div key={result.id} className={css.MovieListCard}>
              <Link to={`/${type}/${result.id}`} state={location}>
                <ResultsListItem result={result} type={type} />
              </Link>
            </div>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className={css.list}>
      {movieList.map((result) => {
        return (
          <div key={result.id} className={css.MovieListCard}>
            <Link to={`/${type}/${result.id}`} state={location}>
              <ResultsListItem result={result} />
            </Link>
          </div>
        );
      })}
    </ul>
  );
};

export default ResultsList;
