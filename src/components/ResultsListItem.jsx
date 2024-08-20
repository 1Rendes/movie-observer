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
            : result.profile_path
            ? `https://image.tmdb.org/t/p/w500/${result.profile_path}`
            : placeholder
        }
      />
      <div className={css.data}>
        {result.title && <p className={css.parName}>{result.title}</p>}
        {result.name && <p className={css.parName}>{result.name}</p>}
        {result.media_type && (
          <p className={css.par}>
            {type === "tv" ? "Series" : type === "movie" ? "Movie" : "Person"}
          </p>
        )}
        {result.release_date && (
          <p className={css.par}>
            Release date <b>&middot; </b>
            <span className={css.spanPar}>
              {result.release_date.split("-").join(".")}
            </span>
          </p>
        )}
        {result.first_air_date && (
          <p className={css.par}>
            First air date <b>&middot; </b>
            <span className={css.spanPar}> {result.first_air_date}</span>
          </p>
        )}
        {result.known_for && (
          <p className={css.par}>
            Knows for <b>&middot; </b>
            <span className={css.spanPar}>
              {result.known_for
                .map((media) => {
                  if (media.name) {
                    return media.name;
                  } else {
                    return media.title;
                  }
                })
                .join(", ")}
              .
            </span>
          </p>
        )}
        {result.vote_average && (
          <p className={css.par}>
            Rating:{" "}
            <span className={css.spanPar}>
              {Math.ceil(10 * result.vote_average)}%
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
