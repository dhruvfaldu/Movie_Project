import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies, getPopularMovies, setPage, getGenres, getMoviesByGenre, setGenre, searchMovie } from "../store/movies/movieSlice";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import TrendingCarousel from "../components/TrendingCarousel";

const Home = () => {
    const dispatch = useDispatch();

    const { movies, page, totalPages, loading, rating, genres, selectedGenre, query } = useSelector((state) => state.movies);
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

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

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
            <div className="flex items-center mt-5">
                <HeroBanner movies={movies} />
            </div>

            <div className="flex gap-3 flex-wrap mt-5">
                {loading
                    ? [...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="h-8 w-20 bg-gray-600 rounded-full animate-pulse"
                        ></div>
                    ))
                    : genres.map((genre) => (
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

            <h2 className="text-2xl font-bold mb-5 mt-5">
                Trending Movies
            </h2>
            {loading ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-600 h-75 rounded-lg mb-2"></div>
                            <div className="bg-gray-600 h-4 w-3/4 rounded mb-2"></div>
                            <div className="bg-gray-600 h-4 w-1/2 rounded"></div>
                        </div>))}
                </div>
            ) : (
                <>
                    <div>
                        <div className="flex items-center mt-5">
                            <TrendingCarousel movies={movies} />
                        </div>
                    </div>
                </>
            )}

            <h2 className="text-2xl font-bold mb-5 mt-5">
                Popular Movies
            </h2>
            {loading ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-600 h-75 rounded-lg mb-2"></div>
                            <div className="bg-gray-600 h-4 w-3/4 rounded mb-2"></div>
                            <div className="bg-gray-600 h-4 w-1/2 rounded"></div>
                        </div>))}
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

