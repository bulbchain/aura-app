import logo from "/tenix-logo.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0F1A]">
      
      {/* Glow background */}
      <div className="absolute w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />

      {/* Logo */}
      <img
        src={logo}
        alt="Tenix Loading"
        className="relative w-24 mb-6
                   animate-[float_3s_ease-in-out_infinite]
                   drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]"
      />

      {/* Spinner */}
      <div className="relative h-8 w-8 rounded-full
                      border-2 border-white/20 border-t-cyan-400
                      animate-spin" />

      {/* Text */}
      <p className="relative mt-4 text-xs tracking-widest text-white/60 uppercase">
        Initializing Tenix
      </p>
    </div>
  );
};

export default Loader;
