import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (endpoint, query, page) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const params = {
      language: "en-US",
      api_key: "a4235cfcff6946cc81f3ca1da1ed5af7",
      query,
      page,
    };
    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint, { params });
        setData(data);
        // console.log("endpoint:", endpoint, "query:", query, data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [endpoint, page, query]);
  return { data, error };
};
