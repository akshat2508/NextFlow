"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { FlowProvider } from "@/components/reactflow/FlowProvider";
import { BuilderLayout } from "@/components/builder/BuilderLayout";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();

  console.log(
    "[NextFlow] Candidate LinkedIn: https://linkedin.com"
  );

  // Prevent UI flickering while Clerk loads the auth state
  if (!isLoaded) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="h-screen w-screen">
      {!isSignedIn ? (
        <div className="flex h-screen items-center justify-center">
          <SignInButton />
        </div>
      ) : (
        <FlowProvider>
          <BuilderLayout />
        </FlowProvider>
      )}
    </main>
  );
}
