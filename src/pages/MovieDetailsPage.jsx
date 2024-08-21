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
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./libStyles.css";
import { formatDate } from "../helpers/dateFormat";
import ReactShowMoreText from "react-show-more-text";
import Recomendations from "../components/Recommendations";

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
            {data.title && (
              <div className={css.nameDiv}>
                <h2 className={css.header}>
                  {data.title}
                  <span className={css.year}>
                    {" ("}
                    {data.release_date.slice(0, 4)}
                    {")"}
                  </span>
                </h2>
                <p className={css.par}>
                  {formatDate(data.release_date)} <b>&middot;</b>{" "}
                  {data.genres.map((genre) => genre.name).join(", ")}{" "}
                  <b>&middot;</b> {data.runtime} min
                </p>
              </div>
            )}
            {data.name && (
              <div className={css.nameDiv}>
                <h2 className={css.header}>
                  {data.name}
                  <span className={css.year}>
                    {" ("}
                    {data.first_air_date.slice(0, 4)}
                    {")"}
                  </span>
                </h2>
                <p className={css.par}>
                  {formatDate(data.first_air_date)} <b>&middot;</b>{" "}
                  {data.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            )}
            <div className={css.rating}>
              <div className={css.libRating}>
                <CircularProgressbar
                  background
                  backgroundPadding={10}
                  className="CircularProgressbar"
                  value={Math.ceil(data.vote_average * 10)}
                  text={`${Math.ceil(data.vote_average * 10)}%`}
                />
              </div>
              <p>
                <b>User score</b>
                <br />
                <span className={css.voteSpan}>
                  {data.vote_count && `${data.vote_count} votes`}
                </span>
              </p>
            </div>
            {data.tagline && (
              <p className={css.tag}>&quot;{data.tagline}&quot;</p>
            )}
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
            {data.title && (
              <div className={css.additionalData}>
                <div className={css.addElement}>
                  <p className={css.headPar}>Status: </p>
                  <p className={css.par}>{data.status}</p>
                </div>
                <div className={css.addElement}>
                  <p className={css.headPar}>Budget: </p>
                  <p className={css.par}>{data.budget ? data.budget : "-"}</p>
                </div>
                <div className={css.addElement}>
                  <p className={css.headPar}>Origin country: </p>
                  <p className={css.par}>{data.origin_country[0]}</p>
                </div>
                <div className={css.addElement}>
                  <p className={css.headPar}>Revenue: </p>
                  <p className={css.par}>{data.revenue ? data.revenue : "-"}</p>
                </div>
              </div>
            )}
            {data.name && (
              <div className={css.additionalData}>
                <div className={css.addElement}>
                  <p className={css.headPar}>Status: </p>
                  <p className={css.par}>{data.status}</p>
                </div>
                <div className={css.addElement}>
                  <p className={css.headPar}>Number of episodes: </p>
                  <p className={css.par}>{data.number_of_episodes}</p>
                </div>
                <div className={css.addElement}>
                  <p className={css.headPar}>Origin country: </p>
                  <p className={css.par}>{data.origin_country[0]}</p>
                </div>
                <div className={css.addElement}>
                  <p className={css.headPar}>Number of seasons: </p>
                  <p className={css.par}>{data.number_of_seasons}</p>
                </div>
              </div>
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
      <Recomendations state={location} />
    </main>
  );
};

export default MovieDetailsPage;
