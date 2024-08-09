import MovieList from "../components/MovieList";
import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelect } from "../hooks/useSelect";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [type, setType] = useState(searchParams.get("type"));
  const endpoint = useSelect(type, query);
  const { data, error } = useFetch(endpoint, query);
  const location = useLocation();

  error && toast.error(error);

  useEffect(() => {
    if (location.search) {
      setQuery(searchParams.get("query"));
      setType(searchParams.get("type"));
    } else {
      setQuery("");
      setType("");
    }
  }, [location]);

  return (
    <div className={css.homePage}>
      <Toaster />
      {data.results && <MovieList movieList={data.results} type={type} />}
    </div>
  );
};

export default ResultsPage;
