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
            data.length > 0
              ? `https://image.tmdb.org/t/p/w500/${data[0].backdrop_path}`
              : placeholder
          }
          alt=""
        />
        {data.length > 0 && (
          <div className={css.textContent}>
            <h2>{data[0].title}</h2>
            <h2>{data[0].name}</h2>
            <p>
              <b>User score: </b> {`${Math.ceil(data[0].vote_average * 10)}%`}
            </p>
            <p>
              {type === "movie" ? (
                <b>Release date: </b>
              ) : (
                <b>First air date: </b>
              )}
              {data[0].release_date &&
                data[0].release_date.split("-").join(".")}
              {data[0].first_air_date &&
                data[0].first_air_date.split("-").join(".")}
            </p>
            <h3>Overview: </h3>
            <p>{data[0].overview}</p>
            <h3>Genres: </h3>
            {data[0].genres && (
              <p>{data[0].genres.map((genre) => genre.name).join(", ")}</p>
            )}
          </div>
        )}{" "}
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
