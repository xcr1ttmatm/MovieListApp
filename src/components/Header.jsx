import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="relative w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-10 px-4 shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/20 overflow-hidden">
      {/* Holographic background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <Link to="/" className="group inline-block hover:scale-105 transition-transform duration-300">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
              MovieScope
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
              <p className="text-cyan-300/80 text-sm md:text-base font-light tracking-wider">
                Discover and explore your favorite movies
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
            </div>
            
            {/* Animated underline effect */}
            <div className="mt-3 h-1 w-0 group-hover:w-32 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/50"></div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;