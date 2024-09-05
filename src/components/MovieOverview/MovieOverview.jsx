import ReactShowMoreText from "react-show-more-text";
import "../libStyles.css";
import css from "./MovieOverview.module.css";

const MovieOverview = ({ data }) => {
  return (
    <div>
      {data.tagline && <p className={css.tag}>&quot;{data.tagline}&quot;</p>}
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
    </div>
  );
};

export default MovieOverview;
