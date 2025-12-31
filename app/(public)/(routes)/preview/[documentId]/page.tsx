"use client";

import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

function parseDocumentId(value?: string): Id<"documents"> | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value).split("-")[0] as Id<"documents">;
  } catch {
    return null;
  }
}

export default function DocumentIdPage() {
  const router = useRouter();
  const params = useParams<{ documentId?: string }>();

  const documentId = parseDocumentId(params.documentId);

  const document = useQuery(
    api.documents.getByIdPublic,
    documentId ? { documentId } : "skip"
  );

  if (document === undefined) {
    return (
      <div className="flex justify-center pt-20">
        <Cover.Skeleton />
        <div className="mx-auto mt-10 space-y-4 md:max-w-3xl lg:max-w-4xl">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-14 w-[40%]" />
        </div>
      </div>
    );
  }

  if (document === null) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <Image
          src="/error-light.png"
          height={300}
          width={300}
          alt="Not available"
          className="dark:hidden"
        />
        <Image
          src="/error-darkMode.png"
          height={300}
          width={300}
          alt="Not available"
          className="hidden dark:block"
        />
        <h2 className="text-xl font-medium">This page is not available</h2>
        <p className="text-sm text-muted-foreground">
          The note may be unpublished or removed.
        </p>
        <Button onClick={() => router.replace("/")}>Go back</Button>
      </div>
    );
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={() => {}}
          initialContent={document.content ? JSON.parse(document.content) : undefined}
        />
      </div>
    </div>
  );
}
