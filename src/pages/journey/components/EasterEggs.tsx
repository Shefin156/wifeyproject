import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET_MESSAGES = [
  "My wife I will do anything to keep loving you",
  "I am so lucky to have you",
  "You're the best.",
  "Forever and always.",
  "Made with love, for you.",
];

export default function EasterEggs() {
  const [heartMessage, setHeartMessage] = useState<string | null>(null);
  const [starMessage, setStarMessage] = useState(false);

  return (
    <>
      {/* Floating clickable hearts - random positions */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.button
          key={i}
          type="button"
          className="fixed z-50 text-2xl cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.5 }}
          onClick={() => setHeartMessage(SECRET_MESSAGES[i % SECRET_MESSAGES.length])}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Secret heart"
        >
          ♥
        </motion.button>
      ))}

      {/* Hidden star - bottom right corner */}
      <motion.button
        type="button"
        className="fixed bottom-8 right-8 z-50 text-romantic-gold-soft/30 hover:text-romantic-gold text-2xl transition-colors"
        onClick={() => setStarMessage(true)}
        aria-label="Secret star"
      >
        ★
      </motion.button>

      {/* Heart message toast */}
      <AnimatePresence>
        {heartMessage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHeartMessage(null)}
          >
            <div className="absolute inset-0 bg-black/30" />
            <motion.div
              className="relative rounded-2xl bg-romantic-purple/95 border border-romantic-pink/30 px-8 py-6 text-romantic-beige text-lg shadow-xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {heartMessage}
              <button
                type="button"
                className="mt-4 w-full py-2 rounded-xl bg-romantic-pink/20 border border-romantic-pink/40"
                onClick={() => setHeartMessage(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Star surprise note */}
      <AnimatePresence>
        {starMessage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStarMessage(false)}
          >
            <div className="absolute inset-0 bg-black/30" />
            <motion.div
              className="relative rounded-2xl bg-romantic-purple/95 border border-romantic-gold/40 px-8 py-6 text-romantic-beige text-center max-w-sm shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-3xl mb-2 block">★</span>
              <p>You found the hidden star. You're the light of my life. ♥</p>
              <button
                type="button"
                className="mt-4 w-full py-2 rounded-xl bg-romantic-gold/20 border border-romantic-gold/40"
                onClick={() => setStarMessage(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
