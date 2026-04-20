"use client";
import React from "react";

interface Props {
  isPlaying: boolean;
  togglePlay: () => void;
}

export const AudioPlayer = ({ isPlaying, togglePlay }: Props) => {
  return (
    <div className="fixed bottom-8 left-6 md:bottom-10 md:left-8 z-50 flex flex-col items-center gap-2">
      <button
        onClick={togglePlay}
        className="w-[32px] h-[32px] md:w-[64px] md:h-[64px] pixelated hover:scale-110 active:scale-95 transition-transform"
        style={{
          backgroundImage: isPlaying 
            ? "url('/sprites/pause-icon.png')" 
            : "url('/sprites/play-icon.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      />
    </div>
  );
};