import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const Favorites = () => {
    const { favorites } = useSelector(
        (state) => state.movies
    );

    return (
        <div className="bg-gray-950 min-h-screen text-white py-4 px-0">
            <div className="max-w-7xl mx-auto ">
                <div className="flex items-center justify-between gap-5 mb-5">
                    <h1 className="text-2xl font-bold mt-2 mb-2">
                        My Favorites
                    </h1>
                    <Link to="/">
                        <button className=" bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Go back to Home
                        </button>
                    </Link>
                </div>

                {favorites.length === 0 ? (
                    <p className="flex justify-center items-center h-100 align-center">No favorite movies yet.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {favorites.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                poster={movie.poster}
                                title={movie.title}
                                rating={movie.rating}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;