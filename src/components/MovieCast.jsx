import { Link, useLocation, useParams } from "react-router-dom";
import placeholder from "../img/placeholder-actor.jpg";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieCast.module.css";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";

const MovieCast = () => {
  const { type, id } = useParams();
  const subFetch = type === "movie" ? "casts" : "credits";
  const endpoint = useSelect(type, "", id, subFetch);
  const { data, error } = useFetch(endpoint);
  const location = useLocation();
  console.log(location);

  error && toast.error(error);

  return (
    <>
      <Toaster />
      {data && (
        <ul className={css.actors}>
          {data.cast.map(({ id, profile_path, name, character }) => (
            <Link
              to={`/person/${id}`}
              key={id}
              className={css.actor}
              state={location}
            >
              <img
                className={css.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : placeholder
                }
                alt=""
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
