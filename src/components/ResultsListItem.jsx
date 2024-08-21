import css from "./ResultsListItem.module.css";
import placeholder from "../img/placeholder-image.webp";
import { formatDate } from "../helpers/dateFormat";

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
        <div className={css.typeDate}>
          {result.media_type && (
            <p className={css.par}>
              {type === "tv" ? `Series` : type === "movie" ? `Movie` : "Person"}
            </p>
          )}
          <p className={css.par}>
            <b>&middot;</b>
          </p>
          {result.release_date && (
            <p className={css.par}>
              <span className={css.spanPar}>
                {formatDate(result.release_date)}
              </span>
            </p>
          )}
          {result.first_air_date && (
            <p className={css.par}>
              <span className={css.spanPar}>
                {" "}
                {formatDate(result.first_air_date)}
              </span>
            </p>
          )}
        </div>
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
        {result.vote_average > 0 && (
          <p className={css.par}>
            Rating:{" "}
            <span className={css.spanPar}>
              {Math.ceil(10 * result.vote_average)}%
            </span>
          </p>
        )}
        <p className={css.overview}>{result.overview}</p>
      </div>
    </div>
  );
};
