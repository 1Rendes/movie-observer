import placeholder from "../../img/placeholder-image.webp";
import css from "./MovieMainBlock.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../libStyles.css";
import { formatDate } from "../../helpers/dateFormat";
import ReactShowMoreText from "react-show-more-text";
import BackLinkButton from "../BackLinkButton";
import MovieTable from "../MovieTable/MovieTable";

const MovieMainBlock = ({ data, prevLocation }) => {
  return (
    <div className={css.content}>
      <BackLinkButton to={prevLocation} />
      <img
        className={css.img}
        src={
          data
            ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
            : placeholder
        }
        alt=""
      />
      {data && (
        <div
          className={css.textContent}
          style={{
            backgroundImage: `linear-gradient(to right, rgb(45, 45, 45), rgba(45,45,45, 0.7), rgb(45, 45, 45)), url(https://image.tmdb.org/t/p/w500/${
              data && data.backdrop_path
            })`,
          }}
        >
          {data.title && (
            <div className={css.nameDiv}>
              <h2 className={css.header}>
                {data.title}
                <span className={css.year}>
                  {" ("}
                  {data.release_date.slice(0, 4)}
                  {")"}
                </span>
              </h2>
              <p className={css.par}>
                {formatDate(data.release_date)} <b>&middot;</b>{" "}
                {data.genres.map((genre) => genre.name).join(", ")}{" "}
                <b>&middot;</b> {data.runtime} min
              </p>
            </div>
          )}
          {data.name && (
            <div className={css.nameDiv}>
              <h2 className={css.header}>
                {data.name}
                <span className={css.year}>
                  {" ("}
                  {data.first_air_date.slice(0, 4)}
                  {")"}
                </span>
              </h2>
              <p className={css.par}>
                {formatDate(data.first_air_date)} <b>&middot;</b>{" "}
                {data.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          )}
          <div className={css.rating}>
            <div className={css.libRating}>
              <CircularProgressbar
                background
                backgroundPadding={10}
                className="CircularProgressbar"
                value={Math.ceil(data.vote_average * 10)}
                text={`${Math.ceil(data.vote_average * 10)}%`}
              />
            </div>
            <p>
              <b>User score</b>
              <br />
              <span className={css.voteSpan}>
                {data.vote_count && `${data.vote_count} votes`}
              </span>
            </p>
          </div>
          {data.tagline && (
            <p className={css.tag}>&quot;{data.tagline}&quot;</p>
          )}
          <h3>Overview: </h3>
          <ReactShowMoreText
            lines={6}
            more="Show more"
            less="Show less"
            className="content-css"
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            {data.overview}
          </ReactShowMoreText>
          <MovieTable data={data} />
        </div>
      )}
    </div>
  );
};

export default MovieMainBlock;
