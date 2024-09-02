import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieRewiews.module.css";
import { useSelect } from "../../hooks/useSelect";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

const MovieReviews = () => {
  const { type, id } = useParams();
  const endpoint = useSelect(type, "", id, "reviews");
  const { data, error } = useFetch(endpoint);
  error && toast.error(error);

  useEffect(() => {
    if (!data) return;
    window.scrollBy({
      top: 300,
      behavior: "smooth",
    });
  }, [data]);

  return data?.results?.length > 0 ? (
    <ul className={css.list}>
      <Toaster />
      {data.results.map(({ id, author, content }) => (
        <li key={id}>
          <h3>Author: {author}</h3>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>We do not have any reviews for this movie</p>
  );
};

export default MovieReviews;
