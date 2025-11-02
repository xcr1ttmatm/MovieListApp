import { useNavigate } from "react-router-dom";

function MovieCard({ movie, toggleFavorite, isFavorite }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite button
    toggleFavorite(movie);
  };

  const favorited = isFavorite(movie.imdbID);

  return (
    <div
      onClick={handleClick}
      className="group relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl rounded-2xl p-4 text-center cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 border border-cyan-500/20 hover:border-cyan-400/50 overflow-hidden"
    >
      {/* Holographic overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-full p-2 shadow-lg shadow-cyan-500/20 hover:scale-110 hover:border-cyan-400/60 transition-all duration-300"
        title={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <span className="text-2xl drop-shadow-lg">
          {favorited ? "❤️" : "🤍"}
        </span>
      </button>

      {/* Movie Poster with glass frame effect */}
      <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/10 mb-3">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
          alt={movie.Title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Glowing border on hover */}
        <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-400/40 transition-all duration-500 pointer-events-none rounded-xl"></div>
      </div>

      <div className="relative z-10">
        <h2 className="font-bold mt-2 text-sm md:text-base text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2">
          {movie.Title}
        </h2>
        <p className="text-sm text-cyan-400/70 mt-1">{movie.Year}</p>
        {movie.Type && (
          <span className="inline-block mt-2 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 px-3 py-1 rounded-full text-xs border border-cyan-500/30 font-medium">
            {movie.Type}
          </span>
        )}
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

export default MovieCard;