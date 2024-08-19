import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelect } from "../hooks/useSelect";
import ResultsList from "../components/ResultsList";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [type, setType] = useState(searchParams.get("type"));
  const [page] = useState(1);
  const endpoint = useSelect(type, query);
  const { data, error } = useFetch(endpoint, query, page);
  const location = useLocation();

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  useEffect(() => {
    if (location.search) {
      setQuery(searchParams.get("query"));
      setType(searchParams.get("type"));
    } else {
      setQuery("");
      setType("");
    }
  }, [location, searchParams]);

  return (
    <div className={css.homePage}>
      <Toaster />
      <h3>Results:</h3>
      {data && <ResultsList movieList={data.results} type={type} />}
      {data?.results?.length === 0 && (
        <p>We didn&apos;t find any data for Your request</p>
      )}
    </div>
  );
};

export default ResultsPage;
