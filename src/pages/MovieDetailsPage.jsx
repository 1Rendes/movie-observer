import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import BackLinkButton from "../components/BackLinkButton";
import toast, { Toaster } from "react-hot-toast";
import placeholder from "../img/placeholder-image.webp";
import homeCss from "./HomePage.module.css";
import css from "./MovieDetailsPage.module.css";
import { useSelect } from "../hooks/useSelect";

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
            <b>User score: </b> {`${Math.ceil(data.vote_average * 10)}%`}
          </p>
          <p>
            {type === "movie" ? <b>Release date: </b> : <b>First air date: </b>}
            {data.release_date && data.release_date.split("-").join(".")}
            {data.first_air_date && data.first_air_date.split("-").join(".")}
          </p>
          <h3>Overview: </h3>
          <p>{data.overview}</p>
          <h3>Genres: </h3>
          {data.genres && (
            <p>{data.genres.map((genre) => genre.name).join(", ")}</p>
          )}
        </div>
      </div>
      <h3 className={css.add}>Additional information:</h3>
      <ul className={css.list}>
        <li>
          <Link to="cast">
            {type === "movie" ? "Movie Cast" : "Series Credits"}
          </Link>
        </li>
        <li>
          <Link to="reviews">
            {type === "movie" ? "Movie Reviews" : "Series Review"}
          </Link>
        </li>
      </ul>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;
