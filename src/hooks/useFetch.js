import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (endpoints, query) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const params = {
      language: "en-US",
      api_key: "a4235cfcff6946cc81f3ca1da1ed5af7",
      query: query,
    };
    async function fetchData() {
      try {
        const responces = await Promise.all(
          endpoints.map((endpoint) => axios.get(endpoint, { params }))
        );
        const combinedData = responces.map((responce) => responce.data);
        setData(combinedData);
        console.log("endpoints:", endpoints, "query:", query, combinedData);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [endpoints, query]);
  return { data, error };
};
