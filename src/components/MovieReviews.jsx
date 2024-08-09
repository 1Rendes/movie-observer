import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieRewiews.module.css";
import { useSelect } from "../hooks/useSelect";

const MovieReviews = () => {
  const { type, id } = useParams();
  const endpoint = useSelect(type, "", id, "reviews");
  const { data, error } = useFetch(endpoint);
  error && toast.error(error);

  return (
    data.results &&
    (data.results.length > 0 ? (
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
    ))
  );
};

export default MovieReviews;
