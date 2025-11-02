function Footer() {
  return (
    <footer className="relative py-8 text-sm border-t border-cyan-500/20 overflow-hidden">
      {/* Holographic background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
          <span className="text-2xl drop-shadow-lg">🎬</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
        </div>
        
        <p className="text-cyan-400/70 font-light tracking-wide">
          © 2025 <span className="text-cyan-300 font-medium">MovieScope</span>
        </p>
        
        <p className="text-cyan-500/50 text-xs mt-1">
          Powered by Mikel
        </p>
      </div>
    </footer>
  );
}

export default Footer;