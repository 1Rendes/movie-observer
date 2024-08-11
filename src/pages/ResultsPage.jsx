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
  const endpoints = useSelect(type, query);
  const { data, error } = useFetch(endpoints, query);
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
  }, [data, location, searchParams]);

  return (
    <div className={css.homePage}>
      <Toaster />
      {type === "movie" || type === "all" ? <h3>Movies:</h3> : <h3>Series:</h3>}
      {data.length > 0 && <MovieList movieList={data[0].results} type={type} />}
      {data.length > 0 && data[0].results.length === 0 && (
        <p>We didn&apos;t find any movies with this request</p>
      )}

      {data.length > 1 && (
        <>
          <h3>Series:</h3>
          <MovieList movieList={data[1].results} type={"tv"} />
        </>
      )}
      {data.length > 1 && data[1].results.length === 0 && (
        <p>We didn&apos;t find any series with this request</p>
      )}
    </div>
  );
};

export default ResultsPage;
