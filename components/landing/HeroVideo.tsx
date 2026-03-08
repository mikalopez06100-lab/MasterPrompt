"use client";

import { useRef, useState } from "react";

// URL en dur pour que la vidéo s'affiche en prod (Vercel) sans dépendre de l'env
const VIDEO_SRC =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/videos/bienvenue.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setPlaying(true);
  };

  return (
    <div className="max-w-[760px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video mb-10 relative group">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="w-full h-full object-cover"
        controls={playing}
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-navy to-navy-2/90 cursor-pointer transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-navy"
          aria-label="Lire la vidéo de présentation"
        >
          <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center shadow-[0_0_0_12px_rgba(37,99,235,0.15)] group-hover:scale-105 transition-transform">
            <svg className="w-7 h-7 fill-white ml-1" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <p className="text-sm text-white/50">Présentation de la formation — 55 secondes</p>
        </button>
      )}
    </div>
  );
}
