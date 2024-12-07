"use client";

import { cn, copyClipboardContent } from "@/lib/utils";
import { Tables } from "@/supabase/db-types";
import React from "react";
import { toast } from "sonner";

const ClipsBoard = ({ clips }: { clips: Tables<"clipboard">[] }) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4">
      {clips?.map((clip, index) => (
        <ClipCard clip={clip} index={index} key={clip.id} />
      ))}
    </div>
  );
};

export default ClipsBoard;

const ClipCard = ({
  clip,
  index,
}: {
  clip: Tables<"clipboard">;
  index: number;
}) => {
  const handleCopy = async () => {
    await copyClipboardContent(clip.content || "");
    toast.success("Copied to clipboard");
  };
  return (
    <div
      key={clip.id}
      onClick={handleCopy}
      className={cn(
        "mb-5 cursor-pointer rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-900",
        {
          "border-green-500 bg-green-50 dark:border-green-500": index === 0,
        },
      )}
    >
      <p className="line-clamp-6">{clip.content}</p>
    </div>
  );
};