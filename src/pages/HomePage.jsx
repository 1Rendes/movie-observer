import toast, { Toaster } from "react-hot-toast";
import { useDefaultFetch } from "../hooks/useDefaultFetch";
import HomeMovieList from "../components/HomeMovieList";
import { useEffect } from "react";
import Container from "../components/Container/Container";

const HomePage = () => {
  const { homePageData, error } = useDefaultFetch();
  const dataHeaders = [
    "Top rated movies:",
    "Upcoming movies:",
    "Trendings series today:",
    "Top rated series:",
  ];
  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <Container>
      <Toaster />
      {homePageData.map((element, index) => {
        const type = element.results[0].title ? "movie" : "tv";
        return (
          <div key={index}>
            <h3>{dataHeaders[index]}</h3>
            <HomeMovieList movieList={element.results} type={type} />
          </div>
        );
      })}
    </Container>
  );
};

export default HomePage;
