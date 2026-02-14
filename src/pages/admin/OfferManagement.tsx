import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Tag, Calendar, Percent, Image as ImageIcon } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import GlassButton from '../../components/GlassButton';

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

export default function OfferManagement() {
  const [offer, setOffer] = useState<Offer>(defaultOffer);

  useEffect(() => {
    // Load saved offer from localStorage
    const savedOffer = localStorage.getItem('currentOffer');
    if (savedOffer) {
      try {
        setOffer(JSON.parse(savedOffer));
      } catch (e) {
        console.error('Error loading offer:', e);
      }
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage (in real app, save to backend)
    localStorage.setItem('currentOffer', JSON.stringify(offer));
    
    // Clear dismiss flag so it shows again
    const dismissedKey = `offer_dismissed_${offer.id}`;
    localStorage.removeItem(dismissedKey);
    
    alert('Offer saved successfully! It will appear on the website.');
  };

  const handlePreview = () => {
    // Temporarily save for preview
    localStorage.setItem('currentOffer', JSON.stringify(offer));
    // Reload page to show preview (or open in new tab)
    window.open('/', '_blank');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default offer?')) {
      setOffer(defaultOffer);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Offer Management</h1>
          <p className="text-gray-600">Create and manage promotional offers for your customers</p>
        </div>
        <div className="flex gap-3">
          <GlassButton variant="secondary" onClick={handlePreview}>
            <Eye className="w-5 h-5 mr-2" />
            Preview
          </GlassButton>
          <GlassButton variant="primary" onClick={handleSave}>
            <Save className="w-5 h-5 mr-2" />
            Save Offer
          </GlassButton>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Offer Details</h2>

          <div className="space-y-4">
            {/* Enable/Disable */}
            <div className="flex items-center gap-3 p-4 bg-white/20 rounded-glass">
              <input
                type="checkbox"
                id="enabled"
                checked={offer.enabled}
                onChange={(e) => setOffer({ ...offer, enabled: e.target.checked })}
                className="w-5 h-5"
              />
              <label htmlFor="enabled" className="text-gray-700 font-semibold">
                Enable this offer
              </label>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Offer Title *
              </label>
              <input
                type="text"
                required
                value={offer.title}
                onChange={(e) => setOffer({ ...offer, title: e.target.value })}
                placeholder="e.g., Special Summer Offer!"
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={offer.description}
                onChange={(e) => setOffer({ ...offer, description: e.target.value })}
                placeholder="Describe your offer..."
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            {/* Discount & Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Percent className="w-4 h-4 inline mr-1" />
                  Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={offer.discount}
                  onChange={(e) => setOffer({ ...offer, discount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Promo Code
                </label>
                <input
                  type="text"
                  value={offer.code || ''}
                  onChange={(e) => setOffer({ ...offer, code: e.target.value })}
                  placeholder="SUMMER20"
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
              </div>
            </div>

            {/* Valid Until */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Valid Until
              </label>
              <input
                type="date"
                value={offer.validUntil || ''}
                onChange={(e) => setOffer({ ...offer, validUntil: e.target.value })}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                Image URL (optional)
              </label>
              <input
                type="url"
                value={offer.image || ''}
                onChange={(e) => setOffer({ ...offer, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 800x400px</p>
            </div>

            {/* Button Text & Link */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Text *
                </label>
                <input
                  type="text"
                  required
                  value={offer.buttonText}
                  onChange={(e) => setOffer({ ...offer, buttonText: e.target.value })}
                  placeholder="Explore Activities"
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Link *
                </label>
                <input
                  type="text"
                  required
                  value={offer.buttonLink}
                  onChange={(e) => setOffer({ ...offer, buttonLink: e.target.value })}
                  placeholder="/search"
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
              </div>
            </div>

            {/* Show Once */}
            <div className="flex items-center gap-3 p-4 bg-white/20 rounded-glass">
              <input
                type="checkbox"
                id="showOnce"
                checked={offer.showOnce}
                onChange={(e) => setOffer({ ...offer, showOnce: e.target.checked })}
                className="w-5 h-5"
              />
              <label htmlFor="showOnce" className="text-gray-700">
                Show only once per user (dismissed offers won't show again)
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <GlassButton variant="primary" onClick={handleSave} className="flex-1">
                <Save className="w-5 h-5 mr-2" />
                Save & Publish
              </GlassButton>
              <GlassButton variant="secondary" onClick={handleReset}>
                Reset
              </GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* Preview */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview</h2>
          <div className="bg-gray-50 rounded-glass p-6 min-h-[500px]">
            <div className="max-w-md mx-auto">
              {/* Offer Image */}
              {offer.image && (
                <div className="h-48 overflow-hidden rounded-glass mb-4">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

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
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{offer.title}</h3>

              {/* Description */}
              <p className="text-gray-700 mb-4">{offer.description}</p>

              {/* Promo Code */}
              {offer.code && (
                <div className="mb-4 p-4 bg-white rounded-glass border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Use promo code:</p>
                  <code className="text-lg font-bold text-primary-red">{offer.code}</code>
                </div>
              )}

              {/* Valid Until */}
              {offer.validUntil && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                </div>
              )}

              {/* Button */}
              <button className="w-full px-6 py-3 bg-primary-red text-white rounded-glass font-semibold hover:bg-primary-red/90 transition-colors">
                {offer.buttonText}
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
