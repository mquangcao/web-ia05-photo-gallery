# Photo Gallery Application

A modern, responsive photo gallery built with React, TypeScript, and Shadcn UI. The app fetches beautiful photos from the Lorem Picsum API and displays them with infinite scroll functionality.

## 🚀 Features

- **📷 Photo Grid**: Responsive grid layout displaying photos from Lorem Picsum API
- **♾️ Infinite Scroll**: Automatically loads more photos as you scroll down
- **🔍 Photo Details**: Click any photo to view full-size image with author information
- **⚡ Fast Loading**: Optimized with React Query for efficient data fetching and caching
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Built with Shadcn UI components and Tailwind CSS
- **🔄 Loading States**: Skeleton loaders and loading indicators for better UX
- **❌ Error Handling**: Graceful error states and user-friendly messages

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Shadcn UI** - Component library
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **Zod** - Schema validation
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── api/
│   ├── axios.ts              # Axios instance configuration
│   ├── helpers.ts            # API hook factories
│   ├── common.ts             # Common response schemas
│   ├── dtos/                 # Request/Response schemas
│   │   └── photo.ts
│   └── entities/             # Domain models
│       └── photo.ts
├── components/
│   └── ui/                   # Shadcn UI components
├── hooks/
│   ├── api/                  # API hooks
│   │   └── photo.ts
│   └── use-infinite-photos.ts # Custom infinite scroll hook
├── pages/
│   └── photos/
│       ├── index.tsx         # Photo list page
│       ├── photo-list.tsx    # Photo grid component
│       ├── photo-card.tsx    # Photo card component
│       ├── photo-card-skeleton.tsx # Loading skeleton
│       └── detail/
│           ├── index.tsx     # Photo detail page
│           └── photo-detail.tsx # Photo detail component
├── providers/
│   └── query-provider.tsx    # React Query provider
├── routes/
│   ├── paths.ts              # Route definitions
│   └── router.tsx            # Router configuration
└── lib/
    └── utils.ts              # Utility functions
```

## 🏗️ Architecture

The project follows a clean architecture pattern with separation of concerns:

1. **API Layer** (`src/api/`): Centralized API configuration, schemas, and helper functions
2. **Hooks Layer** (`src/hooks/`): Custom React hooks for data fetching and business logic
3. **Pages Layer** (`src/pages/`): Page-level components (composition only, no logic)
4. **Components Layer**: Reusable UI components with their own logic
5. **Routes Layer**: Centralized routing configuration

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 API Integration

The app uses the [Lorem Picsum API](https://picsum.photos/) to fetch random photos:

- **List Photos**: `GET https://picsum.photos/v2/list?page={page}&limit={limit}`
- **Photo Details**: `GET https://picsum.photos/id/{id}/info`

## 🎯 Key Features Implementation

### Infinite Scroll

Implemented using Intersection Observer API:

- Observes a sentinel element at the bottom of the list
- Triggers page increment when sentinel becomes visible
- Automatically fetches next page of photos

### Data Fetching Strategy

- Uses React Query for efficient caching and state management
- Stale time set to 5 minutes to reduce unnecessary API calls
- Loading and error states handled gracefully
- Pagination managed through custom `useInfinitePhotos` hook

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Grid layout adapts to screen size:
  - 1 column on mobile
  - 2 columns on small tablets
  - 3 columns on tablets
  - 4 columns on desktop

## 📱 Routes

- `/` - Photo gallery with infinite scroll
- `/photos/:id` - Detailed view of a specific photo

## 🎨 UI Components

Built with Shadcn UI components:

- **Card**: Photo containers and detail view
- **Button**: Navigation and actions
- **Skeleton**: Loading states

## 📝 Code Quality

- **TypeScript**: Full type safety across the application
- **ESLint**: Code linting with React and TypeScript rules
- **Architecture Guidelines**: Follows template best practices
  - API calls through centralized hooks
  - DTOs for API contracts
  - Page-level components with no logic
  - Reusable components with encapsulated logic

## 🔍 Testing the App

1. Start the dev server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Scroll down to see infinite loading in action
4. Click any photo to view its details
5. Use the back button to return to the gallery

## 📄 License

MIT
