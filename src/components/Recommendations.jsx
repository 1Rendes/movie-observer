import { Link, useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import "./swiperStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MovieListItem } from "./MovieListItem";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Recommendations = ({ state }) => {
  const { type, id } = useParams();
  const query = "";
  const endpoint = useSelect(type, query, id, "recommendations");
  const { data, error } = useFetch(endpoint);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <h4>Recommendations for this content:</h4>
      {data && (
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiperButtonPrev",
            nextEl: ".swiperButtonNext",
          }}
          className="swiperWraper"
          slidesPerView={2}
          spaceBetween={15}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
          }}
        >
          {data.results.map((result) => {
            return (
              <SwiperSlide className="swiper-slide" key={result.id}>
                <Link to={`/${result.media_type}/${result.id}`} state={state}>
                  <MovieListItem result={result} />
                </Link>
              </SwiperSlide>
            );
          })}
          <IoIosArrowBack className="swiperButtonPrev" />
          <IoIosArrowForward className="swiperButtonNext" />
        </Swiper>
      )}
    </>
  );
};

export default Recommendations;
