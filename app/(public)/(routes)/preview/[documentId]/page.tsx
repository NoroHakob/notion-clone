import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import PreviewClient from "./preview-client";

interface PageProps {
  params: { documentId: string };
}

// ------ SEO: runs on the server --------------------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const rawId = decodeURIComponent(params.documentId).split("-")[0];
    const documentId = rawId as Id<"documents">;

    // Uses the PUBLIC query (same as your client component)
    const document = await fetchQuery(api.documents.getByIdPublic, {
      documentId,
    });

    if (!document) {
      return {
        title: "Page Not Available",
        description: "This page may have been unpublished or removed.",
        robots: { index: false, follow: false },
      };
    }

    const title = document.title || "Untitled";
    const description = extractPlainText(document.content, title);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: document.coverImage
          ? [{ url: document.coverImage, width: 1200, height: 630, alt: title }]
          : [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: document.coverImage
          ? [document.coverImage]
          : ["/og-image.png"],
      },
      // Public preview pages ARE indexable by search engines
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: "Preview",
      description: "View this document on Notion Clone",
    };
  }
}

// ------ Page: renders the client component --------------------
export default function PreviewPage({ params }: PageProps) {
  return <PreviewClient />;
}

// ------ Helper: strip BlockNote JSON → plain text -------------
function extractPlainText(content?: string, fallbackTitle?: string): string {
  if (!content) return `View "${fallbackTitle}" on Notion Clone`;
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      const text = parsed
        .flatMap((block: { content?: { text?: string }[] }) =>
          (block.content ?? []).map((c) => c.text ?? "")
        )
        .join(" ")
        .trim();
      return (
        text.substring(0, 160) ||
        `View "${fallbackTitle}" on Notion Clone`
      );
    }
  } catch {
    return content.substring(0, 160);
  }
  return `View "${fallbackTitle}" on Notion Clone`;
}
