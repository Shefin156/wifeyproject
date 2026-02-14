import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

type MusicToggleProps = {
  src?: string;
  className?: string;
};

export default function MusicToggle({ src = 'assets/Connie Francis - Pretty Little Baby (Official Audio) - Connie Francis - Official.mp3', className = '' }: MusicToggleProps) {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    return () => {
      audioRef.current?.pause();
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (!muted) {
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [muted]);

  return (
    <motion.button
      type="button"
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      className={`rounded-full p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors ${className}`}
      onClick={() => setMuted((m) => !m)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </motion.button>
  );
}
