import { CircularProgressbar } from "react-circular-progressbar";
import css from "./MovieRating.module.css";

const MovieRating = ({ data }) => {
  return (
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
  );
};

export default MovieRating;
