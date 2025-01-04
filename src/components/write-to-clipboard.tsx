"use client";
import React from "react";
import { Button } from "./ui/button";
import { PencilLineIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { addClip } from "@/actions/clip";
import { cn, getClipboardContent } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { useClipsStore } from "@/lib/store";
import { Tables } from "@/supabase/db-types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";

const WriteToClipboard = ({ className }: { className?: string }) => {
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

  React.useEffect(() => {
    const supabase = createClient();
    const taskListener = supabase
      .channel("clipboard")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "clipboard" },
        (payload) => {
          // safeCopyToClipboard(payload.new.content);
          // toast.success("Copied to clipboard");
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          loading={status === "executing"}
          size={"icon"}
          onClick={handleAddClip}
          variant={"outline"}
          className={cn("fixed bottom-10 right-10 rounded-full", className)}
        >
          <PencilLineIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write</DialogTitle>
          <DialogDescription>Write content to clipboard</DialogDescription>
        </DialogHeader>
        <Textarea placeholder="content goes here...."></Textarea>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WriteToClipboard;
