import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerChatbot from './components/CustomerChatbot';
import OfferPopup from './components/OfferPopup';
import HomePage from './pages/HomePage';
import JourneyPage from './pages/journey/JourneyPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ProtectedCustomerRoute from './components/auth/ProtectedCustomerRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ActivitiesManagement from './pages/admin/ActivitiesManagement';
import SalesAnalytics from './pages/admin/SalesAnalytics';
import SupportTickets from './pages/admin/SupportTickets';
import Chatbot from './components/admin/Chatbot';
import UsersManagement from './pages/admin/UsersManagement';
import Settings from './pages/admin/Settings';
import OfferManagement from './pages/admin/OfferManagement';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Romantic Journey - full screen, no navbar */}
        <Route path="/journey" element={<JourneyPage />} />
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/activity/:id" element={<ActivityDetailPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedCustomerRoute>
                      <CustomerDashboard />
                    </ProtectedCustomerRoute>
                  }
                />
              </Routes>
              <CustomerChatbot />
              <OfferPopup />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="activities" element={<ActivitiesManagement />} />
          <Route path="sales" element={<SalesAnalytics />} />
          <Route path="support" element={<SupportTickets />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="offers" element={<OfferManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
