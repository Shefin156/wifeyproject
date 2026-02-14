import { useState } from 'react';
import { motion } from 'framer-motion';
import QuizGame from './QuizGame';
import MemoryPuzzle from './MemoryPuzzle';
import PasswordGate from './PasswordGate';

export default function PuzzleSection() {
  const [passwordUnlocked, setPasswordUnlocked] = useState(false);

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-b from-romantic-purple to-romantic-purple-deep">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(212,175,55,0.06)_0%,transparent_50%)]" />
      <motion.h2
        className="relative z-10 text-center text-3xl md:text-4xl font-light text-romantic-beige mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Do You Remember?
      </motion.h2>
      <p className="relative z-10 text-center text-romantic-pink/80 text-sm mb-12">
        A few little games just for you
      </p>

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <QuizGame />
        <MemoryPuzzle />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <PasswordGate onUnlock={() => setPasswordUnlocked(true)} />
          {passwordUnlocked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-romantic-gold-soft text-sm"
            >
              ♥ You unlocked the next chapter. Keep scrolling.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
