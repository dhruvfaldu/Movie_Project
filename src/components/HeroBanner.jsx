import { useState, useEffect } from "react";

const HeroBanner = ({ movies }) => {
    const [movie, setMovie] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (movies.length === 0) return;

        const randomMovie =
            movies[Math.floor(Math.random() * movies.length)];

        setMovie(randomMovie);

        const interval = setInterval(() => {
            const randomMovie =
                movies[Math.floor(Math.random() * movies.length)];

            setImageLoaded(false);
            setMovie(randomMovie);
        }, 1500);

        return () => clearInterval(interval);
    }, [movies]);

    if (!movie) return null;

    return (
        <div className="relative h-[80vh] w-full text-white">

            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse "></div>
            )}

            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
            />

            <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent"></div>

            <div className="absolute bottom-20 left-10 right-10 max-w-xl">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

                <p className="text-gray-300 mb-6 line-clamp-3">
                    {movie.overview}
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    <button className="bg-red-600 px-6 py-3 rounded">
                        ▶ Play Trailer
                    </button>

                    <button className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-800">
                        ℹ More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;