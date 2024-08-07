import MovieList from "../components/MovieList";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import homeCss from "./HomePage.module.css";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const endpoint = "/search/movie";
  const { data, error } = useFetch(endpoint, query);

  error && toast.error(error);

  useEffect(() => {
    if (data.total_results === 0)
      toast.error("В базе данных найдено 0 записей");
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();
    if (!query) {
      toast.error("Please fill the request");
    } else {
      setQuery(query);
      const nextParams = query !== "" ? { query } : {};
      setSearchParams(nextParams);
    }
  };

  return (
    <div className={homeCss.homePage}>
      <Toaster />
      <form className={css.form} onSubmit={handleSubmit}>
        <input type="text" name="query" className={css.input} />
        <button type="submit" className={css.button}>
          Go!
        </button>
      </form>
      {data.results && (
        <MovieList movieList={data.results}>MoviesPage</MovieList>
      )}
    </div>
  );
};

export default MoviesPage;
