# SkinAlyze Frontend

React + TypeScript frontend for SkinAlyze - A skincare and lifestyle tracking application.

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **TanStack Query** - Data fetching
- **Axios** - HTTP client
- **React Hook Form + Zod** - Form handling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
cd frontend
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   └── Layout.tsx    # Main layout with navigation
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── onboarding/   # Onboarding flow
│   │   ├── dailylog/     # Daily logging
│   │   ├── products/     # Product management
│   │   ├── analytics/    # Analytics & insights
│   │   └── goals/        # Goals tracking
│   ├── services/         # API services
│   │   └── apiClient.ts  # Axios configuration
│   ├── context/          # State management
│   │   └── authStore.ts  # Authentication store
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## Features

- **Authentication**: Login/Register with JWT
- **Onboarding**: Setup profile and baseline routine
- **Daily Logging**: Quick skin condition and lifestyle tracking
- **Product Library**: Manage skincare products
- **Analytics**: Visualize patterns and correlations
- **Goals**: Set and track skincare goals

## Development Guidelines

- Use TypeScript for type safety
- Follow React hooks best practices
- Use Tailwind CSS for styling
- Keep components small and focused
- Use TanStack Query for API calls
- Implement proper error handling

## API Integration

The frontend connects to the backend API at `http://localhost:8080/api/v1` by default. All API calls go through the configured Axios instance in `services/apiClient.ts`.

## State Management

- **Authentication State**: Zustand store with persistence
- **Server State**: TanStack Query for caching and synchronization
- **Form State**: React Hook Form with Zod validation

## Styling

Using Tailwind CSS with custom configuration:
- Custom color palette
- Responsive design
- Dark mode ready (can be enabled)
- Custom animations

## Next Steps

1. Implement authentication API integration
2. Build onboarding flow
3. Create daily log form
4. Implement product CRUD
5. Build analytics dashboard
6. Add goal tracking features
7. Implement comprehensive testing

## License

Proprietary - All rights reserved
# SkinAlyze-Frontend
