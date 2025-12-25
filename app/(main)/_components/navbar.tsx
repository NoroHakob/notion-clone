"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

function parseDocumentId(
  param: string | string[] | undefined
): Id<"documents"> | undefined {
  if (!param) return undefined;

  const value = Array.isArray(param) ? param[0] : param;

  // Decode URL-encoded text
  const decoded = decodeURIComponent(value);

  // Expected format: <convexId>-<slug>
  const convexId = decoded.split("-")[0];

  return convexId as Id<"documents">;
}

export const Navbar = ({
  isCollapsed,
  onResetWidth,
}: NavbarProps) => {
  const params = useParams();

  const documentId = parseDocumentId(
    params.documentId as string | string[] | undefined
  );

  const document = useQuery(
    api.documents.getById,
    documentId ? { documentId } : "skip"
  );

  if (!documentId) {
    return null;
  }

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 cursor-pointer text-muted-foreground hover:text-foreground transition"
          />
        )}

        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>

      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  );
};
