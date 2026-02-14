import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ className = '' }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchQuery) query.set('q', searchQuery);
    if (location) query.set('location', location);
    navigate(`/search?${query.toString()}`);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={className}
    >
      <div className="bg-white/30 backdrop-blur-xl border border-white/30 rounded-glass-lg shadow-2xl shadow-black/10 p-2 flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-md rounded-glass">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-lg"
          />
        </div>
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-md rounded-glass">
          <MapPin className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-lg"
          />
        </div>
        <motion.button
          type="submit"
          className="px-8 py-3 bg-primary-red text-white rounded-glass font-semibold hover:bg-primary-red/90 transition-colors shadow-lg shadow-primary-red/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>
    </motion.form>
  );
}
