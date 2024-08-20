import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelect } from "../hooks/useSelect";
import ResultsList from "../components/ResultsList";
import { LoadMoreResults } from "../components/LoadMoreResults";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [type, setType] = useState(searchParams.get("type"));
  const [page, setPage] = useState(1);
  const endpoint = useSelect(type, query);
  const { data, error } = useFetch(endpoint, query, page);
  const location = useLocation();
  const [renderData, setRenderData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  useEffect(() => {
    if (page === 1) return;
    window.scrollBy({
      top: 500,
      behavior: "smooth",
    });
  }, [page, renderData]);

  useEffect(() => {
    if (!data) return;
    console.log(renderData);

    setTotalPages(data.total_pages);
    setRenderData((prevData) => {
      return [...prevData, ...data.results];
    });
  }, [data]);

  useEffect(() => {
    if (location.search) {
      setQuery(searchParams.get("query"));
      setType(searchParams.get("type"));
      setPage(1);
      setRenderData([]);
    } else {
      setQuery("");
      setType("");
    }
  }, [location, searchParams]);

  return (
    <div className={css.homePage}>
      <Toaster />
      <h3>Results:</h3>
      {data && <ResultsList movieList={renderData} type={type} />}
      {data?.results?.length === 0 && (
        <p>We didn&apos;t find any data for Your request</p>
      )}
      {page < totalPages && <LoadMoreResults handleLoadMore={handleLoadMore} />}
    </div>
  );
};

export default ResultsPage;
