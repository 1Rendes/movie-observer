import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import { useSelect } from "../hooks/useSelect";
import { readFromSS, writeToSS } from "../helpers/sessionStorage";
import "react-circular-progressbar/dist/styles.css";
import "../components/libStyles.css";
import MovieMainBlock from "../components/MovieMainBlock/MovieMainBlock";
import MovieAdditionalBlock from "../components/MovieAdditionalBlock/MovieAdditionalBlock";
import MoviePageSwiper from "../components/MoviePageSwiper";
import Container from "../components/Container/Container";

const MovieDetailsPage = () => {
  const { type, id } = useParams();
  const query = "";
  const endpoint = useSelect(type, query, id);
  const { data, error } = useFetch(endpoint);
  const location = useLocation();
  writeToSS(location.pathname, location.state);
  const prevLocation = readFromSS(location.pathname);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return !error ? (
    <Container>
      <Toaster />
      <MovieMainBlock data={data} prevLocation={prevLocation} />
      <MovieAdditionalBlock location={location} type={type} />
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
      <MoviePageSwiper location={location} />
    </Container>
  ) : (
    <Navigate to={"/"} />
  );
};

export default MovieDetailsPage;
