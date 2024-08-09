import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useState } from "react";
import axios from "axios";
import { useFetch } from "../hooks/useFetch";
import BackLinkButton from "../components/BackLinkButton";
import toast, { Toaster } from "react-hot-toast";
import placeholder from "../img/placeholder-image.webp";
import homeCss from "./HomePage.module.css";
import css from "./MovieDetailsPage.module.css";
import { useSelect } from "../hooks/useSelect";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const MovieDetailsPage = () => {
  const { type, id } = useParams();
  const query = "";
  const endpoint = useSelect(type, query, id);
  console.log(endpoint);

  const { data, error } = useFetch(endpoint);
  const location = useLocation();
  const backLinkValue = location.state ?? "/";
  const [backLink] = useState(backLinkValue);

  error && toast.error(error);

  return (
    <main className={homeCss.homePage}>
      <Toaster />
      <div className={css.content}>
        <BackLinkButton to={backLink} />
        <img
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
              : placeholder
          }
          alt=""
        />
        <div className={css.textContent}>
          <h2>{data.title}</h2>
          <p>
            <b>User score:</b> {`${Math.ceil(data.vote_average * 10)}%`}
          </p>
          <p>
            <b>Release date:</b>{" "}
            {data.release_date && data.release_date.split("-").join(".")}
          </p>
          <h3>Overview:</h3>
          <p>{data.overview}</p>
          <h3>Genres:</h3>
          {data.genres && (
            <p>{data.genres.map((genre) => genre.name).join(", ")}</p>
          )}
        </div>
      </div>
      <h3 className={css.add}>Additional information:</h3>
      <ul className={css.list}>
        <li>
          <Link to="cast">Movie Cast</Link>
        </li>
        <li>
          <Link to="reviews">Movie Reviews</Link>
        </li>
      </ul>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;
