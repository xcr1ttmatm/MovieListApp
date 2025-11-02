function GenreFilter({ selectedGenre, setSelectedGenre, viewMode, setViewMode, favoritesCount }) {
  const genres = ["All", "Movie", "Series", "Episode"];

  return (
    <div className="w-full max-w-6xl px-4 mb-6">
      <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/20 p-6 border border-cyan-500/20 overflow-hidden">
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("all")}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "all"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
                  : "bg-gray-900/40 backdrop-blur-sm text-cyan-300 hover:bg-gray-900/60 border border-cyan-500/20 hover:border-cyan-400/40"
              }`}
            >
              All Movies
            </button>
            <button
              onClick={() => setViewMode("favorites")}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                viewMode === "favorites"
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/30 border border-red-400/30"
                  : "bg-gray-900/40 backdrop-blur-sm text-cyan-300 hover:bg-gray-900/60 border border-cyan-500/20 hover:border-cyan-400/40"
              }`}
            >
              <span>❤️</span>
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="bg-white text-red-600 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-lg">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Genre Filter */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-cyan-300 font-medium">Filter by Type:</span>
            <div className="flex gap-2 flex-wrap">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedGenre === genre
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
                      : "bg-gray-900/40 backdrop-blur-sm text-cyan-300 hover:bg-gray-900/60 border border-cyan-500/20 hover:border-cyan-400/40 hover:scale-105"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreFilter;