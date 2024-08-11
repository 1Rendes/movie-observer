import toast, { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";
import { useDefaultFetch } from "../hooks/useDefaultFetch";
import HomeMovieList from "../components/HomeMovieList";

const HomePage = () => {
  const { homePageData, error } = useDefaultFetch();

  error && toast.error(error);

  return (
    <div className={css.homePage}>
      <Toaster />
      <h3>Top rated movies:</h3>
      {homePageData[0] && (
        <HomeMovieList movieList={homePageData[0].results} type={"movie"} />
      )}
      <h3>Upcoming movies:</h3>
      {homePageData[1] && (
        <HomeMovieList movieList={homePageData[1].results} type={"movie"} />
      )}
      <h3>Trendings series today:</h3>
      {homePageData[2] && (
        <HomeMovieList movieList={homePageData[2].results} type={"tv"} />
      )}
      <h3>Top rated series:</h3>
      {homePageData[3] && (
        <HomeMovieList movieList={homePageData[3].results} type={"tv"} />
      )}
    </div>
  );
};

export default HomePage;
