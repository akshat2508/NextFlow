"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const {
    isLoaded,
    isSignedIn,
  } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SignInButton />
      </div>
    );
  }

  return (
    <main className="h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold">
        NextFlow Dashboard
      </h1>
    </main>
  );
}