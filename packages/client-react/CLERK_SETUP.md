# Clerk Authentication Setup

This document outlines the Clerk authentication implementation in the React (Vite) application.

## Setup Overview

### 1. Installation
```bash
npm install @clerk/clerk-react@latest
```

### 2. Environment Configuration
Create a `.env.local` file in the root of the client-react package:
```
VITE_CLERK_PUBLISHABLE_KEY=...
```

### 3. Provider Setup
The app is wrapped with `ClerkProvider` in `src/main.tsx`:
```typescript
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
);
```

## Components

### AuthHeader (`src/components/auth/AuthHeader.tsx`)
- Displays sign-in/sign-up buttons for unauthenticated users
- Shows UserButton for authenticated users
- Uses Clerk's `<SignedIn>` and `<SignedOut>` components

### ProtectedRoute (`src/components/auth/ProtectedRoute.tsx`)
- Wraps components that require authentication
- Shows fallback content for unauthenticated users
- Automatically handles authentication state

## Hooks

### useAuthState (`src/hooks/use-auth.ts`)
Custom hook that provides authentication state:
```typescript
const { user, isLoaded, isSignedIn, isAuthenticated } = useAuthState();
```

## Usage Examples

### Basic Authentication Check
```typescript
import { SignedIn, SignedOut } from "@clerk/clerk-react";

<SignedIn>
  <p>You are signed in!</p>
</SignedIn>
<SignedOut>
  <p>Please sign in to continue.</p>
</SignedOut>
```

### Protected Routes
```typescript
import ProtectedRoute from "@/components/auth/ProtectedRoute";

<Route 
  path="/protected" 
  element={
    <ProtectedRoute>
      <ProtectedComponent />
    </ProtectedRoute>
  } 
/>
```

### User Information
```typescript
import { useUser } from "@clerk/clerk-react";

const { user } = useUser();
console.log(user?.firstName, user?.emailAddresses[0]?.emailAddress);
```

## Features Implemented

1. **Authentication Header**: Sign-in/sign-up buttons and user profile
2. **Protected Routes**: Automatic route protection for authenticated content
3. **Loading States**: Proper loading indicators during authentication checks
4. **User Information**: Access to user data throughout the application
5. **Sign Out**: Automatic redirect after sign out

## Next Steps

1. Configure Clerk dashboard settings (allowed domains, OAuth providers, etc.)
2. Set up webhook endpoints for user events
3. Implement role-based access control if needed
4. Add custom authentication flows if required

For more information, visit the [Clerk React Quickstart](https://clerk.com/docs/quickstarts/react).
