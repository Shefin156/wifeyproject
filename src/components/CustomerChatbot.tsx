import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, X, Minimize2, MessageCircle } from 'lucide-react';
import GlassCard from './GlassCard';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const chatbotResponses: Record<string, string> = {
  hello: 'Hello! I\'m your travel assistant. How can I help you plan your perfect adventure today?',
  booking: 'I can help you with bookings! What activity are you interested in? You can browse our activities or search for something specific.',
  cancel: 'I can help you cancel a booking. Please provide your booking reference number, or you can contact our support team at support@travelbook.com',
  payment: 'For payment issues, please contact our support team at support@travelbook.com or call us at +1 (555) 123-4567. We\'re here to help!',
  activities: 'We have many exciting activities! You can browse them on our homepage or use the search function. What type of adventure are you looking for?',
  price: 'Our activities range from $45 to $200 per person. Prices vary based on the activity type and duration. Would you like to see specific activities?',
  location: 'We offer activities in amazing destinations worldwide including Bali, Kyoto, Swiss Alps, Bangkok, Dubai, Maldives, and many more!',
  help: 'I\'m here to help! You can ask me about:\n• Booking activities\n• Canceling bookings\n• Payment questions\n• Activity recommendations\n• General inquiries',
  default: 'I\'m here to help! You can ask me about bookings, activities, payments, or cancellations. How can I assist you today?',
};

export default function CustomerChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: chatbotResponses.hello,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return chatbotResponses.hello;
    }
    if (lowerMessage.includes('book') || lowerMessage.includes('booking') || lowerMessage.includes('reserve')) {
      return chatbotResponses.booking;
    }
    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return chatbotResponses.cancel;
    }
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('charge')) {
      return chatbotResponses.payment;
    }
    if (lowerMessage.includes('activity') || lowerMessage.includes('tour') || lowerMessage.includes('experience')) {
      return chatbotResponses.activities;
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
      return chatbotResponses.price;
    }
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('destination')) {
      return chatbotResponses.location;
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return chatbotResponses.help;
    }
    
    return chatbotResponses.default;
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

  const handleQuickAction = (action: string) => {
    const quickMessages: Record<string, string> = {
      'Browse Activities': 'I want to see activities',
      'Booking Help': 'I need help with booking',
      'Cancel Booking': 'I want to cancel my booking',
      'Contact Support': 'I need to contact support',
    };

    const message = quickMessages[action] || action;
    setInput(message);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary-red to-primary-yellow rounded-full shadow-2xl shadow-primary-red/30 flex items-center justify-center text-white hover:shadow-primary-red/50 transition-shadow"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } transition-all duration-300`}
          >
            <GlassCard className="h-full flex flex-col overflow-hidden p-0 shadow-2xl">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-primary-red to-primary-yellow flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Travel Assistant</p>
                    <p className="text-xs text-white/80">We're here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="p-4 border-b border-white/20">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">Quick Actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {['Browse Activities', 'Booking Help', 'Cancel Booking', 'Contact Support'].map(
                          (action) => (
                            <button
                              key={action}
                              onClick={() => handleQuickAction(action)}
                              className="px-3 py-1.5 text-xs bg-white/20 backdrop-blur-md rounded-glass text-gray-700 hover:bg-white/30 transition-colors"
                            >
                              {action}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

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
                            className={`flex items-start gap-2 max-w-[85%] ${
                              message.sender === 'user' ? 'flex-row-reverse' : ''
                            }`}
                          >
                            {message.sender === 'bot' && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-red to-primary-yellow flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div
                              className={`rounded-glass-lg px-4 py-3 ${
                                message.sender === 'user'
                                  ? 'bg-primary-red text-white'
                                  : 'bg-white/30 backdrop-blur-md text-gray-800'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            </div>
                            {message.sender === 'user' && (
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-gray-700">U</span>
                              </div>
                            )}
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
                        className="flex-1 px-4 py-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-red text-sm"
                      />
                      <button
                        onClick={handleSend}
                        className="px-4 py-3 bg-primary-red text-white rounded-glass hover:bg-primary-red/90 transition-colors flex items-center justify-center"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Press Enter to send • Shift+Enter for new line
                    </p>
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
