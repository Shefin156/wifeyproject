import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Settings } from 'lucide-react';
import GlassCard from '../GlassCard';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotConfig {
  enabled: boolean;
  welcomeMessage: string;
  responses: Record<string, string>;
}

const defaultConfig: ChatbotConfig = {
  enabled: true,
  welcomeMessage: 'Hello! I\'m your travel assistant. How can I help you today?',
  responses: {
    hello: 'Hello! How can I assist you with your travel plans today?',
    booking: 'I can help you with bookings! What activity are you interested in?',
    cancel: 'I can help you cancel a booking. Please provide your booking reference number.',
    payment: 'For payment issues, please contact our support team at support@travelbook.com',
    activities: 'We have many exciting activities! You can browse them on our homepage or use the search function.',
    default: 'I\'m here to help! You can ask me about bookings, activities, payments, or cancellations.',
  },
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: defaultConfig.welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [config, setConfig] = useState<ChatbotConfig>(defaultConfig);
  const [showConfig, setShowConfig] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return config.responses.hello;
    }
    if (lowerMessage.includes('book') || lowerMessage.includes('booking')) {
      return config.responses.booking;
    }
    if (lowerMessage.includes('cancel')) {
      return config.responses.cancel;
    }
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return config.responses.payment;
    }
    if (lowerMessage.includes('activity') || lowerMessage.includes('tour')) {
      return config.responses.activities;
    }
    
    return config.responses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Chatbot Management</h1>
          <p className="text-gray-600">Configure and test your customer support chatbot</p>
        </div>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="px-4 py-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 hover:bg-white/40 transition-colors flex items-center gap-2"
        >
          <Settings className="w-5 h-5" />
          Configure
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <GlassCard className="p-0 overflow-hidden h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 bg-white/10 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-red to-primary-yellow flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Travel Assistant</p>
                  <p className="text-xs text-gray-600">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user'
                            ? 'bg-primary-red'
                            : 'bg-gradient-to-br from-primary-red to-primary-yellow'
                        }`}
                      >
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-glass-lg px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-primary-red text-white'
                            : 'bg-white/30 backdrop-blur-md text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-primary-red text-white rounded-glass hover:bg-primary-red/90 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence>
            {showConfig && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Chatbot Configuration</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Welcome Message
                      </label>
                      <textarea
                        value={config.welcomeMessage}
                        onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={config.enabled}
                          onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-semibold text-gray-700">Enable Chatbot</span>
                      </label>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Quick Responses</p>
                      <div className="space-y-2">
                        {Object.entries(config.responses).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-xs text-gray-600">{key}</label>
                            <textarea
                              value={value}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  responses: { ...config.responses, [key]: e.target.value },
                                })
                              }
                              rows={2}
                              className="w-full px-3 py-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // In real app, save to backend
                        alert('Configuration saved!');
                        setShowConfig(false);
                      }}
                      className="w-full px-4 py-2 bg-primary-red text-white rounded-glass hover:bg-primary-red/90 transition-colors font-semibold"
                    >
                      Save Configuration
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {!showConfig && (
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Chatbot Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-600">Active</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Conversations</p>
                  <p className="text-lg font-semibold text-gray-800">1,234</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-lg font-semibold text-gray-800">0.5s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Satisfaction Rate</p>
                  <p className="text-lg font-semibold text-green-600">92%</p>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
