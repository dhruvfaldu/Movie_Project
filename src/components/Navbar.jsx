import * as Select from "@radix-ui/react-select";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { setRating, setQuery } from "../store/movies/movieSlice";
import { useState, useEffect } from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import useDebounce from "../hook/useDebounce";
import { logoutUser } from "../store/movies/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const dispatch = useDispatch();
  const { favorites, rating } = useSelector((state) => state.movies);

  const [query, setLocalQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const favoriteCount = favorites.length;

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info(`${user.name} Logged out successfully`);
  };

  const handleSearch = (e) => {
    setLocalQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(setQuery(debouncedQuery || ""));
  }, [debouncedQuery, dispatch]);

  return (
    <div className="bg-gray-900 rounded-xl p-4 top-2 z-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center text-white text-xl md:text-2xl font-bold">
          <span className="bg-red-500 px-2 py-2 rounded-full">
            <BiSolidCameraMovie />
          </span>
          <Link to="/">
            <span className="ml-2">MovieApp</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <Link to="/favorites" className="text-white text-lg">
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition shadow-md cursor-pointer">
              <span className="font-medium">Favorites</span>

              <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
                {favoriteCount}
              </span>
            </button>
          </Link>

          <Select.Root
            value={String(rating)}
            onValueChange={(value) => dispatch(setRating(Number(value)))}
          >
            <Select.Trigger className="flex items-center justify-between gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md sm:w-44 cursor-pointer">
              <Select.Value placeholder="Rating ⭐" />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={6}
                className="bg-gray-800 text-white rounded-lg shadow-xl sm:w-44 z-50 border border-gray-700"
              >
                <Select.Viewport className="p-2">
                  <Select.Item value="0" className="px-3 py-2 rounded hover:bg-gray-700 cursor-pointer">
                    <Select.ItemText>All Ratings ⭐</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="5" className="px-3 py-2 rounded hover:bg-gray-700 cursor-pointer">
                    <Select.ItemText>5+ ⭐</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="6" className="px-3 py-2 rounded hover:bg-gray-700 cursor-pointer">
                    <Select.ItemText>6+ ⭐</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="7" className="px-3 py-2 rounded hover:bg-gray-700 cursor-pointer">
                    <Select.ItemText>7+ ⭐</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="8" className="px-3 py-2 rounded hover:bg-gray-700 cursor-pointer">
                    <Select.ItemText>8+ ⭐</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <div className="relative w-full sm:w-64">
            <div className="absolute left-2 top-3 text-gray-400 text-lg">
              <IoSearch />
            </div>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={handleSearch}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white font-bold rounded-full cursor-pointer hover:scale-110 transition">
                {firstLetter}
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="bg-gray-800 text-white rounded-lg shadow-xl w-56 p-4 border border-gray-700 z-50"
              >
                <div className="mb-3 wrap-break-word">
                  <p className="font-semibold">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenu.Separator className="h-px bg-gray-700 my-2" />
                <DropdownMenu.Item
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-center cursor-pointer"
                >
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};

export default Navbar;