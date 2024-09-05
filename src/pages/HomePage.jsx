import { useDefaultFetch } from "../hooks/useDefaultFetch";
import HomeMovieList from "../components/HomeMovieList";
import Container from "../components/Container/Container";

const HomePage = () => {
  const { homePageData } = useDefaultFetch();
  const dataHeaders = [
    "Top rated movies:",
    "Upcoming movies:",
    "Trendings series today:",
    "Top rated series:",
  ];

  return (
    <Container>
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
