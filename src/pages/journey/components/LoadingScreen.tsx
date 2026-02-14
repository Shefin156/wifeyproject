import { motion } from 'framer-motion';

type LoadingScreenProps = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-romantic-purple-deep"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-romantic-pink/30 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: ['0 0 20px rgba(232, 160, 191, 0.3)', '0 0 40px rgba(232, 160, 191, 0.5)', '0 0 20px rgba(232, 160, 191, 0.3)'],
        }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.2 }}
      >
        <span className="text-4xl">♥</span>
      </motion.div>
      <motion.p
        className="mt-6 text-romantic-blush/80 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading our story...
      </motion.p>
      <motion.button
        className="mt-8 px-6 py-3 rounded-2xl bg-romantic-pink/20 text-romantic-blush border border-romantic-pink/40 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onComplete}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Enter
      </motion.button>
    </motion.div>
  );
}
