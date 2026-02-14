import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Package, MessageSquare, ArrowUpRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  totalActivities: number;
  activeUsers: number;
  pendingTickets: number;
  revenueGrowth: number;
  bookingsGrowth: number;
}

// Mock data - in real app, fetch from API
const mockStats: DashboardStats = {
  totalRevenue: 125430,
  totalBookings: 3421,
  totalActivities: 156,
  activeUsers: 8923,
  pendingTickets: 12,
  revenueGrowth: 23.5,
  bookingsGrowth: 18.2,
};

const recentBookings = [
  { id: '1', customer: 'John Doe', activity: 'Sunset Cruise', amount: 178, date: '2024-01-15' },
  { id: '2', customer: 'Jane Smith', activity: 'Temple Tour', amount: 130, date: '2024-01-15' },
  { id: '3', customer: 'Mike Johnson', activity: 'Food Tour', amount: 90, date: '2024-01-14' },
  { id: '4', customer: 'Sarah Williams', activity: 'Desert Safari', amount: 190, date: '2024-01-14' },
];

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>(mockStats);

  useEffect(() => {
    // In real app, fetch stats from API
    // fetchDashboardStats().then(setStats);
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      growth: stats.bookingsGrowth,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Activities',
      value: stats.totalActivities.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Pending Tickets',
      value: stats.pendingTickets.toString(),
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 hover:scale-105 transition-transform">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-glass ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {stat.growth && (
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <ArrowUpRight className="w-4 h-4" />
                      {stat.growth}%
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
            <button className="text-primary-red hover:text-primary-red/80 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-white/20 rounded-glass hover:bg-white/30 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-800">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-red">${booking.amount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-primary-red text-white rounded-glass-lg font-semibold hover:bg-primary-red/90 transition-colors"
            >
              Add Activity
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass-lg font-semibold text-gray-800 hover:bg-white/40 transition-colors"
            >
              View Reports
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass-lg font-semibold text-gray-800 hover:bg-white/40 transition-colors"
            >
              Manage Users
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass-lg font-semibold text-gray-800 hover:bg-white/40 transition-colors"
            >
              Settings
            </motion.button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
