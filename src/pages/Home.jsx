import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies,setPage, getGenres, getMoviesByGenre, setGenre } from "../store/movies/movieSlice";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
    // const [selectedGenre, setSelectedGenre] = useState("");
    const dispatch = useDispatch();

    const { movies, page, totalPages, loading, rating, genres, selectedGenre } = useSelector(
        (state) => state.movies
    );

    useEffect(() => {
        if (selectedGenre) {
            dispatch(getMoviesByGenre({ genreId: selectedGenre, page }));
        } else {
            dispatch(getPopularMovies(page));
        }
    }, [dispatch, page, selectedGenre]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    let filteredMovies = [...movies];
    if (rating) {
        filteredMovies = filteredMovies.filter(
            (movie) => movie.vote_average >= rating
        );
    }

    if (selectedGenre) {
        filteredMovies = filteredMovies.filter((movie) =>
            movie.genre_ids.includes(Number(selectedGenre))
        );
    }

    const getPagination = () => {
        const pages = [];
        pages.push(1);

        const start = Math.max(2, page - 2);
        const end = Math.min(totalPages - 1, page + 2);

        if (start > 2) {
            pages.push("...");
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (end < totalPages - 1) {
            pages.push("...");
        }
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <>
            <div className="flex items-center mt-5  ">
                <HeroBanner movies={movies} />
            </div>

            <div className="flex gap-3 flex-wrap mt-5">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => dispatch(setGenre(genre.id))}
                        className={`px-4 py-2 rounded-full text-sm transition
${selectedGenre === genre.id
                                ? "bg-red-600 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            
            <h2 className="text-2xl font-bold mb-5 mt-5">
                Popular Movies
            </h2>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                poster={movie.poster_path}
                                title={movie.title}
                                rating={movie.vote_average}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2 justify-center mt-6 items-center">
                        <button
                            onClick={() => dispatch(setPage(page - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40"
                        >
                            Prev
                        </button>

                        {getPagination().map((num, index) =>
                            num === "..." ? (
                                <span key={`dots-${index}`} className="px-2">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={`page-${num}`}
                                    onClick={() => dispatch(setPage(num))}
                                    className={`px-3 py-1 rounded ${page === num
                                        ? "bg-red-600"
                                        : "bg-gray-800 hover:bg-gray-700"
                                        }`}
                                >
                                    {num}
                                </button>
                            )
                        )}

                        <button
                            onClick={() => dispatch(setPage(page + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;

