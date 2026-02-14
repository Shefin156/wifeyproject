import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

export function useKonamiCode(onUnlock: () => void) {
  const [unlocked, setUnlocked] = useState(false);
  const [index, setIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (unlocked) return;
      const key = e.code;
      if (key === KONAMI_CODE[index]) {
        const next = index + 1;
        setIndex(next);
        if (next === KONAMI_CODE.length) {
          setUnlocked(true);
          onUnlock();
        }
      } else {
        setIndex(0);
      }
    },
    [index, unlocked, onUnlock]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return unlocked;
}
