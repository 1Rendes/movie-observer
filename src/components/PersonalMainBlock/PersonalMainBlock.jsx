import ReactShowMoreText from "react-show-more-text";
import { formatDate } from "../../helpers/dateFormat";
import css from "./PersonalMainBlock.module.css";

const PersonalMainBlock = ({ data }) => {
  return (
    <div className={css.textContent}>
      <h2 className={css.name}>{data.name}</h2>
      <p className={css.descr}>
        <b>Knows for department:</b> {data.known_for_department}
      </p>
      <p className={css.descr}>
        <b>Gender: </b>
        {data.gender === 2 ? "Male" : "Female"}
      </p>
      {data.birthday && (
        <p className={css.descr}>
          <b>Birthday:</b> {formatDate(data.birthday)}
        </p>
      )}
      <p className={css.descr}>
        <b>Place of birth:</b> {data.place_of_birth}
      </p>
      <div className={css.descr}>
        <p>
          <b>Biography: </b>
        </p>
        <ReactShowMoreText
          lines={6}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="show-more-less-clickable"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          {data.biography
            ? data.biography
            : `We don't have biography for ${data.name}.`}
        </ReactShowMoreText>
      </div>
      {data.deathday && (
        <p className={css.descr}>
          <b>Deathday: </b>
          {data.deathday.split("-").join(".")}
        </p>
      )}
    </div>
  );
};

export default PersonalMainBlock;
