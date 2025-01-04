"use client";
import React from "react";
import { Button } from "./ui/button";
import { PencilLineIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { addClip } from "@/actions/clip";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import { useClipsStore } from "@/lib/store";

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
  const [content, setContent] = React.useState("");
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

  const handleAddClip = React.useCallback(async () => {
    if (content.trim().length) {
      execute({ content });
    } else {
      toast.info("Content is empty");
    }
  }, [content, execute]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
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
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content goes here...."
        ></Textarea>
        <DialogFooter>
          <Button onClick={handleAddClip} loading={status === "executing"}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WriteToClipboard;
