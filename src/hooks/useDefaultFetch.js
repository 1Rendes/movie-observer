import axios from "axios";
import { useEffect, useState } from "react";

export const useDefaultFetch = () => {
  const [homePageData, setHomePageData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const endpoints = [
      "/movie/top_rated",
      "/movie/upcoming",
      "/trending/tv/day",
      "/tv/top_rated",
    ];

    const params = {
      language: "en-US",
      api_key: "a4235cfcff6946cc81f3ca1da1ed5af7",
    };

    async function fetchData() {
      try {
        const responses = await Promise.all(
          endpoints.map((endpoint) => axios.get(endpoint, { params }))
        );
        const combinedData = responses.map((response) => response.data);
        setHomePageData(combinedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { homePageData, error, loading };
};
