# Viator API Integration Setup

This project is integrated with the Viator Partner API to fetch real activity data.

## Setup Instructions

### 1. Get Your Viator API Key

1. Visit [Viator Partner API Documentation](https://docs.viator.com/partner-api/)
2. Sign up for a Viator Partner account
3. Obtain your API key from the partner dashboard

### 2. Configure Environment Variables

Create a `.env` file in the `project` directory (same level as `package.json`):

```env
VITE_VIATOR_API_KEY=your_api_key_here
VITE_VIATOR_API_URL=https://api.viator.com/partner/v2
```

**Important:** 
- Never commit your `.env` file to version control (it's already in `.gitignore`)
- Replace `your_api_key_here` with your actual API key
- The API URL defaults to the production endpoint if not specified

### 3. Restart Development Server

After adding your API key, restart the development server:

```bash
npm run dev
```

## How It Works

### API Integration Points

1. **HomePage** (`/src/pages/HomePage.tsx`)
   - Fetches popular activities on page load
   - Falls back to mock data if API is not configured or fails

2. **SearchResultsPage** (`/src/pages/SearchResultsPage.tsx`)
   - Searches activities based on query and location
   - Supports filtering by category, price, and rating

3. **ActivityDetailPage** (`/src/pages/ActivityDetailPage.tsx`)
   - Fetches detailed information for a specific activity
   - Checks availability for selected date and number of guests
   - Guest selector is now a number input (1-20 guests)

### Fallback Behavior

The application gracefully falls back to mock data if:
- API key is not configured
- API request fails
- Network errors occur

This ensures the UI always works, even without API access.

## API Service

The Viator API service is located in `/src/services/viatorApi.ts` and includes:

- `searchProducts()` - Search for activities
- `getProductDetails()` - Get detailed activity information
- `checkAvailability()` - Check if an activity is available for a date
- `getPopularProducts()` - Get popular activities for homepage

## TypeScript Types

All Viator API types are defined in `/src/types/viator.ts`:

- `ViatorProduct` - Basic product information
- `ViatorProductDetail` - Detailed product information
- `ViatorSearchResponse` - Search results
- `ViatorAvailabilityResponse` - Availability check response

## Testing Without API

If you don't have an API key yet, the application will:
- Use mock data automatically
- Display a warning message (in development mode)
- Still function fully with sample activities

## Production Deployment

For production (Vercel):

1. Add environment variables in your Vercel dashboard:
   - `VITE_VIATOR_API_KEY` - Your API key
   - `VITE_VIATOR_API_URL` - API endpoint (optional)

2. Redeploy your application

**Note:** Since the frontend is in Vercel and backend is in AWS, you may want to create an API proxy in your AWS backend to keep the API key secure. The current implementation uses the API key directly in the frontend, which is acceptable for Viator's Partner API but consider proxying through your backend for additional security.

## Troubleshooting

### API Not Working

1. Check that your `.env` file exists and has the correct variable name
2. Verify your API key is valid
3. Check browser console for error messages
4. Ensure you've restarted the dev server after adding `.env` file

### CORS Issues

If you encounter CORS errors, you may need to:
- Set up a proxy in your Vite config
- Or use your AWS backend as a proxy for API requests

## Next Steps

- Implement booking flow with Viator API
- Add more advanced filtering options
- Integrate with payment processing
- Add user authentication
