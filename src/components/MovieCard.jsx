import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/movies/movieSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { toast } from "react-toastify";


const MovieCard = ({ id, poster, title, rating }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.movies);

  const isFavorite = favorites.some(
    (fav) => fav.id === id
  );

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h3 className="text-sm font-semibold h-8">{title}</h3>
        <button
          onClick={() => {
            if (isFavorite) {
              dispatch(removeFavorite(id));
              toast.info(`${title} Removed from Favorites `);
            } else {
              dispatch(addFavorite({ id, poster, title, rating }));
              toast.success(`${title} Added to Favorites ❤️`);
            }
          }
          }
          className="flex mt-1 items-center justify-between gap-3 w-full py-1 rounded text-sm hover:bg-gray-700 cursor-pointer"
        >
          <p className="text-yellow-400 flex items-center gap-1 text-sm ">
            <FcRating className="text-xl" /> {rating}
          </p>
          {isFavorite ? (
            <FaHeart className="text-red-600" />
          ) : (
            <FaRegHeart className="text-white" />
          )}
        </button>

        <Link
          to={`/movie/${id}`}
          className="block text-center mt-2 bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-md text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;