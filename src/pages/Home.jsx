import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies, getPopularMovies, setPage, getGenres, getMoviesByGenre, setGenre, searchMovie } from "../store/movies/movieSlice";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import TrendingCarousel from "../components/TrendingCarousel";


const Home = () => {
    const dispatch = useDispatch();

    const { movies, page, totalPages, loading, rating, genres, selectedGenre, query, } = useSelector(
        (state) => state.movies
    );

    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (query && query.length > 2) {
            dispatch(searchMovie({ query, page }));
        }
        else if (selectedGenre) {
            dispatch(getMoviesByGenre({ genreId: selectedGenre, page }));
        }
        else {
            dispatch(getPopularMovies(page));
        }

    }, [dispatch, page, selectedGenre, query]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTrendingMovies());
    }, []);

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
            <div className="flex justify-end items-center">
                <div className="flex flex-col items-end bg-gray-800/90 px-3 py-2 rounded-2xl mt-3 w-fit">
                    <div className="flex flex-row gap-1">
                        <p className="mt-0.5">Welcome</p>
                        <div className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-full text-sm">
                            {user?.name?.charAt(0)}
                        </div>
                        <h2 className="text-white mt-0.5">
                            {user?.name}
                        </h2>
                    </div>
                    <p className="text-gray-400">
                        {user?.email}
                    </p>
                </div>
            </div>

            <div className="flex items-center mt-5">
                <HeroBanner movies={movies} />
            </div>

            <div className="flex gap-3 flex-wrap mt-5">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => dispatch(setGenre(genre.id))}
                        className={`px-4 py-2 rounded-full text-sm transition cursor-pointer 
${selectedGenre === genre.id
                                ? "bg-red-500 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-5">Trending Movies</h2>
            <div className="flex items-center mt-5">
                <TrendingCarousel movies={movies} />
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
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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

                    {filteredMovies.length > 0 && (
                        <div className="flex gap-2 justify-center mt-6 items-center">
                            <button
                                onClick={() => dispatch(setPage(page - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40 cursor-pointer"
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
                                        className={`px-3 py-1 rounded cursor-pointer ${page === num
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
                                className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40 cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Home;

