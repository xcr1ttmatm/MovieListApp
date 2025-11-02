import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

function FavoritesPage({ favorites, toggleFavorite, isFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="relative px-6 py-2.5 bg-gray-900/40 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 rounded-lg hover:border-cyan-400/60 hover:bg-gray-900/60 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">←</span>
            <span className="font-medium">Back to Home</span>
          </span>
        </button>
      </div>


      {favorites.length === 0 ? (
        <div className="relative text-center py-20 bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/10 border border-cyan-500/20 overflow-hidden">
          {/* Holographic background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-8xl mb-6 drop-shadow-2xl">🎬</div>
            <p className="text-cyan-300 text-2xl mb-3 font-medium">No favorites yet</p>
            <p className="text-cyan-400/60 text-base mb-8 max-w-md mx-auto">
              Start adding movies to your favorites by clicking the heart icon
            </p>
            <button
              onClick={() => navigate("/")}
              className="relative px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 border border-cyan-400/30"
            >
              <span className="relative z-10">Browse Movies</span>
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;