"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CeratiSprite } from "../components/world/CeratiSprite";
import { AudioPlayer } from "../components/audio/AudioPlayer";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";
import { TRACKS, type Track } from "../data/tracks";

// Altura exacta del suelo en píxeles
const GROUND_HEIGHT_PX = 70;
const CERATI_FEET_OFFSET_PX = 60;
const CLOUD_IMAGE = "url('/backgrounds/cloud-light.jpeg')";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTracklistOpen, setIsTracklistOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS[0]);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const frequency = useAudioAnalyzer(audioElement);

  const handleAudioElementRef = (element: HTMLAudioElement | null) => {
    audioElementRef.current = element;
    setAudioElement(element);
  };

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audioElementInstance = audioElementRef.current;

    if (!audioElementInstance) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioElementInstance.addEventListener("play", handlePlay);
    audioElementInstance.addEventListener("pause", handlePause);

    return () => {
      audioElementInstance.removeEventListener("play", handlePlay);
      audioElementInstance.removeEventListener("pause", handlePause);
    };
  }, [audioElement]);

  useEffect(() => {
    const audioElementInstance = audioElementRef.current;

    if (!audioElementInstance) {
      return;
    }

    const shouldResume = isPlayingRef.current;
    audioElementInstance.pause();
    audioElementInstance.currentTime = 0;
    audioElementInstance.load();

    if (!shouldResume) {
      return;
    }

    const handleCanPlay = () => {
      audioElementInstance.play().catch(() => setIsPlaying(false));
    };

    audioElementInstance.addEventListener("canplay", handleCanPlay, { once: true });

    return () => {
      audioElementInstance.removeEventListener("canplay", handleCanPlay);
    };
  }, [audioElement, currentTrack.id]);

  const togglePlay = () => {
    const audioElementInstance = audioElementRef.current;

    if (!audioElementInstance) {
      return;
    }

    if (audioElementInstance.paused) {
      audioElementInstance.play().catch(() => setIsPlaying(false));
    } else {
      audioElementInstance.pause();
    }
  };

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsTracklistOpen(false);
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* CAPA 1: FONDO ESTATICO (Gradiente profundo) */}
      <motion.div
        animate={{ backgroundColor: currentTrack.theme.backgroundBottom }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      <motion.div
        animate={{ backgroundColor: currentTrack.theme.backgroundTop }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute inset-0 opacity-85"
      />

      {/* CAPA 2: NUBES CLARAS fondo principal*/}
      <motion.div
        animate={{ backgroundPositionX: ["0px", "-1024px"] }}
        transition={{ repeat: Infinity, duration: 95, ease: "linear" }}
        className="absolute inset-x-0 top-0 h-[112%] pixelated pointer-events-none transition-opacity duration-75"
        style={{
          backgroundImage: CLOUD_IMAGE,
          backgroundSize: "auto 60%",
          backgroundPosition: "center -18px",
          backgroundRepeat: "repeat-x",
          opacity: isPlaying ? 0.52 + (frequency / 255) * 0.05 : 0.48,
        }}
      />

      <motion.div
        animate={{ backgroundColor: currentTrack.theme.cloudTint }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
      />

      <motion.div
        animate={{ backgroundColor: currentTrack.theme.haze, opacity: isPlaying ? 0.45 : 0.3 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
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
          className="text-4xl md:text-6xl text-[#d7ebff]"
          style={{
            textShadow: `0 0 ${20 + (frequency / 255) * 20}px ${currentTrack.theme.glow}`,
          }}
        >
          {currentTrack.title.toUpperCase()}
        </h1>
        <p className="text-[10px] tracking-[0.4em] text-blue-100 mt-4 opacity-70">
          {currentTrack.mood.toUpperCase()}
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
      <AudioPlayer
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        openTracklist={() => setIsTracklistOpen(true)}
        currentTrack={currentTrack}
      />
      <audio ref={handleAudioElementRef} src={currentTrack.src} loop preload="auto" />

      <AnimatePresence>
        {isTracklistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
            onClick={() => setIsTracklistOpen(false)}
          >
            <motion.aside
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-xl border-4 px-4 py-5 text-left shadow-[0_0_0_6px_rgba(0,0,0,0.35),0_0_40px_rgba(0,0,0,0.4)]"
              style={{
                backgroundColor: currentTrack.theme.panelBackground,
                borderColor: currentTrack.theme.panelBorder,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.08)_50%)] bg-[length:100%_4px]" />

              <div
                className="relative flex items-start justify-between gap-4 border-b-4 pb-3"
                style={{ borderColor: currentTrack.theme.panelBorder }}
              >
                <div>
                  <p className="text-[8px] tracking-[0.45em] text-blue-100/70">TRACKLIST</p>
                  <h2 className="mt-2 text-lg text-white">Menú de canciones</h2>
                </div>

                <button
                  onClick={() => setIsTracklistOpen(false)}
                  className="border-4 px-3 py-2 text-[10px] text-white transition-transform hover:scale-105"
                  style={{ borderColor: currentTrack.theme.panelBorder }}
                >
                  X
                </button>
              </div>

              <div className="relative mt-4 space-y-3">
                {TRACKS.map((track) => {
                  const isActive = track.id === currentTrack.id;

                  return (
                    <button
                      key={track.id}
                      onClick={() => selectTrack(track)}
                      className="flex w-full items-center justify-between gap-4 border-4 px-4 py-3 text-left transition-transform hover:-translate-y-0.5"
                      style={{
                        borderColor: isActive ? track.theme.accent : "rgba(255,255,255,0.22)",
                        backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.18)",
                      }}
                    >
                      <div>
                        <p className="text-sm text-white">{track.title}</p>
                        <p className="mt-1 text-[8px] tracking-[0.3em] text-blue-100/75">
                          {track.artist} - {track.album} ({track.year})
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className="border-2 px-2 py-1 text-[8px] tracking-[0.35em]"
                          style={{
                            borderColor: isActive ? track.theme.accent : "rgba(255,255,255,0.2)",
                            color: isActive ? track.theme.accent : "rgba(255,255,255,0.75)",
                          }}
                        >
                          {isActive ? "SELECTED" : "READY"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="relative mt-4 text-[8px] leading-relaxed tracking-[0.3em] text-blue-100/55">
                Selecciona una pista para cambiar el entorno sin cortar la animación del personaje.
              </p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MARCA PERSONAL Y CRÉDITOS */}
      <div className="absolute bottom-4 right-6 z-50 pointer-events-none">
        <p className="text-[10px] text-white/50 tracking-widest">
          A TRIBUTE BY Frann.Dev
        </p>
      </div>

    </main>
  );

}