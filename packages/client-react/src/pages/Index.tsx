
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingOverview } from "@/components/dashboard/SpendingOverview";
import { useAuthState } from "@/hooks/use-auth";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { helloWorldPublic, helloWorldPrivate } from "@/pages/index.api";

export default function Index() {
  const { isLoaded } = useAuthState();
  const { getToken } = useAuth();

  const handleHelloWorldPublic = async () => {
    try {
      const result = await helloWorldPublic();
      console.log('Hello World result:', result);
    } catch (error) {
      console.error('Error calling helloWorld:', error);
    }
  };

  const handleHelloWorldPrivate = async () => {
    try {
      const token = await getToken();
      console.log('Token:', token);
      if (true) {
        const result = await helloWorldPrivate(token || "a");
        console.log('Hello World result:', result);
      }
    } catch (error) {
      console.error('Error calling helloWorld:', error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            <SignedIn>
              {/* <AccountSummary /> */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* <SpendingOverview /> */}
                {/* <RecentTransactions /> */}
                <p>You are signed in</p>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-4">Welcome to Simple Server</h2>
                <p className="text-gray-600 mb-6">
                  Sign in to access your dashboard and manage your transactions.
                </p>
              </div>
            </SignedOut>
            <div className="h-px bg-gray-200 my-6"></div>
            <p>Clerk test with public and private routes :</p>
            <div className="mt-6">
              <button
                onClick={handleHelloWorldPublic}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Hello World Public
              </button>
              <br />
              <br />
              <button
                onClick={handleHelloWorldPrivate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Hello World Private
              </button>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
