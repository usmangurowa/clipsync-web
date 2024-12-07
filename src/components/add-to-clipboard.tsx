"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { addClip } from "@/actions/clip";
import { getClipboardContent, safeCopyToClipboard } from "@/lib/utils";
import { useClips } from "@/hooks/use-clips";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

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
          mutate((prev) => [payload.new, ...prev], { revalidate: false });
        },
      )
      .subscribe();

    return () => {
      taskListener.unsubscribe();
    };
  }, [mutate]);

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
