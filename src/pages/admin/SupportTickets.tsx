import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import GlassButton from '../../components/GlassButton';

interface Ticket {
  id: string;
  customer: string;
  email: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    customer: 'John Doe',
    email: 'john@example.com',
    subject: 'Booking Cancellation Request',
    message: 'I need to cancel my booking for the Sunset Cruise scheduled for next week.',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Payment Issue',
    message: 'I was charged twice for my booking. Please refund one of the charges.',
    status: 'in-progress',
    priority: 'urgent',
    createdAt: '2024-01-14T14:20:00',
    updatedAt: '2024-01-15T09:15:00',
  },
  {
    id: '3',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    subject: 'Activity Question',
    message: 'What should I bring for the Mountain Hiking Adventure?',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-01-13T16:45:00',
    updatedAt: '2024-01-14T11:30:00',
  },
];

export default function SupportTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const updateTicketStatus = (id: string, status: Ticket['status']) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status, updatedAt: new Date().toISOString() } : ticket
      )
    );
    if (selectedTicket?.id === id) {
      setSelectedTicket({ ...selectedTicket, status, updatedAt: new Date().toISOString() });
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Support Tickets</h1>
          <p className="text-gray-600">Manage customer support requests</p>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">{filteredTickets.length}</span> tickets
        </div>
      </motion.div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-md rounded-glass">
            <Search className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-800"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-glass text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-red"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                onClick={() => setSelectedTicket(ticket)}
                className="cursor-pointer"
              >
                <GlassCard
                  className={`p-6 hover:scale-[1.02] transition-transform ${
                    selectedTicket?.id === ticket.id ? 'ring-2 ring-primary-red' : ''
                  }`}
                >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-800">{ticket.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{ticket.customer} • {ticket.email}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{ticket.message}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-1">
          {selectedTicket ? (
            <GlassCard className="p-6 sticky top-32">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTicket.subject}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Customer</p>
                  <p className="text-gray-800">{selectedTicket.customer}</p>
                  <p className="text-sm text-gray-600">{selectedTicket.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Message</p>
                  <p className="text-gray-800">{selectedTicket.message}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Created</p>
                  <p className="text-gray-600">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  <GlassButton
                    variant="secondary"
                    onClick={() => updateTicketStatus(selectedTicket.id, 'in-progress')}
                    className="text-xs py-2"
                  >
                    In Progress
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')}
                    className="text-xs py-2"
                  >
                    Resolve
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    onClick={() => updateTicketStatus(selectedTicket.id, 'closed')}
                    className="text-xs py-2"
                  >
                    Close
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    onClick={() => {
                      // In real app, open email client or send response
                      alert('Response sent to customer');
                    }}
                    className="text-xs py-2"
                  >
                    Reply
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-6 text-center text-gray-500">
              Select a ticket to view details
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
