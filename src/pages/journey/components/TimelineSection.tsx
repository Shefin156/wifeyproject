import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineMilestones } from '../data/timeline';
import { Heart } from 'lucide-react';

export default function TimelineSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-b from-romantic-purple via-romantic-purple-deep/80 to-romantic-purple">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(232,160,191,0.06)_0%,transparent_50%)]" />
      <motion.h2
        className="relative z-10 text-center text-3xl md:text-4xl font-light text-romantic-beige mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Story
      </motion.h2>
      <p className="relative z-10 text-center text-romantic-pink/80 text-sm md:text-base mb-16">
        Click a milestone to expand
      </p>

      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        {timelineMilestones.map((milestone, index) => {
          const isExpanded = expandedId === milestone.id;
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <motion.button
                type="button"
                className="w-full text-left rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-6 hover:bg-white/10 hover:border-romantic-pink/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-romantic-gold-soft font-medium">{milestone.date}</span>
                    <h3 className="text-xl md:text-2xl text-romantic-beige font-medium">{milestone.title}</h3>
                  </div>
                  <motion.span
                    className="text-romantic-pink opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <Heart className="w-6 h-6 fill-romantic-pink/50" />
                  </motion.span>
                </div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-b-2xl bg-white/5 border border-t-0 border-white/10 border-romantic-pink/20 p-5 md:p-6 -mt-1">
                      <div className="aspect-video rounded-xl overflow-hidden mb-4">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-romantic-beige/90 leading-relaxed">{milestone.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
