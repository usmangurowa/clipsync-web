"use client";
import { addClip } from "@/actions/clip";
import { Button } from "@/components/ui/button";
import { getClipboardContent } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import ClipsBoard from "./components/clipsboard";
import { useClips } from "@/hooks/use-clips";

const Clipboard = () => {
  const { data: clips, mutate } = useClips();

  const { execute, status } = useAction(addClip, {
    onSuccess: async ({ data }) => {
      if (data && data.length) {
        // @ts-expect-error -  d
        mutate((prev) => [data[0], ...prev], { revalidate: false });
      }
    },
    onError: ({ error }) => {
      console.log(error);
    },
  });

  const handleAddClip = async () => {
    const content = await getClipboardContent();
    execute({ content });
  };

  return (
    <main className="relative h-screen flex-grow">
      <nav className="container flex h-20 items-center border-b">
        <h1 className="text-2xl font-semibold">Clipboard</h1>
      </nav>
      <section className="container py-5">
        <ClipsBoard clips={clips || []} />
      </section>
      <Button
        loading={status === "executing"}
        size={"icon"}
        onClick={handleAddClip}
        className="absolute bottom-10 right-10 rounded-full"
      >
        <PlusIcon />
      </Button>
    </main>
  );
};

export default Clipboard;
