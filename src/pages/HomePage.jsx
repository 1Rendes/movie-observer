import MovieList from "../components/MovieList";
import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";

const HomePage = () => {
  const endpoint = "/trending/movie/day";
  const { data, error } = useFetch(endpoint);

  error && toast.error(error);

  return (
    <div className={css.homePage}>
      <Toaster />
      Trendings today:
      {data.results && <MovieList movieList={data.results} />}
    </div>
  );
};

export default HomePage;
