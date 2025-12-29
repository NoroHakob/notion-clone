"use client";

import dynamic from "next/dynamic";
import { useQuery, useMutation } from "convex/react";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Toolbar from "@/components/toolbar";
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
  const searchParams = useSearchParams();

  const documentId = parseDocumentId(params.documentId);
  const isDeleted = searchParams.get("deleted") === "1";

  const document = useQuery(
    api.documents.getById,
    documentId && !isDeleted ? { documentId } : "skip"
  );

  const update = useMutation(api.documents.update);

  useEffect(() => {
    if (!isDeleted && document === null && params.documentId) {
      router.replace(`/documents/${params.documentId}?deleted=1`);
    }
  }, [document, isDeleted, params.documentId, router]);

  if (isDeleted) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/error-light.png"
          height={300}
          width={300}
          alt="Deleted"
          className="dark:hidden"
        />
        <Image
          src="/error-darkMode.png"
          height={300}
          width={300}
          alt="Deleted"
          className="hidden dark:block"
        />
        <h2 className="text-xl font-medium">
          This page was deleted
        </h2>
        <Button onClick={() => router.replace("/documents")}>
          Go back
        </Button>
      </div>
    );
  }

  if (document === undefined) {
    return (
      <div className="flex justify-center pt-20">
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10 space-y-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-14 w-[40%]" />
        </div>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} preview={false} />
        <Editor
          onChange={(content) =>
            update({ id: documentId!, content })
          }
          initialContent={
            document.content ? JSON.parse(document.content) : undefined
          }
          editable
        />
      </div>
    </div>
  );
}
