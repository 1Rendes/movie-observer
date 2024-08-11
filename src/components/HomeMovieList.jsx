import { Link, useLocation } from "react-router-dom";
import "./swiperStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MovieListItem } from "./MovieListItem";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const HomeMovieList = ({ movieList, type }) => {
  const location = useLocation();
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: ".swiperButtonPrev",
        nextEl: ".swiperButtonNext",
      }}
      className="swiperWraper"
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 15,
        },
      }}
    >
      {movieList.map((result) => {
        return (
          <SwiperSlide className="swiperSlide" key={result.id}>
            <Link to={`/${type}/${result.id}`} state={location}>
              <MovieListItem result={result} />
            </Link>
          </SwiperSlide>
        );
      })}
      <IoIosArrowBack className="swiperButtonPrev" />
      <IoIosArrowForward className="swiperButtonNext" />
    </Swiper>
  );
};

export default HomeMovieList;
