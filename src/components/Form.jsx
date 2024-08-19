import css from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import clsx from "clsx";

export const Form = ({ mobMenu }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();
    const type = form.elements.type.value;
    if (!query) {
      toast.error("Please fill the request");
      return;
    } else {
      navigate(`/results/?query=${query}&type=${type}`);
    }
  };
  return (
    <>
      <form
        className={clsx(css.form, mobMenu && css.isMobMenu)}
        onSubmit={handleSubmit}
      >
        <select className={css.select} name="type">
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">Series</option>
          <option value="person">Persons</option>
        </select>
        <input type="text" name="query" className={css.input} />
        <button type="submit" className={css.button}>
          <FaSearch className={css.FaSearch} />
        </button>
      </form>
    </>
  );
};
