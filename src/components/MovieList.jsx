import MovieCard from "./MovieCard";

function MovieList({ movies, toggleFavorite, isFavorite, viewMode }) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative inline-block">
          {/* Holographic glow effect */}
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/20 border border-cyan-500/20 p-12 max-w-md mx-auto">
            <div className="text-7xl mb-6 drop-shadow-2xl">
              {viewMode === "favorites" ? "❤️" : "🎬"}
            </div>
            <p className="text-cyan-300 text-xl font-medium mb-3">
              {viewMode === "favorites" 
                ? "No favorites yet"
                : "No movies found"}
            </p>
            {viewMode === "favorites" && (
              <p className="text-cyan-400/60 text-sm">
                Click the heart icon on any movie to add it to your favorites
              </p>
            )}
            {viewMode !== "favorites" && (
              <p className="text-cyan-400/60 text-sm">
                Try searching for a different movie
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl px-4 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;