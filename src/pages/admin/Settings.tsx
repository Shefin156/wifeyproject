import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Shield, Globe, CreditCard } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import GlassButton from '../../components/GlassButton';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'TravelBook',
    siteEmail: 'support@travelbook.com',
    currency: 'USD',
    timezone: 'UTC',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
  });

  const handleSave = () => {
    // In real app, save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your application settings</p>
      </motion.div>

      {/* General Settings */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-primary-red" />
          <h2 className="text-2xl font-bold text-gray-800">General Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Support Email</label>
            <input
              type="email"
              value={settings.siteEmail}
              onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary-red" />
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: e.target.checked },
                })
              }
              className="w-5 h-5"
            />
            <span className="text-gray-700">Email Notifications</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.sms}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, sms: e.target.checked },
                })
              }
              className="w-5 h-5"
            />
            <span className="text-gray-700">SMS Notifications</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: e.target.checked },
                })
              }
              className="w-5 h-5"
            />
            <span className="text-gray-700">Push Notifications</span>
          </label>
        </div>
      </GlassCard>

      {/* Security */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary-red" />
          <h2 className="text-2xl font-bold text-gray-800">Security</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.security.twoFactor}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactor: e.target.checked },
                })
              }
              className="w-5 h-5"
            />
            <span className="text-gray-700">Enable Two-Factor Authentication</span>
          </label>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="120"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, sessionTimeout: parseInt(e.target.value) },
                })
              }
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>
        </div>
      </GlassCard>

      {/* Payment Settings */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-primary-red" />
          <h2 className="text-2xl font-bold text-gray-800">Payment Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stripe API Key (hidden)
            </label>
            <input
              type="password"
              value="sk_live_••••••••••••••••"
              readOnly
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PayPal Client ID (hidden)
            </label>
            <input
              type="password"
              value="••••••••••••••••"
              readOnly
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800"
            />
          </div>
        </div>
      </GlassCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <GlassButton variant="primary" onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save All Settings
        </GlassButton>
      </div>
    </div>
  );
}
