import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movieTrailer from "movie-trailer";

const API_URL = "https://www.omdbapi.com/?apikey=aaff83d6";

function MovieDetails({ toggleFavorite, isFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details from OMDb API
        const response = await fetch(`${API_URL}&i=${id}`);
        const data = await response.json();
        setMovie(data);
        
        // Fetch trailer from YouTube using movie-trailer package
        if (data.Title && data.Response !== "False") {
          const trailer = await movieTrailer(data.Title, { year: data.Year });
          if (trailer) {
            // Convert YouTube URL to embed format
            const videoId = trailer.split("v=")[1]?.split("&")[0];
            if (videoId) {
              setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWatchOnIMDb = () => {
    if (movie && movie.imdbID) {
      window.open(`https://www.imdb.com/title/${movie.imdbID}/`, '_blank');
    }
  };

  const handleFavoriteClick = () => {
    if (movie) {
      toggleFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-xl text-cyan-300 mt-4 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!movie || movie.Response === "False") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-xl text-cyan-300 mb-4">Movie not found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const favorited = isFavorite(movie.imdbID);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-900/40 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 px-6 py-2.5 rounded-lg hover:border-cyan-400/60 hover:bg-gray-900/60 transition-all duration-300 shadow-lg shadow-cyan-500/10"
        >
          ← Back to Movies
        </button>
        <button
          onClick={handleFavoriteClick}
          className="bg-gray-900/40 backdrop-blur-sm border-2 border-cyan-500/30 px-6 py-2.5 rounded-lg hover:border-cyan-400/60 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/10"
        >
          <span className="text-2xl">{favorited ? "❤️" : "🤍"}</span>
          <span className="font-medium text-cyan-300">
            {favorited ? "Remove from Favorites" : "Add to Favorites"}
          </span>
        </button>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-cyan-400 text-xl font-bold hover:text-cyan-300 bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30"
            >
              ✕ Close
            </button>
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={trailerUrl}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Movie Details Card */}
      <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden border border-cyan-500/20">
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="md:flex relative z-10">
          {/* Poster */}
          <div className="md:w-1/3 relative">
            <div className="relative overflow-hidden">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Details */}
          <div className="md:w-2/3 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {movie.Title}
            </h1>
            <p className="text-cyan-400/70 mb-4 text-lg">{movie.Year} • {movie.Rated} • {movie.Runtime}</p>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-block bg-cyan-500/20 backdrop-blur-sm text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30 font-medium">
                {movie.Type}
              </span>
              <span className="text-cyan-300/80">{movie.Genre}</span>
              
              {/* Action Buttons */}
              <div className="ml-auto flex flex-wrap gap-2">
                {trailerUrl && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-500 hover:to-pink-500 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/30 border border-red-400/30"
                  >
                    ▶ Watch Trailer
                  </button>
                )}
                <button
                  onClick={handleWatchOnIMDb}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold px-4 py-2 rounded-lg hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-yellow-500/30 border border-yellow-400/30"
                >
                  <span className="text-lg">🎬</span> Watch on IMDb
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-cyan-300">Plot</h3>
              <p className="text-cyan-100/80 leading-relaxed">{movie.Plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900/40 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-cyan-300 text-sm">Director</h4>
                <p className="text-cyan-100/80">{movie.Director}</p>
              </div>
              <div className="bg-gray-900/40 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-cyan-300 text-sm">Writer</h4>
                <p className="text-cyan-100/80">{movie.Writer}</p>
              </div>
              <div className="bg-gray-900/40 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-cyan-300 text-sm">Actors</h4>
                <p className="text-cyan-100/80">{movie.Actors}</p>
              </div>
              <div className="bg-gray-900/40 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-cyan-300 text-sm">Released</h4>
                <p className="text-cyan-100/80">{movie.Released}</p>
              </div>
            </div>

            {/* IMDb Rating Highlight */}
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="mb-6 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm border-2 border-yellow-500/40 rounded-xl p-4 shadow-lg shadow-yellow-500/20">
                <div className="flex items-center gap-3">
                  <div className="text-4xl drop-shadow-lg">⭐</div>
                  <div>
                    <h4 className="font-semibold text-yellow-300">IMDb Rating</h4>
                    <p className="text-2xl font-bold text-yellow-400">{movie.imdbRating}/10</p>
                    <p className="text-sm text-yellow-300/70">{movie.imdbVotes} votes</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-cyan-300 mb-2">Other Ratings</h4>
                <div className="flex flex-wrap gap-3">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="bg-gray-900/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/20">
                      <p className="text-xs text-cyan-400/70">{rating.Source}</p>
                      <p className="font-bold text-cyan-300">{rating.Value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="border-t border-cyan-500/20 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-cyan-400/70">Language:</span>
                  <span className="ml-2 text-cyan-300">{movie.Language}</span>
                </div>
                <div>
                  <span className="text-cyan-400/70">Country:</span>
                  <span className="ml-2 text-cyan-300">{movie.Country}</span>
                </div>
                <div>
                  <span className="text-cyan-400/70">Awards:</span>
                  <span className="ml-2 text-cyan-300">{movie.Awards}</span>
                </div>
                <div>
                  <span className="text-cyan-400/70">Box Office:</span>
                  <span className="ml-2 text-cyan-300">{movie.BoxOffice || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default MovieDetails;
