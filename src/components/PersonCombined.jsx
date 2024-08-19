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

const PersonCombined = () => {
  const { id } = useParams();
  const type = "person";
  const query = "";
  const endpoint = useSelect(type, query, id, "combined_credits");
  const { data, error } = useFetch(endpoint);
  console.log(data);

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
          {data.cast.map((result) => {
            return (
              <SwiperSlide className="swiper-slide" key={result.credit_id}>
                <Link to={`/${result.media_type}/${result.id}`}>
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

export default PersonCombined;
