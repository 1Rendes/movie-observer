import css from "./ResultsListItem.module.css";
import placeholder from "../img/placeholder-image.webp";

export const ResultsListItem = ({ result, type }) => {
  return (
    <div className={css.div}>
      <img
        className={css.image}
        src={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
            : placeholder
        }
      />
      <div className={css.data}>
        {result.title && <p className={css.par}>{result.title}</p>}
        {result.name && <p className={css.par}>{result.name}</p>}
        {result.release_date && (
          <p className={css.par}>{result.release_date}</p>
        )}
        {result.first_air_date && (
          <p className={css.par}>{result.first_air_date}</p>
        )}
        <p className={css.par}>{type}</p>
      </div>
    </div>
  );
};
