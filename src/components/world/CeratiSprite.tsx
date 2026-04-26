"use client";
import React, { useState, useEffect } from "react";

// Configuración de la hoja de sprites
const FRAME_COUNT = 6; // cuadros visibles que se usarán en la animación
const SPRITESHEET_FRAME_COUNT = 6; // cuadros totales en la hoja original
const ANIMATION_SPEED = 750; // Milisegundos por frame para una caminata pausada
const SPRITE_SCALE = 4.0; // Escala visual para que encaje mejor con el paisaje

const DISPLAY_SIZE = Math.round(64 * SPRITE_SCALE);

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
        className="pixelated bg-no-repeat"
        style={{
          width: `${DISPLAY_SIZE}px`,
          height: `${DISPLAY_SIZE}px`,
          backgroundImage: `url('/sprites/cerati-walk2.png')`,
          // Posicionado porcentual para evitar recortes por redondeo en el 5to frame
          backgroundPosition: `${(currentFrame / (SPRITESHEET_FRAME_COUNT - 1)) * 100}% 0%`,
          backgroundSize: `${SPRITESHEET_FRAME_COUNT * 100}% 100%`,
          imageRendering: "pixelated", // asegura que se mantenga el estilo pixel art al escalar
        }}
      />

      {/* Brillo de neón de Bocanada */}
      <div className="absolute -inset-2 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,#93c5fd_0%,#0000_70%)]" />
    </div>
  );
};