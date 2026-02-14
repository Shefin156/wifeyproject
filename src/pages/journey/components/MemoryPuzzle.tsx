import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const GRID = 3;

/* ---------------------------------- */
/* Add As Many Images As You Want     */
/* ---------------------------------- */

const IMAGES = [
  '/assets/Us.jpeg',
  '/assets/Cute.jpeg',
  'public/assets/Face.jpeg',
  'public/assets/Love.jpeg',
  'public/assets/Usss.jpeg'
];

/* ---------------------------------- */
/* Soft & Always Solvable Shuffle     */
/* ---------------------------------- */

const generateVerySoftShuffle = () => {
  let arr = Array.from({ length: GRID * GRID }, (_, i) => i);
  let emptyIndex = 0;

  const movesToMake = 6 + Math.floor(Math.random() * 3);

  for (let i = 0; i < movesToMake; i++) {
    const possibleMoves: number[] = [];
    const row = Math.floor(emptyIndex / GRID);
    const col = emptyIndex % GRID;

    if (row > 0) possibleMoves.push(emptyIndex - GRID);
    if (row < GRID - 1) possibleMoves.push(emptyIndex + GRID);
    if (col > 0) possibleMoves.push(emptyIndex - 1);
    if (col < GRID - 1) possibleMoves.push(emptyIndex + 1);

    const moveTo =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    [arr[emptyIndex], arr[moveTo]] = [arr[moveTo], arr[emptyIndex]];
    emptyIndex = moveTo;
  }

  return arr;
};

export default function MemoryPuzzle() {
  const [currentImage, setCurrentImage] = useState(
    IMAGES[Math.floor(Math.random() * IMAGES.length)]
  );

  const [order, setOrder] = useState<number[]>(generateVerySoftShuffle);
  const [solved, setSolved] = useState(false);

  const launchCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });

    // Extra burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.4 },
      });
    }, 400);
  };

  const checkSolved = useCallback((newOrder: number[]) => {
    const ok = newOrder.every((v, i) => v === i);
    if (ok) {
      setSolved(true);
      launchCelebration();
    }
  }, []);

  const move = (clickedIndex: number) => {
    const emptyIndex = order.indexOf(0);
    const cols = GRID;

    const clickedRow = Math.floor(clickedIndex / cols);
    const clickedCol = clickedIndex % cols;
    const emptyRow = Math.floor(emptyIndex / cols);
    const emptyCol = emptyIndex % cols;

    const isAdjacent =
      (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
      (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

    if (!isAdjacent) return;

    const newOrder = [...order];
    newOrder[emptyIndex] = newOrder[clickedIndex];
    newOrder[clickedIndex] = 0;

    setOrder(newOrder);
    checkSolved(newOrder);
  };

  const resetPuzzle = () => {
    setSolved(false);
    setOrder(generateVerySoftShuffle());
    setCurrentImage(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8">
      <h3 className="text-xl text-romantic-beige font-medium mb-4">
        Memory Puzzle
      </h3>
      <p className="text-romantic-beige/70 text-sm mb-4">
        A little memory for us ❤️
      </p>

      <div className="relative aspect-square max-w-[300px] mx-auto rounded-xl overflow-hidden bg-romantic-purple-deep">

        {/* Soft preview guide */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div
          className="grid gap-0.5 p-0.5 absolute inset-0"
          style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
        >
          {order.map((pieceIndex, cellIndex) => {
            if (pieceIndex === 0) {
              return <div key={cellIndex} className="bg-white/10 rounded" />;
            }

            const row = Math.floor((pieceIndex - 1) / GRID);
            const col = (pieceIndex - 1) % GRID;

            return (
              <motion.button
                key={cellIndex}
                type="button"
                onClick={() => move(cellIndex)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                layout
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="rounded overflow-hidden"
              >
                <div
                  className="w-full h-full bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: `${col * (100 / (GRID - 1))}% ${
                      row * (100 / (GRID - 1))
                    }%`,
                    backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {solved && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-romantic-purple-deep/95 text-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={currentImage}
                alt="Full Memory"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="rounded-lg mb-4 shadow-lg"
              />

              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-romantic-pink text-lg font-medium mb-4"
              >
                You completed another memory ❤️
              </motion.p>

              <button
                onClick={resetPuzzle}
                className="px-4 py-2 bg-romantic-pink text-white rounded-full text-sm"
              >
                Reveal Another Memory
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
