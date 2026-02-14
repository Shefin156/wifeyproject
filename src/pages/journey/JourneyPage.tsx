import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import LandingSection from './components/LandingSection';
import TimelineSection from './components/TimelineSection';
import PuzzleSection from './components/PuzzleSection';
import LoveMeterSection from './components/LoveMeterSection';
import FinalChapterSection from './components/FinalChapterSection';
import EasterEggs from './components/EasterEggs';
import HiddenKonamiPage from './components/HiddenKonamiPage';
import { useKonamiCode } from './hooks/useKonamiCode';

export default function JourneyPage() {
  const [loading, setLoading] = useState(true);
  const [showKonami, setShowKonami] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartJourney = useCallback(() => {
    const el = document.getElementById('journey-timeline');
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useKonamiCode(() => setShowKonami(true));

  useEffect(() => {
    const prev = document.title;
    document.title = 'Our Story';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-romantic-purple-deep text-romantic-beige overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        .snap-y { scroll-snap-type: y mandatory; }
        .snap-start { scroll-snap-align: start; }
      `}</style>

      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKonami && (
          <HiddenKonamiPage key="konami" onClose={() => setShowKonami(false)} />
        )}
      </AnimatePresence>

      <EasterEggs />

      <div
        ref={containerRef}
        className="snap-y snap-mandatory overflow-y-auto overflow-x-hidden h-screen"
      >
        {!loading && (
          <>
            <section className="snap-start snap-always min-h-screen flex-shrink-0">
              <LandingSection onStart={handleStartJourney} />
            </section>
            <section id="journey-timeline" className="snap-start snap-always min-h-screen flex-shrink-0">
              <TimelineSection />
            </section>
            <section className="snap-start snap-always min-h-screen flex-shrink-0">
              <PuzzleSection />
            </section>
            <section className="snap-start snap-always min-h-screen flex-shrink-0">
              <LoveMeterSection />
            </section>
            <section className="snap-start snap-always min-h-screen flex-shrink-0">
              <FinalChapterSection />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
