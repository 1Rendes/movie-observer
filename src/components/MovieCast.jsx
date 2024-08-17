import { useParams } from "react-router-dom";
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
  console.log(endpoint);

  error && toast.error(error);

  return (
    <>
      <Toaster />
      {data && (
        <ul className={css.actors}>
          {data.cast.map(({ id, profile_path, name, character }) => (
            <li className={css.actor} key={id}>
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
