import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";

const TrendingCarousel = () => {

  const { trending } = useSelector((state) => state.movies);

  return (
    <Swiper
      spaceBetween={20}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}

      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
    >
      {trending.map((movie) => (
        <SwiperSlide key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="rounded-lg w-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingCarousel;