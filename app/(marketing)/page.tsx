import type { Metadata } from "next";

import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Features } from "./_components/features";
import { CTA } from "./_components/cta";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Notion Clone is your all-in-one workspace. Write richer notes, create docs, and stay organized – all for free.",
  openGraph: {
    title: "Notion Clone – Your connected workspace",
    description:
      "Write richer notes, create docs, and stay organized – all for free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Notion Clone landing page",
      },
    ],
  },
};

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
        <Features />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
