import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        {fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-4">
                Please sign in to access this page.
              </p>
            </div>
          </div>
        )}
      </SignedOut>
    </>
  );
}
