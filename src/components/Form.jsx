import css from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Form = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();
    const type = form.elements.type.value;
    if (!query) {
      toast.error("Please fill the request");
      return;
    } else if (!type) {
      toast.error('Choose "Movie" or "Series"');
      return;
    } else {
      navigate(`/results/?query=${query}&type=${type}`);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input type="text" name="query" className={css.input} />
      <input type="radio" name="type" value="movie" />
      <input type="radio" name="type" value="tv" />
      <button type="submit" className={css.button}>
        Go!
      </button>
    </form>
  );
};
