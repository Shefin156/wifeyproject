# Admin Panel Documentation

A comprehensive admin panel for managing your TravelBook activity booking platform.

## Features

### 🎯 Dashboard
- Real-time statistics overview
- Revenue and booking metrics
- Recent bookings display
- Quick action buttons
- Growth indicators

### 📦 Activities Management
- View all activities in a table format
- Add new activities with full form
- Edit existing activities
- Delete activities
- Filter by status (Active, Inactive, Draft)
- Search functionality
- View activity details

### 📊 Sales & Analytics
- Revenue tracking with charts
- Booking statistics
- Top performing activities
- Date range filtering
- Export functionality
- Average daily metrics

### 💬 Support Tickets
- View all customer support tickets
- Filter by status and priority
- Update ticket status
- Reply to customers
- Ticket details panel
- Search functionality

### 🤖 Chatbot Management
- Interactive chatbot interface
- Configure welcome messages
- Customize responses
- Enable/disable chatbot
- Test chatbot functionality
- View chatbot statistics

### 👥 Users Management
- View all users
- Filter by role (Admin, Customer, Support)
- Filter by status (Active, Inactive, Suspended)
- Edit user details
- Change user status
- Delete users
- Search users

### ⚙️ Settings
- General settings (site name, email, currency, timezone)
- Notification preferences
- Security settings (2FA, session timeout)
- Payment gateway configuration

## Access

### Login
Navigate to `/admin/login` to access the admin panel.

**Demo Credentials:**
- Email: `admin@travelbook.com`
- Password: `admin123`

### Protected Routes
All admin routes are protected and require authentication. If not logged in, users will be redirected to the login page.

## Routes

- `/admin` - Dashboard
- `/admin/activities` - Activities Management
- `/admin/sales` - Sales & Analytics
- `/admin/support` - Support Tickets
- `/admin/chatbot` - Chatbot Management
- `/admin/users` - Users Management
- `/admin/settings` - Settings

## Components

### AdminLayout
The main layout component that provides:
- Sidebar navigation
- Responsive design
- Mobile-friendly menu
- Logout functionality

### ProtectedRoute
Component that wraps admin routes to ensure authentication.

## Authentication

Currently uses simple localStorage-based authentication. In production, you should:
- Implement proper JWT tokens
- Use secure HTTP-only cookies
- Add refresh token mechanism
- Implement role-based access control (RBAC)
- Add session management

## Data Management

### Mock Data
The admin panel currently uses mock data for demonstration. To integrate with your backend:

1. Update API service files in `/src/services/`
2. Replace mock data with API calls
3. Add error handling
4. Implement loading states
5. Add data caching if needed

### API Integration Points

- **Dashboard Stats**: Fetch from `/api/admin/stats`
- **Activities**: CRUD operations via `/api/admin/activities`
- **Sales Data**: Fetch from `/api/admin/sales`
- **Support Tickets**: Manage via `/api/admin/tickets`
- **Users**: Manage via `/api/admin/users`
- **Settings**: Update via `/api/admin/settings`

## Styling

The admin panel uses the same glassmorphism design system as the main site:
- Glass cards with backdrop blur
- Primary colors (Red #E63946, Yellow #F4D35E)
- Smooth animations with Framer Motion
- Responsive design

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics with charts
- [ ] Bulk operations
- [ ] Export to CSV/PDF
- [ ] Activity image upload
- [ ] Email integration for support
- [ ] Advanced chatbot AI integration
- [ ] User activity logs
- [ ] Audit trail
- [ ] Multi-language support
- [ ] Dark mode

## Security Considerations

1. **Authentication**: Implement proper authentication system
2. **Authorization**: Add role-based access control
3. **API Security**: Use HTTPS and secure API endpoints
4. **Input Validation**: Validate all user inputs
5. **XSS Protection**: Sanitize user-generated content
6. **CSRF Protection**: Implement CSRF tokens
7. **Rate Limiting**: Add rate limiting to API endpoints
8. **Audit Logging**: Log all admin actions

## Development

To add new admin features:

1. Create component in `/src/pages/admin/`
2. Add route in `App.tsx`
3. Add menu item in `AdminLayout.tsx`
4. Create API service if needed
5. Add TypeScript types
6. Test functionality

## Support

For issues or questions about the admin panel, please contact the development team.
