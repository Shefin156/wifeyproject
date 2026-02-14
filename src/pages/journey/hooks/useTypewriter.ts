import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 60, startAfter = 0) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startAfter);
    return () => clearTimeout(startTimer);
  }, [startAfter]);

  useEffect(() => {
    if (!started || !text) return;
    setDisplay('');
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, started]);

  return display;
}
