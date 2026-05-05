import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import DocumentIdClient from "./document-id-client";

interface PageProps {
  params: { documentId: string };
}

// ------ SEO: runs on the server, never sent to the browser ------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    // Parse the documentId the same way your client does
    const rawId = decodeURIComponent(params.documentId).split("-")[0];
    const documentId = rawId as Id<"documents">;

    const document = await fetchQuery(api.documents.getById, { documentId });

    if (!document || document.isArchived) {
      return {
        title: "Document Not Found",
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
      // Private workspace docs should NOT be indexed by search engines
      robots: { index: false, follow: false },
    };
  } catch {
    return { title: "Document" };
  }
}

// ------ Page: just renders the client component ----------------
export default function DocumentIdPage({ params }: PageProps) {
  return <DocumentIdClient />;
}

// ------ Helper: strip BlockNote JSON → plain text --------------
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
      return text.substring(0, 160) || `View "${fallbackTitle}" on Notion Clone`;
    }
  } catch {
    return content.substring(0, 160);
  }
  return `View "${fallbackTitle}" on Notion Clone`;
}
