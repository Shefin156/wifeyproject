import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ActivityCard from '../components/ActivityCard';
import GlassCard from '../components/GlassCard';
import TravelCharacter from '../components/TravelCharacter';
import { getPopularProducts } from '../services/viatorApi';
import { isViatorApiConfigured } from '../utils/env';
import type { ViatorProduct } from '../types/viator';

// Mock data for popular activities (fallback)
const mockPopularActivities = [
  {
    id: '1',
    title: 'Sunset Cruise with Dinner',
    location: 'Bali, Indonesia',
    price: 89,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Temple Tour & Cultural Experience',
    location: 'Kyoto, Japan',
    price: 65,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Mountain Hiking Adventure',
    location: 'Swiss Alps',
    price: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'City Food Tour',
    location: 'Bangkok, Thailand',
    price: 45,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Desert Safari Experience',
    location: 'Dubai, UAE',
    price: 95,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'Beach Yoga & Meditation',
    location: 'Maldives',
    price: 55,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
  },
];

// Helper to transform Viator product to ActivityCard format
function transformProductToCard(product: ViatorProduct, index: number): any {
  const imageUrl =
    product.images?.[0]?.variants?.large?.url ||
    product.images?.[0]?.variants?.medium?.url ||
    product.images?.[0]?.variants?.small?.url ||
    mockPopularActivities[index]?.image ||
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop';

  return {
    id: product.productCode || String(index + 1),
    title: product.productTitle || mockPopularActivities[index]?.title || 'Activity',
    location: product.destination?.destinationName || mockPopularActivities[index]?.location || '',
    price: product.price?.amount || mockPopularActivities[index]?.price || 0,
    rating: product.rating?.averageRating || mockPopularActivities[index]?.rating || 0,
    image: imageUrl,
  };
}

export default function HomePage() {
  const navigate = useNavigate();
  const [popularActivities, setPopularActivities] = useState<any[]>(mockPopularActivities);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularActivities = async () => {
      setLoading(true);
      try {
        if (isViatorApiConfigured()) {
          const products = await getPopularProducts(6);
          if (products.length > 0) {
            const transformed = products.map((product, index) =>
              transformProductToCard(product, index)
            );
            setPopularActivities(transformed);
          }
        }
      } catch (error) {
        console.error('Error fetching popular activities:', error);
        // Keep mock data on error
      } finally {
        setLoading(false);
      }
    };

    fetchPopularActivities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red/10 via-primary-yellow/10 to-transparent"></div>
        {/* Travel Character Background Animation */}
        <TravelCharacter />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-red via-primary-yellow to-primary-red bg-clip-text text-transparent">
              Discover Your Next
              <br />
              Adventure
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Book unforgettable experiences and activities around the world. From city tours to
              extreme adventures, find your perfect escape.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-16">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Activities', value: '10,000+' },
              { label: 'Destinations', value: '500+' },
              { label: 'Happy Travelers', value: '1M+' },
            ].map((stat, index) => (
              <GlassCard key={index} hover={false}>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary-red mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Activities Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Popular Activities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked experiences loved by travelers worldwide
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-primary-red animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  onClick={() => navigate(`/activity/${activity.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Explore thousands of activities and create memories that last a lifetime.
              </p>
              <motion.button
                onClick={() => navigate('/search')}
                className="px-8 py-4 bg-primary-red text-white rounded-glass-lg font-semibold text-lg hover:bg-primary-red/90 transition-colors shadow-lg shadow-primary-red/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore All Activities
              </motion.button>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
