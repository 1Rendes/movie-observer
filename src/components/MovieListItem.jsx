import placeholder from "../img/placeholder-image.webp";
import css from "./MovieListItem.module.css";

export const MovieListItem = ({ result }) => {
  return (
    <>
      <img
        className={css.image}
        src={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${result.backdrop_path}`
            : placeholder
        }
        alt=""
      />
      <p>{result.title}</p>
      <p>{result.name}</p>
    </>
  );
};
