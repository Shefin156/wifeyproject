import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function LoveMeterSection() {
  const [measured, setMeasured] = useState(false);
  const [value, setValue] = useState(0);

  const handleMeasure = () => {
    if (measured) return;
    setMeasured(true);
    const target = Math.floor(800 + Math.random() * 400);
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(1000);
        clearInterval(timer);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#e8a0bf', '#d4af37', '#f5e6d3', '#f8d7da'],
        });
      } else {
        setValue(Math.round(current));
      }
    }, 60);
  };

  return (
    <section className="relative min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-romantic-purple-deep to-romantic-purple">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,160,191,0.08)_0%,transparent_60%)]" />
      <motion.h2
        className="relative z-10 text-center text-3xl md:text-4xl font-light text-romantic-beige mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Love Meter
      </motion.h2>
      <p className="relative z-10 text-center text-romantic-pink/80 text-sm mb-12">
        Scientifically accurate. Obviously.
      </p>

      <motion.div
        className="relative z-10 w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="h-12 rounded-xl bg-romantic-purple-deep overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-xl bg-gradient-to-r from-romantic-pink to-romantic-gold"
            initial={{ width: '0%' }}
            animate={{ width: measured ? `${Math.min(100, (value / 1000) * 100)}%` : '0%' }}
            transition={{ duration: measured ? 2 : 0 }}
          />
        </div>
        <p className="text-center text-2xl font-medium text-romantic-beige mb-6">
          {measured ? `${value}%` : '—'}
        </p>
        {measured && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-romantic-gold-soft text-sm mb-6"
          >
            Scientifically impossible to measure. I love you beyond words and numbers ♥
          </motion.p>
        )}
        <motion.button
          type="button"
          className="w-full py-4 rounded-xl bg-romantic-pink/20 text-romantic-blush border border-romantic-pink/40 font-medium disabled:opacity-50"
          onClick={handleMeasure}
          disabled={measured}
          whileHover={!measured ? { scale: 1.02 } : {}}
          whileTap={!measured ? { scale: 0.98 } : {}}
        >
          {measured ? 'Already measured!' : 'Measure Love'}
        </motion.button>
      </motion.div>
    </section>
  );
}
