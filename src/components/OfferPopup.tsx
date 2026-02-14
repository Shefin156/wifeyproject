import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Calendar, Percent } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  validUntil?: string;
  image?: string;
  buttonText: string;
  buttonLink: string;
  enabled: boolean;
  showOnce: boolean;
}

// Default offer - will be overridden by admin settings
const defaultOffer: Offer = {
  id: 'default',
  title: 'Special Summer Offer!',
  description: 'Get 20% off on all activities this summer. Book now and save!',
  discount: 20,
  code: 'SUMMER20',
  validUntil: '2024-08-31',
  buttonText: 'Explore Activities',
  buttonLink: '/search',
  enabled: true,
  showOnce: true,
};

export default function OfferPopup() {
  const [offer, setOffer] = useState<Offer>(defaultOffer);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Load offer from localStorage (set by admin panel)
    const savedOffer = localStorage.getItem('currentOffer');
    if (savedOffer) {
      try {
        const parsedOffer = JSON.parse(savedOffer);
        if (parsedOffer.enabled) {
          setOffer(parsedOffer);
        }
      } catch (e) {
        console.error('Error parsing offer:', e);
      }
    }

    // Check if offer was already dismissed
    const dismissedKey = `offer_dismissed_${offer.id}`;
    const wasDismissed = localStorage.getItem(dismissedKey);
    
    if (offer.enabled && !wasDismissed) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [offer.id, offer.enabled]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    
    if (offer.showOnce) {
      const dismissedKey = `offer_dismissed_${offer.id}`;
      localStorage.setItem(dismissedKey, 'true');
    }
  };

  const handleClaimOffer = () => {
    // Track offer claim (in real app, send to analytics)
    console.log('Offer claimed:', offer.id);
    
    // Navigate to the link
    window.location.href = offer.buttonLink;
    
    // Dismiss popup
    handleDismiss();
  };

  if (!offer.enabled || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <GlassCard className="max-w-md w-full overflow-hidden relative">
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-700 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Offer Image (if provided) */}
              {offer.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-primary-red to-primary-yellow rounded-full flex items-center gap-2">
                    <Tag className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">Limited Offer</span>
                  </div>
                  {offer.discount > 0 && (
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      <span className="text-sm font-bold">{offer.discount}% OFF</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-3">{offer.title}</h2>

                {/* Description */}
                <p className="text-gray-700 mb-4 leading-relaxed">{offer.description}</p>

                {/* Promo Code */}
                {offer.code && (
                  <div className="mb-4 p-4 bg-white/30 backdrop-blur-md rounded-glass border border-white/30">
                    <p className="text-sm text-gray-600 mb-1">Use promo code:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-lg font-bold text-primary-red bg-white/50 px-3 py-1 rounded-glass">
                        {offer.code}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(offer.code || '');
                          alert('Code copied to clipboard!');
                        }}
                        className="text-sm text-primary-red hover:text-primary-red/80 font-semibold"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                {/* Valid Until */}
                {offer.validUntil && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Calendar className="w-4 h-4" />
                    <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                )}

                {/* CTA Button */}
                <GlassButton
                  variant="primary"
                  onClick={handleClaimOffer}
                  className="w-full text-lg py-4"
                >
                  {offer.buttonText}
                </GlassButton>

                {/* Dismiss Link */}
                <button
                  onClick={handleDismiss}
                  className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  No thanks, maybe later
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
