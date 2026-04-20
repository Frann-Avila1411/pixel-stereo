"use client";
import { motion } from "framer-motion";
import { CeratiSprite } from "../components/world/CeratiSprite";
import { AudioPlayer } from "../components/audio/AudioPlayer";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";
import { useRef, useState } from "react";

// Altura exacta del suelo en píxeles
const GROUND_HEIGHT_PX = 70;
const CERATI_FEET_OFFSET_PX = 60;

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const frequency = useAudioAnalyzer(audioRef.current);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const glowIntensity = isPlaying ? 0.6 + (frequency / 255) * 0.4 : 0.6;

  return (
    <main className="relative h-screen w-full bg-[#0D1237] overflow-hidden">
      {/* CAPA 1: FONDO ESTATICO (Gradiente profundo) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f3a] to-[#07113b]" />

      {/* CAPA 2: NUBES CLARAS fondo principal*/}
      <motion.div
        animate={{ backgroundPositionX: ["0px", "-1024px"] }}
        transition={{ repeat: Infinity, duration: 95, ease: "linear" }}
        className="absolute inset-x-0 top-0 h-[112%] pixelated pointer-events-none transition-opacity duration-75"
        style={{
          backgroundImage: "url('/backgrounds/cloud-light.jpeg')",
          backgroundSize: "auto 60%",
          backgroundPosition: "center -18px",
          backgroundRepeat: "repeat-x",
          opacity: isPlaying ? 0.5 + (frequency / 255) * 0.05 : 0.5,
        }}
      />

      {/* TÍTULO CENTRAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 transition-all duration-75"
        style={{
          transform: `translate(-50%, -50%) scale(${1 + (frequency / 255) * 0.05})`,
        }}
      >
        <h1
          className="text-4xl md:text-6xl text-blue-300"
          style={{ textShadow: `0 0 ${20 + (frequency / 255) * 20}px rgba(147,197,253,${glowIntensity})` }}
        >
          BOCANADA
        </h1>
        <p className="text-[10px] tracking-[0.4em] text-blue-400 mt-4 opacity-70">
          CUANDO NO HAY MÁS QUE DECIRNOS
        </p>
      </motion.div>

      {/* Cerati pixel anclado al suelo */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ bottom: `${GROUND_HEIGHT_PX - CERATI_FEET_OFFSET_PX}px` }} // px para alinear los pies
      >
        <CeratiSprite />
        {/* Sombra proyectada */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/45 blur-sm rounded-full" />
      </div>

      {/* CAPA 5: EL SUELO ANCLADO AL BORDE INFERIOR */}
      <div
        className="absolute inset-x-0 bottom-0 z-[15] overflow-hidden"
        style={{
          height: `${GROUND_HEIGHT_PX}px`
        }}
      >
        <motion.div
          animate={{ backgroundPositionX: ["0px", "-70px"] }}
          transition={{ repeat: Infinity, duration: 0.99, ease: "linear" }}
          className="absolute inset-x-0 top-0 pixelated"
          style={{
            backgroundImage: "url('/backgrounds/ground-texture.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "64px 64px",
            height: "150px",
          }}
        />
      </div>

      {/* REPRODUCTOR DE AUDIO */}
      <AudioPlayer isPlaying={isPlaying} togglePlay={togglePlay} />
      <audio ref={audioRef} src="/audio/bocanada.mp3" loop />

      {/* MARCA PERSONAL Y CRÉDITOS */}
      <div className="absolute bottom-4 right-6 z-50 pointer-events-none">
        <p className="text-[10px] text-blue-500/50 tracking-widest">
          A TRIBUTE BY Frann.Dev
        </p>
      </div>

    </main>
  );

}