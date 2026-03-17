import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../store/movies/movieSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { fetchMovieDetails, fetchMovieVideos } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { favorites } = useSelector((state) => state.movies);

  // ✅ FIX: string vs number
  const isFavorite = favorites.some((fav) => fav.id === Number(id));

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        const videos = await fetchMovieVideos(id);

        const trailerVideo = videos.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setMovie(data);
        setTrailer(trailerVideo);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  // ✅ Safety (important)
  if (loading || !movie) {
    return (
      <div className="bg-gray-950 text-white min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-pulse">
              <div className="w-full h-96 bg-gray-700 rounded-xl"></div>
            </div>
            <div className="animate-pulse">
              <div className="w-full h-96 bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* 🎬 Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl"
          />

          <div>
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <div className="flex gap-3 items-center mb-3">
              <p className="text-yellow-400 flex items-center gap-1 text-sm">
                <FcRating className="text-xl" />
                {movie.vote_average}
              </p>
              <button
                onClick={() => {
                  if (isFavorite) {
                    dispatch(removeFavorite(Number(id)));
                    toast.info(`${movie.title} Removed from Favorites`);
                  } else {
                    dispatch(
                      addFavorite({
                        id: Number(id),
                        poster: movie.poster_path,
                        title: movie.title,
                        rating: movie.vote_average,
                      })
                    );
                    toast.success(`${movie.title} Added to Favorites ❤️`);
                  }
                }}
                className="cursor-pointer"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-600" />
                ) : (
                  <FaRegHeart className="text-white" />
                )}
              </button>
            </div>

            <p className="text-gray-300 mb-4">{movie.overview}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Genres:</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/">
              <button className="mt-6 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
                Go back to Home
              </button>
            </Link>
          </div>
        </div>

        {/* 🎥 Trailer */}
        {trailer && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;