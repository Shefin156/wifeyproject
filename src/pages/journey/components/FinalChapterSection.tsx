import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FinalChapterSectionProps = {
  onKonamiUnlock?: () => void;
};

export default function FinalChapterSection({ onKonamiUnlock }: FinalChapterSectionProps) {
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <section className="relative min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-romantic-purple to-romantic-purple-deep overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,160,191,0.12)_0%,transparent_50%)]" />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-romantic-pink/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-romantic-beige mb-8">
          This is only the beginning…
        </h2>
        <motion.button
          className="px-8 py-4 rounded-2xl bg-romantic-pink/20 text-romantic-blush border-2 border-romantic-pink/50 font-medium text-lg"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(232, 160, 191, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSurprise(true)}
        >
          Open Your Surprise
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showSurprise && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSurprise(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="relative rounded-2xl bg-romantic-purple/95 border border-romantic-pink/30 px-8 py-10 text-center max-w-md shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-5xl mb-4 block">♥</span>
              <h3 className="text-2xl font-light text-romantic-beige mb-4">For you, always</h3>
              <p className="text-romantic-beige/90 leading-relaxed mb-6">
                Every moment with you is a gift. Thank you for being part of this story. Here's to many more chapters together.
              </p>
              <motion.button
                type="button"
                className="px-6 py-3 rounded-xl bg-romantic-pink/20 text-romantic-blush border border-romantic-pink/40 font-medium"
                onClick={() => setShowSurprise(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
