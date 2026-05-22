export default function BannerReel() {
  return (
    <div className="relative" style={{ backgroundColor: "#F7E1B1" }}>
      {/* Caption strip */}
      <div className="flex items-center justify-between px-8 md:px-16 pt-10 pb-6">
        <span className="text-[0.55rem] uppercase tracking-[0.45em] text-dark-brown/70">
          Now Playing
        </span>
        <div className="flex items-center gap-3 text-[0.55rem] uppercase tracking-[0.4em] text-dark-brown/70">
          <span className="hidden sm:inline">Selected Work</span>
          <span className="w-6 h-px bg-dark-brown/40" />
          <span>2010 — 2025</span>
        </div>
      </div>

      <video
        src="/videos/banner-web-about.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full block"
      />

      {/* Caption bottom */}
      <div className="flex items-center justify-between px-8 md:px-16 pt-6 pb-10">
        <span className="text-[0.55rem] uppercase tracking-[0.4em] text-dark-brown/70">
          Batalla Studio · Rosario, AR
        </span>
        <span className="text-[0.55rem] uppercase tracking-[0.4em] text-dark-brown/55">
          CGI · VFX · Post
        </span>
      </div>
    </div>
  );
}
