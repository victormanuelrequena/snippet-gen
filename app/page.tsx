"use client";

import SnippetGenerator from "@/components/SnippetGenerator";
import { NextUIProvider } from "@nextui-org/system";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="bg-[#F0EFE7] dark:bg-[#000] text-foreground min-h-screen flex flex-col p-4">
        <SnippetGenerator />
      </main>
    </NextUIProvider>
  );
}
