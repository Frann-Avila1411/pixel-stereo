"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  offset: number; // Velocidad de movimiento
}

export const ParallaxLayer = ({ children, offset }: Props) => {
  const { scrollY } = useScroll();
  // Transformamos el scroll en un movimiento vertical u horizontal
  const y = useTransform(scrollY, [0, 500], [0, offset]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      {children}
    </motion.div>
  );
};