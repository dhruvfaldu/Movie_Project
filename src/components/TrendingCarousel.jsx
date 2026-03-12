import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";

const TrendingCarousel = () => {

  const { trending } = useSelector((state) => state.movies);

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {trending.map((movie) => (
        <SwiperSlide key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingCarousel;