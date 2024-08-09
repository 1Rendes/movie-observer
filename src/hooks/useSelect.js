import { useMemo } from "react";

export const useSelect = (type, query, id, subFetch) => {
  const endpoint = useMemo(() => {
    if (query) {
      const searchEndpoints = {
        movie: "/search/movie",
        tv: "/search/tv",
      };
      return searchEndpoints[type];
    }
    if (id) {
      if (subFetch) {
        return type === "movie"
          ? `/movie/${id}/${subFetch}`
          : type === "tv"
          ? `/tv/${id}/${subFetch}`
          : "";
      }
      const idEndpoints = {
        movie: `/movie/${id}`,
        tv: `/tv/${id}`,
      };
      return idEndpoints[type] || "";
    }
    return "";
  }, [id, query, subFetch, type]);
  return endpoint;
};
