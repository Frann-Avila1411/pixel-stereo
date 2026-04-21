"use client";
import React from "react";
import type { Track } from "../../data/tracks";

interface Props {
  isPlaying: boolean;
  togglePlay: () => void;
  openTracklist: () => void;
  currentTrack: Pick<Track, "title" | "artist">;
}

export const AudioPlayer = ({ isPlaying, togglePlay, openTracklist, currentTrack }: Props) => {
  return (
    <div className="fixed bottom-6 left-4 md:bottom-8 md:left-8 z-50 flex flex-col gap-3">
      <div className="max-w-[16rem] border-4 border-[#6ca8ff] bg-[#071225]/95 px-3 py-2 shadow-[0_0_0_4px_rgba(0,0,0,0.35),0_0_24px_rgba(75,126,255,0.2)]">
        <p className="text-[8px] tracking-[0.35em] text-blue-200/70">NOW PLAYING</p>
        <p className="mt-1 text-[10px] text-white leading-tight">{currentTrack.title}</p>
        <p className="text-[8px] text-blue-200/80 leading-tight">{currentTrack.artist}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-[36px] h-[36px] md:w-[64px] md:h-[64px] pixelated hover:scale-110 active:scale-95 transition-transform"
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

        <button
          onClick={openTracklist}
          className="w-[36px] h-[36px] md:w-[64px] md:h-[64px] pixelated hover:scale-110 active:scale-95 transition-transform"
          style={{
            backgroundImage: "url('/sprites/guitar-icon.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          aria-label="Abrir menú de canciones"
        />
      </div>
    </div>
  );
};