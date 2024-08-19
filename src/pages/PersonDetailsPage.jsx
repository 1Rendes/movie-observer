import { useLocation, useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import BackLinkButton from "../components/BackLinkButton";
import placeholder from "../img/placeholder-actor.jpg";
import css from "./PersonDetailsPage.module.css";
import PersonCombined from "../components/PersonCombined";

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
            <h2>{data.name}</h2>
            <p>
              <b>Knows for department:</b> {data.known_for_department}
            </p>
            <p>
              <b>Birthday:</b> {data.birthday.split("-").join(".")}
            </p>
            <p>
              <b>Place of birth:</b> {data.place_of_birth}
            </p>
            <p>
              <b>Biography: </b>
              {data.biography}
            </p>
            <p>
              <b>Gender: </b>
              {data.gender === 2 ? "Male" : "Female"}
            </p>
            {data.deathday && (
              <p>
                <b>Deathday: </b>
                {data.deathday.split("-").join(".")}
              </p>
            )}
          </div>
        </div>
      )}
      <PersonCombined className={css.combined} />
    </div>
  );
};

export default PersonDetailsPage;
