import { useDispatch, useSelector } from "react-redux";
import { searchMovie, setRating } from "../store/movies/movieSlice";
import { useState, useEffect } from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import useDebounce from "../hook/useDebounce";

const Navbar = () => {
  const dispatch = useDispatch();
  const { favorites, rating } = useSelector((state) => state.movies);

  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const debouncedQuery = useDebounce(query, 2000);

  const favoriteCount = favorites.length;

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      dispatch(searchMovie(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bg-gray-900 rounded-xl p-4 sticky top-2 z-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center text-white text-xl md:text-2xl font-bold">
          <BiSolidCameraMovie />
          <Link to="/">
            <span className="ml-2">MovieApp</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">

          <Link
            to="/favorites"
            className="text-white text-lg flex items-center"
          >
            ❤️
            <sup className="text-xs ml-1">{favoriteCount}</sup>
          </Link>

          <select
            value={rating}
            onChange={(e) =>
              dispatch(setRating(Number(e.target.value)))
            }
            className="bg-gray-800 text-white px-3 py-2 rounded w-full sm:w-auto"
          >
            <option value="0">All Ratings ⭐</option>
            <option value="5">5+ Ratings</option>
            <option value="6">6+ Ratings</option>
            <option value="7">7+ Ratings</option>
            <option value="8">8+ Ratings</option>
          </select>

          <div className="relative w-full sm:w-64">
            <div className="absolute left-2 top-2 text-gray-400 text-lg">
              <IoSearch />
            </div>

            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={handleSearch}
              className="w-full pl-8 pr-3 py-2 rounded bg-gray-800 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;