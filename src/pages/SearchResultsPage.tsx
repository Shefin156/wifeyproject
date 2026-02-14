import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, Loader2 } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import GlassCard from '../components/GlassCard';
import SearchBar from '../components/SearchBar';
import { searchProducts } from '../services/viatorApi';
import { isViatorApiConfigured } from '../utils/env';
import type { ViatorProduct } from '../types/viator';

// Mock data - fallback
const mockAllActivities = [
  {
    id: '1',
    title: 'Sunset Cruise with Dinner',
    location: 'Bali, Indonesia',
    price: 89,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    category: 'Cruise',
  },
  {
    id: '2',
    title: 'Temple Tour & Cultural Experience',
    location: 'Kyoto, Japan',
    price: 65,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    category: 'Culture',
  },
  {
    id: '3',
    title: 'Mountain Hiking Adventure',
    location: 'Swiss Alps',
    price: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Adventure',
  },
  {
    id: '4',
    title: 'City Food Tour',
    location: 'Bangkok, Thailand',
    price: 45,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    category: 'Food',
  },
  {
    id: '5',
    title: 'Desert Safari Experience',
    location: 'Dubai, UAE',
    price: 95,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
    category: 'Adventure',
  },
  {
    id: '6',
    title: 'Beach Yoga & Meditation',
    location: 'Maldives',
    price: 55,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    category: 'Wellness',
  },
  {
    id: '7',
    title: 'Wine Tasting Tour',
    location: 'Tuscany, Italy',
    price: 75,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
    category: 'Food',
  },
  {
    id: '8',
    title: 'Snorkeling Adventure',
    location: 'Great Barrier Reef',
    price: 110,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    category: 'Adventure',
  },
];

const categories = ['All', 'Adventure', 'Culture', 'Food', 'Cruise', 'Wellness'];

// Helper to transform Viator product to ActivityCard format
function transformProductToCard(product: ViatorProduct, index: number): any {
  const imageUrl =
    product.images?.[0]?.variants?.large?.url ||
    product.images?.[0]?.variants?.medium?.url ||
    product.images?.[0]?.variants?.small?.url ||
    mockAllActivities[index]?.image ||
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop';

  // Extract category from product (you may need to adjust this based on Viator API response)
  const category = 'Adventure'; // Default, adjust based on API response

  return {
    id: product.productCode || String(index + 1),
    title: product.productTitle || mockAllActivities[index]?.title || 'Activity',
    location: product.destination?.destinationName || mockAllActivities[index]?.location || '',
    price: product.price?.amount || mockAllActivities[index]?.price || 0,
    rating: product.rating?.averageRating || mockAllActivities[index]?.rating || 0,
    image: imageUrl,
    category: category,
  };
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [activities, setActivities] = useState<any[]>(mockAllActivities);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        if (isViatorApiConfigured() && (query || location)) {
          const response = await searchProducts({
            searchQuery: query || undefined,
            destination: location || undefined,
            category: selectedCategory !== 'All' ? selectedCategory : undefined,
            pageSize: 50,
          });

          if (response.products.length > 0) {
            const transformed = response.products.map((product, index) =>
              transformProductToCard(product, index)
            );
            setActivities(transformed);
          }
        } else {
          // Use mock data if API not configured or no search query
          setActivities(mockAllActivities);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setActivities(mockAllActivities);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [query, location, selectedCategory]);

  // Apply client-side filtering (for mock data or additional filtering)
  const filteredActivities = activities.filter((activity) => {
    const matchesQuery = !query || activity.title.toLowerCase().includes(query.toLowerCase());
    const matchesLocation =
      !location || activity.location.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesPrice = activity.price >= priceRange[0] && activity.price <= priceRange[1];
    const matchesRating = activity.rating >= minRating;

    return matchesQuery && matchesLocation && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Header and Filter Toggle */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {query || location ? 'Search Results' : 'All Activities'}
            </h1>
            <p className="text-gray-600">
              Found {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
            </p>
          </motion.div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-700 hover:bg-white/40 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <GlassCard className="p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-600 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-glass transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-red text-white'
                          : 'bg-white/20 hover:bg-white/30 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </h3>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[0, 4, 4.5, 4.7].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full text-left px-4 py-2 rounded-glass transition-colors ${
                        minRating === rating
                          ? 'bg-primary-yellow text-gray-800'
                          : 'bg-white/20 hover:bg-white/30 text-gray-700'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Results Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 text-primary-red animate-spin" />
              </div>
            ) : filteredActivities.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    {...activity}
                    onClick={() => navigate(`/activity/${activity.id}`)}
                  />
                ))}
              </motion.div>
            ) : (
              <GlassCard className="p-12 text-center">
                <p className="text-xl text-gray-600 mb-4">No activities found</p>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
