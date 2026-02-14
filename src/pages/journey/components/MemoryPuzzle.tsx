import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PUZZLE_IMAGE = 'assets/Us.jpeg';
const GRID = 3;

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function MemoryPuzzle() {
  const [order, setOrder] = useState<number[]>(() =>
    shuffleArray(Array.from({ length: GRID * GRID }, (_, i) => i))
  );
  const [solved, setSolved] = useState(false);

  const checkSolved = useCallback((newOrder: number[]) => {
    const ok = newOrder.every((v, i) => v === i);
    if (ok) setSolved(true);
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

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8">
      <h3 className="text-xl text-romantic-beige font-medium mb-4">Memory Puzzle</h3>
      <p className="text-romantic-beige/70 text-sm mb-4">Slide the tiles to reveal the image.</p>
      <div className="relative aspect-square max-w-[280px] mx-auto rounded-xl overflow-hidden bg-romantic-purple-deep">
        <div
          className="grid gap-0.5 p-0.5 absolute inset-0"
          style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
        >
          {order.map((pieceIndex, cellIndex) => {
            if (pieceIndex === 0) {
              return <div key={cellIndex} className="bg-white/5 rounded" />;
            }
            const row = Math.floor((pieceIndex - 1) / GRID);
            const col = (pieceIndex - 1) % GRID;
            return (
              <motion.button
                key={cellIndex}
                type="button"
                className="rounded overflow-hidden bg-romantic-purple"
                onClick={() => move(cellIndex)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <div
                  className="w-full h-full bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundPosition: `${col * (100 / (GRID - 1))}% ${row * (100 / (GRID - 1))}%`,
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
              className="absolute inset-0 flex items-center justify-center bg-romantic-purple-deep/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-romantic-pink text-lg font-medium"
              >
                You did it!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
