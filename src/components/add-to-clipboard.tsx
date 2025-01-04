"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { addClip } from "@/actions/clip";
import { cn, getClipboardContent, safeCopyToClipboard } from "@/lib/utils";

import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { useClips } from "@/lib/store";
import { Tables } from "@/supabase/db-types";

const AddToClipboard = ({ className }: { className?: string }) => {
  const { addClip: appendClip } = useClips();
  const { execute, status } = useAction(addClip, {
    onSuccess: ({ data }) => {
      if (data && data.length) {
        appendClip(data[0]);
      }
    },
    onError: ({ error }) => {
      console.log({ error });
    },
  });

  const handleAddClip = async () => {
    const content = await getClipboardContent();
    execute({ content });
  };

  React.useEffect(() => {
    const supabase = createClient();
    const taskListener = supabase
      .channel("clipboard")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "clipboard" },
        (payload) => {
          safeCopyToClipboard(payload.new.content);
          toast.success("Copied to clipboard");
          if (payload.new) {
            appendClip(payload.new as Tables<"clipboard">);
          }
        },
      )
      .subscribe();

    return () => {
      taskListener.unsubscribe();
    };
  }, [appendClip]);

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

export default AddToClipboard;
