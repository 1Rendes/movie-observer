import css from "./MovieMainBlock.module.css";
import "react-circular-progressbar/dist/styles.css";
import "../libStyles.css";
import BackLinkButton from "../BackLinkButton";
import MovieTable from "../MovieTable/MovieTable";
import MovieTitle from "../MovieTitle/MovieTitle";
import MovieRating from "../MovieRating/MovieRating";
import MovieOverview from "../MovieOverview/MovieOverview";
import MovieImageBlock from "../MovieImageBlock/MovieImageBlock";

const MovieMainBlock = ({ data, prevLocation }) => {
  return (
    <div className={css.content}>
      <BackLinkButton to={prevLocation} />
      <MovieImageBlock data={data}>
        <MovieTitle data={data} />
        <MovieRating data={data} />
        <MovieOverview data={data} />
        <MovieTable data={data} />
      </MovieImageBlock>
    </div>
  );
};

export default MovieMainBlock;
