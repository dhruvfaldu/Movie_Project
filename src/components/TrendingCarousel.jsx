import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

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
          <MovieCard
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingCarousel;