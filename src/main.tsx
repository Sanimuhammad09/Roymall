import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { AuthProvider } from './lib/auth'

import './index.css'

import { GlobalLoader } from './components/GlobalLoader'

// Create a new router instance
const router = createRouter({ 
  routeTree,
  defaultPendingComponent: GlobalLoader,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Create a client with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes (prevents refetching when navigating around)
      staleTime: 1000 * 60 * 5,
      // Keep inactive data in cache for 30 minutes
      gcTime: 1000 * 60 * 30,
      // Don't refetch when user switches browser tabs
      refetchOnWindowFocus: false,
      // Only retry once if a request fails
      retry: 1,
    },
  },
})

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
