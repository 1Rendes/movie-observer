import placeholder from "../img/placeholder-image.webp";
import css from "./MovieListItem.module.css";

export const MovieListItem = ({ result }) => {
  return (
    <div className={css.card}>
      <img
        className={css.image}
        src={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
            : placeholder
        }
        alt=""
      />
      <div className={css.textContent}>
        {result.title && <p className={css.name}>{result.title}</p>}
        {result.name && <p className={css.name}>{result.name}</p>}
      </div>
    </div>
  );
};
