"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error-light.png"
        height={300}
        width={300}
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-darkMode.png"
        height={300}
        width={300}
        alt="Error"
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
