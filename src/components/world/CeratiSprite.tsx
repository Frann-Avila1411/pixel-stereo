"use client";
import React, { useState, useEffect } from "react";

// Configuración de la hoja de sprites
const FRAME_WIDTH = 64; // tamaño de cada cuadro individual
const FRAME_COUNT = 4;   // solo los primeros 4 cuadros para la caminata
const ANIMATION_SPEED = 150; // Milisegundos por frame
const SPRITESHEET_WIDTH = FRAME_WIDTH * 6; // Ancho total físico de la spritesheet de 6 frames

export const CeratiSprite = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Ciclo de animación infinito
  useEffect(() => {
    const timer = setInterval(() => {
      // Avanzar al siguiente cuadro, volviendo a 0 al llegar a FRAME_COUNT
      setCurrentFrame((prev) => (prev + 1) % FRAME_COUNT);
    }, ANIMATION_SPEED);

    return () => clearInterval(timer); // Limpieza al desmontar
  }, []);

  return (
    <div className="relative group">
      {/* Sprite animado */}
      <div 
        className="w-[64px] h-[64px] pixelated"
        style={{
          backgroundImage: `url('/sprites/cerati-walk.png')`,
          // Mueve la hoja de sprites horizontalmente
          backgroundPosition: `-${currentFrame * FRAME_WIDTH}px 0px`,
          // Asegurar que el fondo escale para mostrar un solo cuadro
          backgroundSize: `${SPRITESHEET_WIDTH}px ${FRAME_WIDTH}px`,
          imageRendering: "pixelated", // asegura que se mantenga el estilo pixel art al escalar
        }}
      />

      {/* Brillo de neón de Bocanada */}
      <div className="absolute -inset-2 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,#93c5fd_0%,#0000_70%)]" />
    </div>
  );
};