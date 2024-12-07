"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { addClip } from "@/actions/clip";
import { getClipboardContent } from "@/lib/utils";
import { useClips } from "@/hooks/use-clips";

const AddToClipboard = () => {
  const { mutate } = useClips();
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
    <Button
      loading={status === "executing"}
      size={"icon"}
      onClick={handleAddClip}
      className="fixed bottom-10 right-10 rounded-full"
    >
      <PlusIcon />
    </Button>
  );
};

export default AddToClipboard;
