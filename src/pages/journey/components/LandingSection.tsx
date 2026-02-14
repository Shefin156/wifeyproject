import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import MusicToggle from './MusicToggle';
import { useTypewriter } from '../hooks/useTypewriter';

const HEADLINE = "This isn't much but I made this for you and you only. It's our story.";

type LandingSectionProps = {
  onStart: () => void;
};

export default function LandingSection({ onStart }: LandingSectionProps) {
  const displayText = useTypewriter(HEADLINE, 50, 800);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-romantic-purple-deep via-romantic-purple to-romantic-purple-deep overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
      <FloatingParticles />
      <MusicToggle className="absolute top-6 right-6 z-10" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-romantic-beige leading-tight min-h-[4em] md:min-h-[3em]">
          {displayText}
          <motion.span
            className="inline-block w-0.5 h-[1em] bg-romantic-gold ml-0.5 align-bottom"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </h1>
        <motion.button
          className="mt-12 px-8 py-4 rounded-2xl bg-romantic-pink/20 text-romantic-blush border-2 border-romantic-pink/50 font-medium text-lg shadow-lg shadow-romantic-pink/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          onClick={onStart}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(232, 160, 191, 0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          Start the Journey
        </motion.button>
      </motion.div>
    </section>
  );
}
