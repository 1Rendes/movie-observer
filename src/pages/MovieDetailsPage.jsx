import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import BackLinkButton from "../components/BackLinkButton";
import toast, { Toaster } from "react-hot-toast";
import placeholder from "../img/placeholder-image.webp";
import homeCss from "./HomePage.module.css";
import css from "./MovieDetailsPage.module.css";
import { useSelect } from "../hooks/useSelect";
import { readFromSS, writeToSS } from "../helpers/sessionStorage";

const MovieDetailsPage = () => {
  const { type, id } = useParams();
  const query = "";
  const endpoint = useSelect(type, query, id);
  const { data, error } = useFetch(endpoint);
  const location = useLocation();
  writeToSS(location.pathname, location.state);
  const prevLocation = readFromSS(location.pathname);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <main className={homeCss.homePage}>
      <Toaster />
      <div className={css.content}>
        <BackLinkButton to={prevLocation} />
        <img
          className={css.img}
          src={
            data
              ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
              : placeholder
          }
          alt=""
        />
        {data && (
          <div
            className={css.textContent}
            style={{
              backgroundImage: `linear-gradient(to right, rgb(45, 45, 45), rgba(45,45,45, 0.7), rgb(45, 45, 45)), url(https://image.tmdb.org/t/p/w500/${
                data && data.backdrop_path
              })`,
            }}
          >
            <h2>{data.title}</h2>
            <h2>{data.name}</h2>
            <p>
              <b>User score: </b> {`${Math.ceil(data.vote_average * 10)}%`}
            </p>
            {data.release_date && (
              <p>
                <b>Release date: </b>
                {data.release_date.split("-").join(".")}
              </p>
            )}
            {data.first_air_date && (
              <p>
                <b>First air date: </b>
                {data.first_air_date.split("-").join(".")}
              </p>
            )}
            <h3>Overview: </h3>
            <p>{data.overview}</p>
            <h3>Genres: </h3>
            {data.genres && (
              <p>{data.genres.map((genre) => genre.name).join(", ")}</p>
            )}
          </div>
        )}
      </div>
      <h3 className={css.add}>Additional information:</h3>
      <ul className={css.list}>
        <li>
          <Link to="cast" state={location}>
            {type === "movie" ? "Cast" : "Credits"}
          </Link>
        </li>
        <li>
          <Link to="reviews" state={location}>
            Reviews
          </Link>
        </li>
        <li>
          <Link to="videos" state={location}>
            Videos
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
