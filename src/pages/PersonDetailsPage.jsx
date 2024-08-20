import { useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import BackLinkButton from "../components/BackLinkButton";
import placeholder from "../img/placeholder-actor.jpg";
import css from "./PersonDetailsPage.module.css";
import PersonCombined from "../components/PersonCombined";
import ReactShowMoreText from "react-show-more-text";
import "./showMore.css";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const query = "";
  const endpoint = useSelect("person", query, id);
  const { data, error } = useFetch(endpoint);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div className={css.homePage}>
      <BackLinkButton to={-1} />
      <Toaster />
      {data && (
        <div className={css.content}>
          <img
            className={css.img}
            src={
              data
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
            <p className={css.descr}>
              {data.birthday && (
                <p className={css.descr}>
                  <b>Birthday:</b> {data.birthday.split("-").join(".")}
                </p>
              )}
            </p>
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
                {data.biography}
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
      <h3 className={css.known}>Known by:</h3>
      <PersonCombined className={css.combined} />
    </div>
  );
};

export default PersonDetailsPage;
