"use client";

import { use } from "react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/spinner";
import Toolbar from "@/components/toolbar";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

/**
 * Safely extract Convex document ID from a slug:
 * "<id>-<title>"
 */
function parseDocumentId(
  value: string
): Id<"documents"> | null {
  try {
    const decoded = decodeURIComponent(value);
    const convexId = decoded.split("-")[0];
    return convexId as Id<"documents">;
  } catch {
    return null;
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const { documentId: rawDocumentId } = use(params);

  const documentId = parseDocumentId(rawDocumentId);

  const document = useQuery(
    api.documents.getById,
    documentId ? { documentId } : "skip"
  );

  if (!documentId) {
    return <div className="pt-20 text-center">Invalid document</div>;
  }

  if (document === undefined) {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (document === null) {
    return <div className="pt-20 text-center">Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} preview={false} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
