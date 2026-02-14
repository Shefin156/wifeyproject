import { useState } from 'react';
import { motion } from 'framer-motion';

const SECRET_PASSWORD = 'blue'; // Change this to your nickname or meaningful word (lowercase)

type PasswordGateProps = {
  onUnlock: () => void;
};

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === SECRET_PASSWORD) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8">
      <h3 className="text-xl text-romantic-beige font-medium mb-2">Secret Gate</h3>
      <p className="text-romantic-beige/70 text-sm mb-4">Enter the word that only we know.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="Your secret word..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-romantic-beige placeholder-romantic-beige/40 focus:outline-none focus:border-romantic-pink/50"
        />
        <motion.button
          type="submit"
          className="px-6 py-3 rounded-xl bg-romantic-pink/20 text-romantic-blush border border-romantic-pink/40 font-medium"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Unlock
        </motion.button>
      </form>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-romantic-pink/80 text-sm"
        >
          Not quite… try again. ♥
        </motion.p>
      )}
    </div>
  );
}
