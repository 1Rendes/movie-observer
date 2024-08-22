import { useLocation, useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import BackLinkButton from "../components/BackLinkButton";
import placeholder from "../img/placeholder-actor.jpg";
import css from "./PersonDetailsPage.module.css";
import ReactShowMoreText from "react-show-more-text";
import "./libStyles.css";
import { readFromSS, writeToSS } from "../helpers/sessionStorage";
import { formatDate } from "../helpers/dateFormat";
import SwiperList from "../components/SwiperList";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const query = "";
  const endpoint = useSelect("person", query, id);
  const { data, error } = useFetch(endpoint);
  const location = useLocation();
  writeToSS(location.pathname, location.state);
  const backLink = readFromSS(location.pathname);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div className={css.homePage}>
      <Toaster />
      {data && (
        <div className={css.content}>
          <BackLinkButton to={backLink} />
          <img
            className={css.img}
            src={
              data.profile_path
                ? `https://image.tmdb.org/t/p/w500/${data.profile_path}`
                : placeholder
            }
            alt=""
          />
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
        </div>
      )}
      <h3 className={css.known}>Known for:</h3>
      <SwiperList
        className={css.combined}
        state={location}
        path={"cast"}
        subFetch={"combined_credits"}
        pathId={"credit_id"}
      />
    </div>
  );
};

export default PersonDetailsPage;
