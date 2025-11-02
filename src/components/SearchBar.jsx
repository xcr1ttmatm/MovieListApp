function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="my-6 w-full max-w-2xl">
      <div className="relative flex items-center gap-3">
        {/* Search Input with Glass Effect */}
        <div className="relative flex-1">
          {/* Holographic glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-50"></div>
          
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
            className="relative w-full p-4 bg-gray-900/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl text-cyan-100 placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg shadow-cyan-500/10"
          />
          
          {/* Search icon indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/50 text-xl pointer-events-none">
            🔍
          </div>
        </div>

        {/* Search Button with Gradient */}
        <button 
          onClick={onSearch} 
          className="relative px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 border border-cyan-400/30 hover:scale-105"
        >
          <span className="relative z-10">Search</span>
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-white/10 rounded-xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;