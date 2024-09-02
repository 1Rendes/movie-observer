import { useParams } from "react-router-dom";
import { useSelect } from "../../hooks/useSelect";
import { useFetch } from "../../hooks/useFetch";
import VideoPlayer from "../VideoPlayer";
import toast from "react-hot-toast";
import { useEffect } from "react";
import css from "./MovieVideoList.module.css";

const MovieVideoList = () => {
  const { type, id } = useParams();
  const endpoint = useSelect(type, "", id, "videos");
  const { data, error } = useFetch(endpoint);

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
      {data && (
        <ul className={css.list}>
          {data.results.map(({ id, name, key }) => (
            <li key={id} className={css.listItem}>
              <VideoPlayer
                video={`https://www.youtube.com/embed/${key}`}
                name={name}
              />
            </li>
          ))}
          {data.results.length === 0 && (
            <p className={css.noContent}>We do not have any videos</p>
          )}
        </ul>
      )}
    </>
  );
};

export default MovieVideoList;
