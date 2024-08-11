import css from "./MovieListItem.module.css";
import placeholder from "../img/placeholder-image.webp";

export const MovieListItem = ({ result }) => {
  return (
    <div className={css.div}>
      <img
        className={css.image}
        src={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${result.backdrop_path}`
            : placeholder
        }
      />
      {result.title && <p>{result.title}</p>}
      {result.name && <p>{result.name}</p>}
    </div>
  );
};
