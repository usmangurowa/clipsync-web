"use client";

import { useClips } from "@/hooks/use-clips";
import { cn, copyClipboardContent } from "@/lib/utils";
import { Tables } from "@/supabase/db-types";
import React from "react";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { CopyIcon, TrashIcon, XIcon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { formatDistanceToNow } from "date-fns";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useAction } from "next-safe-action/hooks";
import { deleteClip } from "@/actions/clip";
import { useClipsStore } from "@/lib/store";
import { createClient } from "@/supabase/client";

type ClipboardType = Tables<"clipboard">;

const ClipsBoard = () => {
  const [q] = useQueryState("q", { defaultValue: "" });
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [clip, setClip] = React.useState<ClipboardType | null>(null);
  useClips({ q });
  const { clips, addClip } = useClipsStore();
  const handleOpenChange = React.useCallback((value: boolean) => {
    setIsDrawerOpen(value);
    if (!value) {
      setClip(null);
    }
  }, []);

  const handleTrigger = React.useCallback((clip: ClipboardType) => {
    setClip(clip);
    setIsDrawerOpen(true);
  }, []);

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
            addClip(payload.new as Tables<"clipboard">);
          }
        },
      )
      .subscribe();

    return () => {
      taskListener.unsubscribe();
    };
  }, [addClip]);

  return (
    <>
      <div className="before:box-inherit after:box-inherit mx-auto box-border columns-2 gap-5 [column-fill:_balance] md:columns-3 lg:columns-4">
        {clips?.map((clip, index) => (
          <ClipCard
            clip={clip}
            index={index}
            key={clip.id}
            onTrigger={() => handleTrigger(clip)}
          />
        ))}
      </div>
      <ClipDrawerContent
        open={isDrawerOpen}
        onOpenChange={handleOpenChange}
        clip={clip}
      />
    </>
  );
};

export default ClipsBoard;

const handleCopy = async (data: string) => {
  await copyClipboardContent(data);
  toast.success("Copied to clipboard");
};

const ClipDrawerContent = ({
  open,
  onOpenChange,
  clip,
}: React.ComponentProps<typeof Drawer> & {
  clip: ClipboardType | null;
}) => {
  const { removeClip } = useClipsStore();
  const { execute, status } = useAction(deleteClip, {
    onSuccess: async ({ data }) => {
      if (data && data.length) {
        removeClip(data[0]);
      }
      onOpenChange?.(false);
      toast.success("Clip deleted");
    },
  });
  if (!clip) {
    return null;
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="select-text">
        <VisuallyHidden.Root>
          <DrawerHeader hidden>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden.Root>
        <div className="mx-auto w-full space-y-5 p-5 md:max-w-2xl">
          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              size={"icon-sm"}
              variant={"ghost"}
              onClick={() => handleCopy(clip?.content || "")}
            >
              <CopyIcon />
            </Button>
            <Button
              onClick={() => execute({ id: clip.id })}
              loading={status === "executing"}
              size={"icon-sm"}
              variant={"destructive"}
            >
              <TrashIcon />
            </Button>
            <DrawerClose>
              <Button size={"icon-sm"} variant="outline">
                <XIcon />
              </Button>
            </DrawerClose>
          </div>
          <div className="max-h-[80vh] cursor-text !select-text overflow-y-auto">
            <pre
              className="overflow-x-auto whitespace-pre-wrap"
              style={{ wordWrap: "break-word" }}
            >
              {clip?.content}
            </pre>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const ClipCard = ({
  clip,
  index,
  onTrigger,
}: {
  clip: ClipboardType;
  index: number;
  onTrigger?: () => void;
}) => {
  return (
    <div
      key={clip.id}
      onDoubleClick={() => clip.content && handleCopy(clip.content || "")}
      onClick={onTrigger}
      className={cn(
        "relative mb-5 cursor-pointer break-inside-avoid overflow-hidden rounded-lg border bg-neutral-50 p-4 transition-all duration-300 ease-in-out hover:border-blue-500 dark:bg-neutral-900",
        {
          "border-green-500 bg-green-50 dark:border-green-500": index === 0,
        },
      )}
    >
      <div className="absolute right-0 top-0 flex flex-row">
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          onClick={(e) => {
            e.stopPropagation();
            if (clip.content) handleCopy(clip.content || "");
          }}
        >
          <CopyIcon size={16} className="opacity-50" />
        </Button>
      </div>
      <p className="mt-2 line-clamp-6">{clip.content}</p>
      <span className="text-sm opacity-40">
        {formatDistanceToNow(new Date(clip.created_at))}
      </span>
    </div>
  );
};
