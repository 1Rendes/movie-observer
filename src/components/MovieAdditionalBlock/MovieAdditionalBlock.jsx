import { Link } from "react-router-dom";
import css from "./MovieAdditionalBlock.module.css";

const MovieAdditionalBlock = ({ location, type }) => {
  return (
    <div>
      <h3 className={css.add}>Additional information:</h3>
      <ul className={css.list}>
        <li>
          <Link to="cast" state={location}>
            {type === "movie" ? "Cast" : "Credits"}
          </Link>
        </li>
        <li>
          <Link to="reviews" state={location}>
            Reviews
          </Link>
        </li>
        <li>
          <Link to="videos" state={location}>
            Videos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MovieAdditionalBlock;
