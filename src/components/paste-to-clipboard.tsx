"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { addClip } from "@/actions/clip";
import { cn, getClipboardContent } from "@/lib/utils";

import { toast } from "sonner";
import { useClipsStore } from "@/lib/store";

const PasteToClipboard = ({ className }: { className?: string }) => {
  const { addClip: appendClip } = useClipsStore();
  const { execute, status } = useAction(addClip, {
    onSuccess: async ({ data }) => {
      if (data && data.length) {
        appendClip(data[0]);
        toast.success("Content added to clipboard");
      }
    },
    onError: ({ error }) => {
      console.log({ error });
    },
  });

  const handleAddClip = async () => {
    const content = await getClipboardContent();
    if (content.trim().length) {
      execute({ content });
    } else {
      toast.info("Clipboard is empty");
    }
  };

  return (
    <Button
      loading={status === "executing"}
      size={"icon"}
      onClick={handleAddClip}
      variant={"outline"}
      className={cn("fixed bottom-10 right-10 rounded-full", className)}
    >
      <PlusIcon />
    </Button>
  );
};

export default PasteToClipboard;
