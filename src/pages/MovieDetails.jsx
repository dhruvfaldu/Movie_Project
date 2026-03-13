import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieVideos } from "../services/api";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        const videos = await fetchMovieVideos(id);
        const trailerVideo = videos.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
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

  return (
    <>
      {loading ? (
        <div className="bg-gray-950 text-white min-h-screen p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-pulse">
                <div className="w-full h-[726px] bg-gray-700 rounded-xl"></div>
              </div>

              <div className="animate-pulse">
                <div className="w-full h-[726px] bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-950 text-white min-h-screen p-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="rounded-xl"
                />

                <div>
                  <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

                  <p className="text-yellow-400 mb-3">
                    ⭐ {movie.vote_average}
                  </p>

                  <p className="text-gray-300 mb-4">
                    {movie.overview}
                  </p>

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
                    <button className="mt-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      Go back to Home
                    </button>
                  </Link>
                </div>
              </div>

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
        </>)}
    </>
  );
};

export default MovieDetails;