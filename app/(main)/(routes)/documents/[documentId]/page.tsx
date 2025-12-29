"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Toolbar from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";


function parseDocumentId(value?: string): Id<"documents"> | null {
  if (!value) return null;

  try {
    const decoded = decodeURIComponent(value);
    const convexId = decoded.split("-")[0];
    return convexId as Id<"documents">;
  } catch {
    return null;
  }
}

const DocumentIdPage = () => {
  const params = useParams<{ documentId?: string }>();
  const documentId = parseDocumentId(params.documentId);
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), [])

  const document = useQuery(
    api.documents.getById,
    documentId ? { documentId } : "skip"
  );

  const update = useMutation(api.documents.update)

  const onChange = (content: string) => {
    if (!documentId) return

    update({
      id: documentId,
      content,
    })
  }


  if (!documentId) {
    return <div className="pt-20 text-center">Invalid document</div>;
  }

  if (document === undefined) {
    return (
      <div className="flex justify-center pt-20">
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    notFound();
  }


  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} preview={false} />

        <Editor
          onChange={onChange}
          initialContent={
            document.content
            ? JSON.parse(document.content)
            : undefined
          }
          editable
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
