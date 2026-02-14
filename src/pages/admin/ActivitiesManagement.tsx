import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import GlassButton from '../../components/GlassButton';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  status: 'active' | 'inactive' | 'draft';
  bookings: number;
  revenue: number;
}

// Mock data - in real app, fetch from API
const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Sunset Cruise with Dinner',
    location: 'Bali, Indonesia',
    price: 89,
    rating: 4.8,
    status: 'active',
    bookings: 342,
    revenue: 30438,
  },
  {
    id: '2',
    title: 'Temple Tour & Cultural Experience',
    location: 'Kyoto, Japan',
    price: 65,
    rating: 4.9,
    status: 'active',
    bookings: 521,
    revenue: 33865,
  },
  {
    id: '3',
    title: 'Mountain Hiking Adventure',
    location: 'Swiss Alps',
    price: 120,
    rating: 4.7,
    status: 'active',
    bookings: 189,
    revenue: 22680,
  },
];

export default function ActivitiesManagement() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter((a) => a.id !== id));
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Activities Management</h1>
          <p className="text-gray-600">Manage all your activities and tours</p>
        </div>
        <GlassButton
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Activity
        </GlassButton>
      </motion.div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-md rounded-glass">
            <Search className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Activities Table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Activity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Bookings</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Revenue</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredActivities.map((activity, index) => (
                <motion.tr
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-600">Rating: {activity.rating} ⭐</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{activity.location}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-primary-red">${activity.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : activity.status === 'inactive'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{activity.bookings}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">${activity.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/activity/${activity.id}`)}
                        className="p-2 text-gray-600 hover:text-primary-red transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/activities/edit/${activity.id}`)}
                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Add Activity Modal */}
      {showAddModal && (
        <AddActivityModal onClose={() => setShowAddModal(false)} onSave={(activity) => {
          setActivities([...activities, { ...activity, id: String(activities.length + 1) }]);
          setShowAddModal(false);
        }} />
      )}
    </div>
  );
}

function AddActivityModal({ onClose, onSave }: { onClose: () => void; onSave: (activity: any) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    status: 'draft' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      rating: 0,
      bookings: 0,
      revenue: 0,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>
            <div className="flex gap-4 justify-end">
              <GlassButton type="button" variant="secondary" onClick={onClose}>
                Cancel
              </GlassButton>
              <GlassButton type="submit" variant="primary">
                Save Activity
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
