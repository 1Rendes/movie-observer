import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (endpoint, query) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const params = {
      language: "en-US",
      api_key: "a4235cfcff6946cc81f3ca1da1ed5af7",
    };
    if (endpoint === "/search/movie" && !query) {
      return;
    } else if (endpoint === "/search/movie" && query) {
      params.query = query;
    }
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await axios.get(endpoint, { params });
        setData(data);
        // console.log("endpoint:", endpoint, "query:", query, data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint, query]);
  return { data, loading, error };
};
