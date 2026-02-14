import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Download,
  MapPin,
  Clock,
  Users,
  DollarSign,
  CreditCard,
  Plus,
  History,
  Ticket,
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import GlassButton from '../../components/GlassButton';

interface Booking {
  id: string;
  activityName: string;
  location: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingReference: string;
}

interface CreditTransaction {
  id: string;
  type: 'earned' | 'spent' | 'refunded';
  amount: number;
  description: string;
  date: string;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    activityName: 'Sunset Cruise with Dinner',
    location: 'Bali, Indonesia',
    date: '2024-02-15',
    time: '18:00',
    guests: 2,
    totalPrice: 178,
    status: 'confirmed',
    bookingReference: 'TB-2024-001234',
  },
  {
    id: '2',
    activityName: 'Temple Tour & Cultural Experience',
    location: 'Kyoto, Japan',
    date: '2024-02-20',
    time: '09:00',
    guests: 1,
    totalPrice: 65,
    status: 'confirmed',
    bookingReference: 'TB-2024-001235',
  },
  {
    id: '3',
    activityName: 'City Food Tour',
    location: 'Bangkok, Thailand',
    date: '2024-03-01',
    time: '12:00',
    guests: 3,
    totalPrice: 135,
    status: 'pending',
    bookingReference: 'TB-2024-001236',
  },
];

const mockTransactions: CreditTransaction[] = [
  {
    id: '1',
    type: 'earned',
    amount: 50,
    description: 'Referral bonus',
    date: '2024-01-10',
  },
  {
    id: '2',
    type: 'spent',
    amount: -20,
    description: 'Used for booking discount',
    date: '2024-01-15',
  },
  {
    id: '3',
    type: 'earned',
    amount: 10,
    description: 'Booking reward',
    date: '2024-01-20',
  },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bookings] = useState<Booking[]>(mockBookings);
  const [transactions] = useState<CreditTransaction[]>(mockTransactions);
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setCredit(parsedUser.credit || 0);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleDownloadTicket = (booking: Booking) => {
    // Generate ticket content
    const ticketContent = `
TRAVELBOOK - BOOKING TICKET
============================

Booking Reference: ${booking.bookingReference}
Activity: ${booking.activityName}
Location: ${booking.location}
Date: ${booking.date}
Time: ${booking.time}
Guests: ${booking.guests}
Total Price: $${booking.totalPrice}
Status: ${booking.status.toUpperCase()}

Thank you for booking with TravelBook!
    `;

    // Create and download file
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking.bookingReference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalSpent = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const upcomingBookings = bookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.date) >= new Date()
  );

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Manage your bookings, tickets, and credits</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Ticket className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{bookings.length}</h3>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{upcomingBookings.length}</h3>
            <p className="text-sm text-gray-600">Upcoming</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">${totalSpent}</h3>
            <p className="text-sm text-gray-600">Total Spent</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">${credit}</h3>
            <p className="text-sm text-gray-600">Available Credit</p>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                <GlassButton variant="secondary" onClick={() => navigate('/search')}>
                  Book Activity
                </GlassButton>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No bookings yet</p>
                  <GlassButton variant="primary" onClick={() => navigate('/search')}>
                    Browse Activities
                  </GlassButton>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/20 rounded-glass hover:bg-white/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1">{booking.activityName}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {booking.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Reference</p>
                          <p className="font-mono text-sm font-semibold text-gray-700">
                            {booking.bookingReference}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Total</p>
                          <p className="text-xl font-bold text-primary-red">${booking.totalPrice}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <GlassButton
                          variant="secondary"
                          onClick={() => handleDownloadTicket(booking)}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Ticket
                        </GlassButton>
                        {booking.status === 'confirmed' && (
                          <GlassButton
                            variant="secondary"
                            onClick={() => navigate(`/activity/${booking.id}`)}
                            className="flex items-center gap-2"
                          >
                            View Details
                          </GlassButton>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>

          {/* Credit & Transactions */}
          <div className="space-y-6">
            {/* Credit Card */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Credit Balance</h2>
                <CreditCard className="w-6 h-6 text-primary-red" />
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary-red mb-2">${credit}</p>
                <p className="text-sm text-gray-600">Available to use</p>
              </div>
              <GlassButton variant="primary" className="w-full flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add Credit
              </GlassButton>
            </GlassCard>

            {/* Recent Transactions */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
                <History className="w-5 h-5 text-gray-600" />
              </div>
              <div className="space-y-3">
                {transactions.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No transactions yet</p>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-white/20 rounded-glass"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{transaction.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`font-bold ${
                          transaction.type === 'earned' || transaction.type === 'refunded'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'spent' ? '-' : '+'}${Math.abs(transaction.amount)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
