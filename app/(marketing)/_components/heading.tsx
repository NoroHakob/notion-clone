"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton, useUser } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { useModal } from "@/hooks/use-modal-store";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const { onOpen } = useModal();

  const role = user?.publicMetadata?.role as string | undefined;

  const isSuperAdmin = role === "superAdmin";
  const isAdmin =
    typeof role === "string" &&
    (isSuperAdmin || role.startsWith("admin"));

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
        Bring your thoughts, docs, and plans together. <br /> Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Notion
        </span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Work better and faster in one connected workspace — Notion.
      </h3>

      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <div className="flex items-center gap-4 justify-center">
          {/* Enter Notion */}
          <Button asChild>
            <Link href="/documents">
              Enter Notion
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>

          {isAdmin && (
            <Button
              variant="outline"
              onClick={() =>
                onOpen("adminActions", {
                  isAdmin,
                  isSuperAdmin,
                })
              }
            >
              {isSuperAdmin ? "SuperAdmin Actions" : "Admin Actions"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion Free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
