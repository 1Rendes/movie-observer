import SwiperList from "./SwiperList";

const MoviePageSwiper = ({ location }) => {
  return (
    <div>
      <h4>Related content:</h4>
      <SwiperList
        state={location}
        path={"results"}
        subFetch={"recommendations"}
        pathId={"id"}
      />
    </div>
  );
};

export default MoviePageSwiper;
