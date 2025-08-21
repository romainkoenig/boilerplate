import { useUser, useAuth } from "@clerk/clerk-react";

export function useAuthState() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  return {
    user,
    isLoaded,
    isSignedIn,
    isAuthenticated: isSignedIn && !!user,
  };
}
