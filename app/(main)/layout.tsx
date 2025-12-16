"use client";

import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { SearchCommand } from "@/components/search-command";
import { Navigation } from "./_components/navigation";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user, isLoaded } = useUser();

  // Loading state (Convex + Clerk)
  if (isLoading || !isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Not logged in → landing
  if (!isAuthenticated) {
    return redirect("/");
  }

  // App-level block based on status
  const status = user?.publicMetadata?.status;

  if (status === "disabled") {
    return redirect("/blocked");
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
