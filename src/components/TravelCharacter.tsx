import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
// import Lottie from 'lottie-react';
// Uncomment when Lottie files are added:
// import planeAnimation from '../assets/lottie/plane.json';
// import trainAnimation from '../assets/lottie/train.json';
// import bikeAnimation from '../assets/lottie/bike.json';
// import carAnimation from '../assets/lottie/car.json';
// import swingAnimation from '../assets/lottie/swing.json';
// import snorkelingAnimation from '../assets/lottie/snorkeling.json';

// Placeholder travel modes - Replace with Lottie animations when available
const travelModes = [
  {
    name: 'plane',
    emoji: '✈️',
    color: 'from-blue-400/30 to-blue-600/30',
    // animationData: planeAnimation, // Uncomment when Lottie file is added
  },
  {
    name: 'train',
    emoji: '🚆',
    color: 'from-gray-400/30 to-gray-600/30',
    // animationData: trainAnimation,
  },
  {
    name: 'bike',
    emoji: '🚲',
    color: 'from-green-400/30 to-green-600/30',
    // animationData: bikeAnimation,
  },
  {
    name: 'car',
    emoji: '🚗',
    color: 'from-red-400/30 to-red-600/30',
    // animationData: carAnimation,
  },
  {
    name: 'swing',
    emoji: '🏊',
    color: 'from-yellow-400/30 to-yellow-600/30',
    // animationData: swingAnimation,
  },
  {
    name: 'snorkeling',
    emoji: '🤿',
    color: 'from-cyan-400/30 to-cyan-600/30',
    // animationData: snorkelingAnimation,
  },
];

// Simple SVG-based animation component (placeholder until Lottie files are added)
function SimpleTravelIcon({ emoji, color }: { emoji: string; color: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-5xl md:text-6xl bg-gradient-to-br ${color} rounded-full backdrop-blur-sm border border-white/10`}
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1],
            }
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {emoji}
    </motion.div>
  );
}

// Lottie-based component (use when Lottie files are available)
// function LottieTravelIcon({ animationData }: { animationData: any }) {
//   return (
//     <div className="w-24 h-24 md:w-32 md:h-32">
//       <Lottie animationData={animationData} loop={true} autoplay={true} />
//     </div>
//   );
// }

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  opacity: number;
}

export default function TravelCharacter() {
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Smooth random movement with spring physics - slower movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 50 }; // Slower, smoother movement

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Generate new random target position - keep it in border regions
  const generateNewTarget = useRef(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const borderMargin = 0.15; // 15% margin from edges (border region)
    const centerAvoidance = 0.25; // Avoid center 25% area
    
    // Calculate border regions
    const leftBound = -rect.width * (0.5 - borderMargin);
    const rightBound = rect.width * (0.5 - borderMargin);
    const topBound = -rect.height * (0.5 - borderMargin);
    const bottomBound = rect.height * (0.5 - borderMargin);
    
    // Avoid center region
    const centerXMin = -rect.width * centerAvoidance;
    const centerXMax = rect.width * centerAvoidance;
    const centerYMin = -rect.height * centerAvoidance;
    const centerYMax = rect.height * centerAvoidance;
    
    // Generate random position in border regions
    let newX, newY;
    let attempts = 0;
    
    do {
      // Randomly choose which border region
      const borderSide = Math.floor(Math.random() * 4);
      
      switch (borderSide) {
        case 0: // Top border
          newX = (Math.random() - 0.5) * rect.width * 0.8;
          newY = topBound + (Math.random() - 0.5) * rect.height * 0.1;
          break;
        case 1: // Right border
          newX = rightBound + (Math.random() - 0.5) * rect.width * 0.1;
          newY = (Math.random() - 0.5) * rect.height * 0.8;
          break;
        case 2: // Bottom border
          newX = (Math.random() - 0.5) * rect.width * 0.8;
          newY = bottomBound + (Math.random() - 0.5) * rect.height * 0.1;
          break;
        case 3: // Left border
          newX = leftBound + (Math.random() - 0.5) * rect.width * 0.1;
          newY = (Math.random() - 0.5) * rect.height * 0.8;
          break;
        default:
          newX = 0;
          newY = 0;
      }
      
      attempts++;
      // Ensure it's not in center region
    } while (
      attempts < 10 &&
      newX > centerXMin &&
      newX < centerXMax &&
      newY > centerYMin &&
      newY < centerYMax
    );
    
    setTargetX(newX);
    setTargetY(newY);
  });

  // Update to new random target periodically
  useEffect(() => {
    if (shouldReduceMotion) return;

    // Set initial target
    generateNewTarget.current();

    // Change direction every 3-5 seconds
    const interval = setInterval(() => {
      generateNewTarget.current();
    }, Math.random() * 2000 + 3000); // 3-5 seconds

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Update position towards target - slower movement
  useEffect(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    let rafId: number;
    let lastTrailTime = Date.now();
    
    const updatePosition = () => {
      // Smoothly move towards target
      mouseX.set(targetX);
      mouseY.set(targetY);

      // Add trail point every 80ms (slower trail recording)
      const now = Date.now();
      if (now - lastTrailTime > 80 && characterRef.current) {
        const charRect = characterRef.current.getBoundingClientRect();
        const centerCharX = charRect.left + charRect.width / 2;
        const centerCharY = charRect.top + charRect.height / 2;

        setTrail((prev) => {
          const newTrail = [
            ...prev,
            {
              x: centerCharX,
              y: centerCharY,
              timestamp: now,
              opacity: 1,
            },
          ];
          // Keep only last 80 points for longer trail
          return newTrail.slice(-80);
        });
        lastTrailTime = now;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(rafId);
  }, [targetX, targetY, mouseX, mouseY, shouldReduceMotion]);

  // Fade out trail points over time - slower fading
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((point) => ({
            ...point,
            opacity: Math.max(0, point.opacity - 0.02), // Slower fade (2% per 200ms)
          }))
          .filter((point) => point.opacity > 0) // Remove fully faded points
      );
    }, 200); // Check every 200ms for slower fade

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Rotate based on movement direction
  const rotate = useTransform(
    x,
    (latestX) => {
      if (shouldReduceMotion) return 0;
      const latestY = mouseY.get();
      return Math.atan2(latestY, latestX) * (180 / Math.PI);
    }
  );

  // Switch animation mode faster (every 3-5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModeIndex((prev) => (prev + 1) % travelModes.length);
    }, Math.random() * 2000 + 3000); // 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentMode = travelModes[currentModeIndex];

  // Don't render if reduced motion is preferred
  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Trail SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {trail.length > 1 &&
          trail.map((point, index) => {
            if (index === 0) return null;
            const prevPoint = trail[index - 1];
            return (
              <line
                key={`${point.timestamp}-${index}`}
                x1={prevPoint.x}
                y1={prevPoint.y}
                x2={point.x}
                y2={point.y}
                stroke="#DC2626"
                strokeWidth="4"
                strokeDasharray="8,6"
                strokeOpacity={point.opacity * 0.8}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-opacity 0.2s ease-out',
                }}
              />
            );
          })}
      </svg>

      {/* Character */}
      <motion.div
        ref={characterRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          x,
          y,
          rotate,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          key={currentMode.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="blur-[0.5px]"
        >
          <SimpleTravelIcon emoji={currentMode.emoji} color={currentMode.color} />
        </motion.div>
      </motion.div>
    </div>
  );
}
