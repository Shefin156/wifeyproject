import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  MessageSquare,
  Bot,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Tag,
} from 'lucide-react';
import GlassCard from '../GlassCard';

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Activities', path: '/admin/activities' },
  { icon: TrendingUp, label: 'Sales & Analytics', path: '/admin/sales' },
  { icon: MessageSquare, label: 'Support Tickets', path: '/admin/support' },
  { icon: Bot, label: 'Chatbot', path: '/admin/chatbot' },
  { icon: Tag, label: 'Offers', path: '/admin/offers' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    // In real app, clear auth token and redirect
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-red to-primary-yellow bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-glass bg-white/20 hover:bg-white/30 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarOpen ? (window.innerWidth >= 1024 ? '280px' : '100%') : '0px',
            opacity: sidebarOpen ? 1 : 0,
          }}
          className={`fixed lg:sticky top-0 left-0 h-screen z-40 lg:z-auto overflow-hidden ${
            sidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <GlassCard className="h-full m-4 lg:m-0 lg:rounded-none lg:border-0 bg-white/30 backdrop-blur-xl border border-white/20">
            <div className="p-6 h-full flex flex-col">
              {/* Logo */}
              <div className="mb-8 hidden lg:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-red to-primary-yellow bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-600 mt-1">TravelBook Management</p>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 space-y-2">
                {adminMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-glass transition-all ${
                        isActive
                          ? 'bg-primary-red text-white shadow-lg shadow-primary-red/30'
                          : 'text-gray-700 hover:bg-white/30'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-glass text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </GlassCard>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 pt-20 lg:pt-6 p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
