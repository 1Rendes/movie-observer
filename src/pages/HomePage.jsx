import MovieList from "../components/MovieList";
// import { useFetch } from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";
// import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useSelect } from "../hooks/useSelect";
import { useDefaultFetch } from "../hooks/useDefaultFetch";

const HomePage = () => {
  const { homePageData, error } = useDefaultFetch();

  useEffect(() => {
    console.log(homePageData[0]);
  }, [homePageData]);

  error && toast.error(error);

  return (
    <div className={css.homePage}>
      <Toaster />
      Top rated movies:
      {homePageData[0] && (
        <MovieList movieList={homePageData[0].results} type={"movie"} />
      )}
      Upcoming movies:
      {homePageData[0] && (
        <MovieList movieList={homePageData[1].results} type={"movie"} />
      )}
      Trendings series today:
      {homePageData[0] && (
        <MovieList movieList={homePageData[2].results} type={"tv"} />
      )}
      Top rated series:
      {homePageData[0] && (
        <MovieList movieList={homePageData[3].results} type={"tv"} />
      )}
    </div>
  );
};

export default HomePage;
