import { useLocation, useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import BackLinkButton from "../components/BackLinkButton";
import placeholder from "../img/placeholder-actor.jpg";
import css from "./PersonDetailsPage.module.css";
import "../components/libStyles.css";
import { readFromSS, writeToSS } from "../helpers/sessionStorage";
import SwiperList from "../components/SwiperList";
import Container from "../components/Container/Container";
import PersonalMainBlock from "../components/PersonalMainBlock/PersonalMainBlock";

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
    <Container>
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
          <PersonalMainBlock data={data} />
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
    </Container>
  );
};

export default PersonDetailsPage;
