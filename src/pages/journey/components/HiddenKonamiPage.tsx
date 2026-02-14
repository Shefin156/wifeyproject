import { motion } from 'framer-motion';

type HiddenKonamiPageProps = {
  onClose: () => void;
};

export default function HiddenKonamiPage({ onClose }: HiddenKonamiPageProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-romantic-purple-deep p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="text-center max-w-lg"
      >
        <p className="text-6xl mb-4">🎮♥</p>
        <h2 className="text-2xl md:text-3xl font-light text-romantic-beige mb-4">
          You found the secret!
        </h2>
        <p className="text-romantic-beige/80 mb-8">
          You're the kind of person who finds the hidden level. That's one of the many reasons I love you.
        </p>
        <motion.button
          type="button"
          className="px-6 py-3 rounded-xl bg-romantic-pink/20 text-romantic-blush border border-romantic-pink/40"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to the journey
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
