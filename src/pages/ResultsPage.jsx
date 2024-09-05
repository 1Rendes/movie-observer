import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelect } from "../hooks/useSelect";
import ResultsList from "../components/ResultsList/ResultsList";
import { LoadMoreResults } from "../components/LoadMoreResults/LoadMoreResults";
import { writeToSS } from "../helpers/sessionStorage";
import Container from "../components/Container/Container";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [type, setType] = useState(searchParams.get("type"));
  const [page, setPage] = useState(1);
  const endpoint = useSelect(type, query);
  const { data, error } = useFetch(endpoint, query, page);
  const [renderData, setRenderData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };
  const location = useLocation();
  writeToSS(location.pathname);

  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (page === 1) return;
    window.scrollBy({
      top: 500,
      behavior: "smooth",
    });
  }, [renderData, page]);

  useEffect(() => {
    if (!data) return;
    setTotalPages(data.total_pages);
    setRenderData((prevData) => {
      return [...prevData, ...data.results];
    });
  }, [data]);

  useEffect(() => {
    if (searchParams.get("query")) {
      setQuery(searchParams.get("query"));
      setType(searchParams.get("type"));
      setPage(1);
      setRenderData([]);
    } else {
      setQuery("");
      setType("");
    }
  }, [searchParams]);

  return (
    <Container>
      <Toaster />
      <h3>Results: {query}</h3>
      {data && <ResultsList movieList={renderData} type={type} />}
      {data?.results?.length === 0 && (
        <p>We didn&apos;t find any data for Your request</p>
      )}
      {page < totalPages && <LoadMoreResults handleLoadMore={handleLoadMore} />}
    </Container>
  );
};

export default ResultsPage;
