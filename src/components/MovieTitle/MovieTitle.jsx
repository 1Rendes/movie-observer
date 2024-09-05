import { useParams } from "react-router-dom";
import { formatDate } from "../../helpers/dateFormat";
import css from "./MovieTitle.module.css";

const MovieTitle = ({ data }) => {
  const { type } = useParams();
  const isMovie = type === "movie";
  const title = isMovie ? data.title : data.name;
  const date = isMovie ? data.release_date : data.first_air_date;
  const additionalInfo = isMovie ? `${data.runtime} min` : "";

  return (
    <div>
      {title && (
        <div className={css.nameDiv}>
          <h2 className={css.header}>
            {title}
            <span className={css.year}>
              {" ("}
              {date.slice(0, 4)}
              {")"}
            </span>
          </h2>
          <p className={css.par}>
            {formatDate(date)} <b>&middot;</b>{" "}
            {data.genres.map((genre) => genre.name).join(", ")}
            {additionalInfo && (
              <>
                <b>&middot;</b> {additionalInfo}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieTitle;
