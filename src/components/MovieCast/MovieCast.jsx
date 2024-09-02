import { Link, useLocation, useParams } from "react-router-dom";
import placeholder from "../../img/placeholder-actor.jpg";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieCast.module.css";
import { useSelect } from "../../hooks/useSelect";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

const MovieCast = () => {
  const { type, id } = useParams();
  const subFetch = type === "movie" ? "casts" : "credits";
  const endpoint = useSelect(type, "", id, subFetch);
  const { data, error } = useFetch(endpoint);
  const location = useLocation();

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    window.scrollBy({
      top: 300,
      behavior: "smooth",
    });
  }, [data]);

  return (
    <>
      <Toaster />
      {data && (
        <ul className={css.actors} id="actors">
          {data.cast.map(
            ({ cast_id, credit_id, id, profile_path, name, character }) => {
              let key;
              if (cast_id) {
                key = cast_id;
              } else {
                key = credit_id;
              }
              return (
                <Link
                  to={`/person/${id}`}
                  key={key}
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
                  <div className={css.textContent}>
                    <p className={css.descr}>{name}</p>
                    <p className={css.descr}>Character: {character}</p>
                  </div>
                </Link>
              );
            }
          )}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
