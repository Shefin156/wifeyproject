import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import GlassCard from './GlassCard';

interface ActivityCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  onClick?: () => void;
}

export default function ActivityCard({
  title,
  location,
  price,
  rating,
  image,
  onClick,
}: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <GlassCard className="overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium text-white">
            <Star className="w-4 h-4 fill-primary-yellow text-primary-yellow" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-red">
              ${price}
              <span className="text-sm font-normal text-gray-600">/person</span>
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
