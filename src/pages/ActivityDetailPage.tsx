import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Users, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { getProductDetails, checkAvailability } from '../services/viatorApi';
import type { ViatorProductDetail } from '../types/viator';
import { isViatorApiConfigured } from '../utils/env';

// Fallback mock data
const mockActivityData: Record<string, any> = {
  '1': {
    title: 'Sunset Cruise with Dinner',
    location: 'Bali, Indonesia',
    price: 89,
    rating: 4.8,
    reviews: 1247,
    duration: '3 hours',
    groupSize: 'Up to 30',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=800&fit=crop',
    ],
    description: `Experience the magic of Bali's coastline as you sail into a breathtaking sunset. This romantic cruise includes a gourmet dinner featuring local and international cuisine, live music, and stunning views of the Indian Ocean. Perfect for couples, families, or anyone looking to create unforgettable memories.`,
    highlights: [
      'Gourmet dinner with local and international options',
      'Live music and entertainment',
      'Stunning sunset views',
      'Professional photography service',
      'Complimentary welcome drinks',
    ],
    included: [
      '3-hour cruise',
      'Gourmet dinner',
      'Welcome drinks',
      'Live entertainment',
      'Professional photos',
    ],
  },
  '2': {
    title: 'Temple Tour & Cultural Experience',
    location: 'Kyoto, Japan',
    price: 65,
    rating: 4.9,
    reviews: 2156,
    duration: '4 hours',
    groupSize: 'Up to 15',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    ],
    description: `Discover the spiritual heart of Kyoto with a guided tour of its most beautiful temples. Learn about Japanese culture, history, and traditions while exploring serene gardens and ancient architecture.`,
    highlights: [
      'Visit 3-4 historic temples',
      'Expert local guide',
      'Traditional tea ceremony',
      'Cultural insights and history',
      'Small group experience',
    ],
    included: [
      '4-hour guided tour',
      'Temple entrance fees',
      'Traditional tea ceremony',
      'Expert guide',
      'Transportation',
    ],
  },
};

// Helper to transform Viator product to display format
function transformProductToDisplay(product: ViatorProductDetail | null, fallback: any) {
  if (!product) return fallback;

  // Extract images from Viator format
  const images =
    product.images?.map((img) => img.variants?.large?.url || img.variants?.medium?.url || '') ||
    fallback.images ||
    [];

  return {
    title: product.productTitle || fallback.title,
    location: product.destination?.destinationName || fallback.location,
    price: product.price?.amount || fallback.price,
    rating: product.rating?.averageRating || fallback.rating,
    reviews: product.rating?.totalReviews || fallback.reviews,
    duration: product.duration || fallback.duration,
    groupSize: product.groupSize || fallback.groupSize,
    images: images.length > 0 ? images : fallback.images,
    description: product.productDescription || fallback.description,
    highlights: product.highlights || fallback.highlights,
    included: product.inclusions || fallback.included,
  };
}

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!id) {
        setError('Activity ID is required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let productData: ViatorProductDetail | null = null;

        // Try to fetch from API if configured
        if (isViatorApiConfigured()) {
          productData = await getProductDetails(id);
        }

        // Use mock data as fallback
        const fallbackData = mockActivityData[id] || mockActivityData['1'];
        const displayData = transformProductToDisplay(productData, fallbackData);
        setActivity(displayData);
      } catch (err) {
        console.error('Error fetching activity:', err);
        // Fallback to mock data
        const fallbackData = mockActivityData[id] || mockActivityData['1'];
        setActivity(fallbackData);
        setError('Failed to load activity details. Showing sample data.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const handleBookNow = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    if (numberOfGuests < 1) {
      alert('Please select at least 1 guest');
      return;
    }

    setCheckingAvailability(true);

    try {
      if (isViatorApiConfigured() && id) {
        const availability = await checkAvailability({
          productCode: id,
          travelDate: selectedDate,
          travelCount: numberOfGuests,
        });

        if (availability.available) {
          alert(
            `Activity is available! Proceeding to booking...\nDate: ${selectedDate}\nGuests: ${numberOfGuests}`
          );
          // Here you would redirect to booking page or handle booking
        } else {
          alert('Sorry, this activity is not available for the selected date.');
        }
      } else {
        // Mock booking flow
        alert(
          `Booking request:\nDate: ${selectedDate}\nGuests: ${numberOfGuests}\n\nNote: Viator API key not configured. Please add VITE_VIATOR_API_KEY to your .env file.`
        );
      }
    } catch (err) {
      console.error('Error checking availability:', err);
      alert('Error checking availability. Please try again.');
    } finally {
      setCheckingAvailability(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-20 flex items-center justify-center">
        <GlassCard className="p-12 text-center">
          <Loader2 className="w-12 h-12 text-primary-red animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading activity details...</p>
        </GlassCard>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-20 flex items-center justify-center">
        <GlassCard className="p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity not found</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <GlassButton onClick={() => navigate('/')}>Go Home</GlassButton>
        </GlassCard>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activity.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + activity.images.length) % activity.images.length);
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-primary-red transition-colors"
          whileHover={{ x: -5 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-yellow-50 border border-yellow-200 rounded-glass p-4 text-sm text-yellow-800"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <GlassCard className="overflow-hidden p-0">
              <div className="relative h-96 md:h-[500px]">
                <motion.img
                  key={currentImageIndex}
                  src={activity.images[currentImageIndex] || activity.images[0]}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {activity.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {activity.images.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </GlassCard>

            {/* Title and Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {activity.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary-yellow text-primary-yellow" />
                  <span className="font-semibold">{activity.rating}</span>
                  <span className="text-gray-600">({activity.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <GlassCard>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About this activity</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{activity.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-red" />
                    <div>
                      <div className="font-semibold text-gray-800">Duration</div>
                      <div className="text-gray-600">{activity.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary-red" />
                    <div>
                      <div className="font-semibold text-gray-800">Group Size</div>
                      <div className="text-gray-600">{activity.groupSize}</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Highlights */}
            {activity.highlights && activity.highlights.length > 0 && (
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
                  <ul className="space-y-3">
                    {activity.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-yellow mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            )}

            {/* What's Included */}
            {activity.included && activity.included.length > 0 && (
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
                  <ul className="space-y-3">
                    {activity.included.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="sticky top-32 p-6">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary-red mb-2">
                    ${activity.price}
                    <span className="text-lg font-normal text-gray-600">/person</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 fill-primary-yellow text-primary-yellow" />
                    <span className="font-semibold">{activity.rating}</span>
                    <span>({activity.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={today}
                      className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={numberOfGuests}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setNumberOfGuests(Math.max(1, Math.min(20, value)));
                      }}
                      className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                    />
                    <p className="text-xs text-gray-500 mt-1">Between 1 and 20 guests</p>
                  </div>
                </div>

                <GlassButton
                  variant="primary"
                  className="w-full text-lg py-4"
                  onClick={handleBookNow}
                  type="button"
                >
                  {checkingAvailability ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Checking...
                    </span>
                  ) : (
                    'Book Now'
                  )}
                </GlassButton>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Free cancellation up to 24 hours before
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
