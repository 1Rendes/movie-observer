import { Link, useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import "./libStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MovieListItem } from "./MovieListItem/MovieListItem";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SwiperList = ({ state, path, subFetch, pathId }) => {
  const { type = "person", id } = useParams();
  const query = "";
  const endpoint = useSelect(type, query, id, subFetch);
  const { data, error } = useFetch(endpoint);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
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
          {data[path]?.map((result) => {
            return (
              <SwiperSlide className="swiper-slide" key={result[pathId]}>
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

export default SwiperList;
