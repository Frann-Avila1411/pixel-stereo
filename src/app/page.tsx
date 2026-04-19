"use client";
import { motion } from "framer-motion";
import { CeratiSprite } from "../components/world/CeratiSprite";

// Altura exacta del suelo en píxeles
const GROUND_HEIGHT_PX = 120;

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-[#000814] overflow-hidden">
      {/* CAPA 1: FONDO ESTATICO (Gradiente profundo) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001d3d] to-[#000814]" />

      {/* CAPA 2: NUBES OSCURAS (Movimiento lento) */}
      <motion.div
        animate={{ backgroundPositionX: ["0px", "-1024px"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute inset-0 opacity-40 pixelated pointer-events-none"
        style={{
          backgroundImage: "url('/backgrounds/clouds-dark.png')",
          backgroundSize: "512px auto",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* CAPA 3: NUBES CLARAS (Movimiento medio) */}
      <motion.div
        animate={{ backgroundPositionX: ["0px", "-1024px"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute inset-0 opacity-60 pixelated pointer-events-none"
        style={{
          backgroundImage: "url('/backgrounds/clouds-light.png')",
          backgroundSize: "600px auto",
          backgroundRepeat: "repeat-x",
          top: "10%",
        }}
      />

      {/* TÍTULO CENTRAL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
      >
        <h1 className="text-4xl md:text-6xl text-blue-300 drop-shadow-[0_0_20px_rgba(147,197,253,0.6)]">
          BOCANADA
        </h1>
        <p className="text-[10px] tracking-[0.4em] text-blue-400 mt-4 opacity-70">
          CUANDO NO HAY MÁS QUE DECIRNOS
        </p>
      </motion.div>

      {/* Cerati pixel anclado al suelo */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ bottom: `${GROUND_HEIGHT_PX - 45}px` }} // -13px para alinear los pies
      >
        <CeratiSprite />
        {/* Sombra proyectada */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/40 blur-sm rounded-full" />
      </div>

      {/* CAPA 4: EL SUELO (Movimiento sincronizado con la caminata) */}
      <motion.div
        animate={{ backgroundPositionX: ["0px", "-64px"] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        className="absolute bottom-0 w-full pixelated z-15"
        style={{
          backgroundImage: "url('/backgrounds/ground-texture.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "64px 64px",
          height: `${GROUND_HEIGHT_PX}px`
        }}
      />

      {/* OVERLAY DE RUIDO (Estética VHS/CRT) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}