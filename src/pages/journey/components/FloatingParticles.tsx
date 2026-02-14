import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_COUNT = 40;

function Particle({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-romantic-gold/30"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
        bottom: '-20px',
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [-20, -800],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
      }}
    />
  );
}

export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        delay: Math.random() * 8,
        x: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
}
