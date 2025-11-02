import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FavoritesPage from "./components/FavoritesPage";

const API_URL = "http://www.omdbapi.com/?apikey=aaff83d6";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("all");

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
      setViewMode("all");
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.imdbID === movie.imdbID);
      if (exists) {
        return prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };

  const filteredMovies = 
    viewMode === "favorites"
      ? favorites
      : selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.Type === selectedGenre.toLowerCase());

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
        {/* Animated holographic background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
          
          {/* Animated blur circles */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-scanline opacity-10"></div>
        </div>

        <Header />
        
        <main className="relative z-10 flex-grow flex flex-col items-center">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                  />
                  <GenreFilter
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    favoritesCount={favorites.length}
                  />
                  <MovieList
                    movies={filteredMovies}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                    viewMode={viewMode}
                  />
                </>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <MovieDetails
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              }
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;