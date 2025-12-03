import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 text-center bg-gradient-to-r from-gray-50 to-white dark:from-neutral-900 dark:to-black rounded-2xl w-full max-w-5xl mx-auto shadow-sm">
      <h3 className="text-3xl sm:text-4xl font-bold mb-6">
        Start building your workspace today
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Join thousands of creators boosting productivity with Notion Clone.
      </p>
      <Button asChild className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
        <Link href="/documents">Get Started Free <ArrowRight /> </Link>
      </Button>
    </section>
  );
};