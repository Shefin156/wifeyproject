import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quiz';

function vibrateWrong() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }
}

export default function QuizGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const q = quizQuestions[currentIndex];
  const isLast = currentIndex === quizQuestions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);
    setShowResult(true);
    const correct = optionIndex === q.correctIndex;
    if (correct) setCorrectCount((c) => c + 1);
    else vibrateWrong();
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    if (isLast) return;
    setCurrentIndex((i) => i + 1);
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8">
      <h3 className="text-xl text-romantic-beige font-medium mb-4">Quiz: Do you remember?</h3>
      <AnimatePresence mode="wait">
        {currentIndex < quizQuestions.length ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-romantic-beige/90 mb-6">{q.question}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                const isChosen = selected === i;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isChosen && !isCorrect;
                return (
                  <motion.button
                    key={i}
                    type="button"
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                      showCorrect
                        ? 'bg-green-500/20 border-green-400/50 text-green-100'
                        : showWrong
                        ? 'bg-red-500/20 border-red-400/50 text-red-100'
                        : 'bg-white/5 border-white/10 text-romantic-beige hover:border-romantic-pink/30'
                    }`}
                    onClick={() => handleSelect(i)}
                    disabled={showResult}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center justify-between"
              >
                <span className="text-romantic-gold-soft text-sm">
                  {selected === q.correctIndex ? '♥ Correct!' : 'Try again next time!'}
                </span>
                <motion.button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-romantic-pink/20 text-romantic-blush border border-romantic-pink/40"
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLast ? 'Done' : 'Next'}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <p className="text-romantic-beige">
              You got {correctCount} out of {quizQuestions.length} right. ♥
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
