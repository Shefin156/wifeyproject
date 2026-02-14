import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Calendar, Download } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

interface SalesData {
  date: string;
  revenue: number;
  bookings: number;
}

// Mock data - in real app, fetch from API
const mockSalesData: SalesData[] = [
  { date: '2024-01-01', revenue: 12500, bookings: 142 },
  { date: '2024-01-02', revenue: 15200, bookings: 168 },
  { date: '2024-01-03', revenue: 13800, bookings: 155 },
  { date: '2024-01-04', revenue: 16200, bookings: 178 },
  { date: '2024-01-05', revenue: 14500, bookings: 162 },
  { date: '2024-01-06', revenue: 17800, bookings: 195 },
  { date: '2024-01-07', revenue: 19200, bookings: 210 },
];

const topActivities = [
  { name: 'Sunset Cruise', revenue: 30438, bookings: 342, growth: 15 },
  { name: 'Temple Tour', revenue: 33865, bookings: 521, growth: 23 },
  { name: 'Food Tour', revenue: 22680, bookings: 189, growth: 8 },
  { name: 'Desert Safari', revenue: 19000, bookings: 200, growth: 12 },
];

export default function SalesAnalytics() {
  const [dateRange, setDateRange] = useState('7d');
  const [salesData] = useState<SalesData[]>(mockSalesData);

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalBookings = salesData.reduce((sum, day) => sum + day.bookings, 0);
  const avgRevenue = totalRevenue / salesData.length;
  const avgBookings = totalBookings / salesData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sales & Analytics</h1>
          <p className="text-gray-600">Track your revenue and booking performance</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 hover:bg-white/40 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">${totalRevenue.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{totalBookings.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Bookings</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">${Math.round(avgRevenue).toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Avg Daily Revenue</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{Math.round(avgBookings)}</h3>
          <p className="text-sm text-gray-600">Avg Daily Bookings</p>
        </GlassCard>
      </div>

      {/* Revenue Chart */}
      <GlassCard className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Revenue Trend</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {salesData.map((day, index) => {
            const maxRevenue = Math.max(...salesData.map((d) => d.revenue));
            const height = (day.revenue / maxRevenue) * 100;
            return (
              <motion.div
                key={day.date}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-primary-red to-primary-yellow rounded-t-lg hover:opacity-80 transition-opacity relative group"
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${day.revenue.toLocaleString()}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          {salesData.map((day) => (
            <span key={day.date}>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          ))}
        </div>
      </GlassCard>

      {/* Top Activities */}
      <GlassCard className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Performing Activities</h2>
        <div className="space-y-4">
          {topActivities.map((activity, index) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/20 rounded-glass hover:bg-white/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-glass bg-gradient-to-br from-primary-red to-primary-yellow flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{activity.name}</p>
                  <p className="text-sm text-gray-600">{activity.bookings} bookings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-red">${activity.revenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{activity.growth}%</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
