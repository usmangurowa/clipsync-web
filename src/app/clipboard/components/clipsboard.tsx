"use client";

import { useClips } from "@/hooks/use-clips";
import { cn, copyClipboardContent } from "@/lib/utils";
import { Tables } from "@/supabase/db-types";
import React from "react";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { CopyIcon, Ellipsis, TrashIcon, XIcon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const ClipsBoard = () => {
  const [q] = useQueryState("q", { defaultValue: "" });
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [clip, setClip] = React.useState<Tables<"clipboard"> | null>(null);
  const { data: clips } = useClips({ q });
  const handleOpenChange = React.useCallback((value: boolean) => {
    setIsDrawerOpen(value);
    if (!value) {
      setClip(null);
    }
  }, []);

  const handleTrigger = React.useCallback((clip: Tables<"clipboard">) => {
    setClip(clip);
    setIsDrawerOpen(true);
  }, []);
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
      <Drawer open={isDrawerOpen} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <VisuallyHidden.Root>
            <DrawerHeader hidden>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
          </VisuallyHidden.Root>
          <div className="mx-auto w-full md:max-w-2xl">
            <div className="flex flex-row items-center justify-end gap-2">
              <Button size={"icon"}>
                <CopyIcon />
              </Button>
              <Button size={"icon"} variant={"destructive"}>
                <TrashIcon />
              </Button>
              <DrawerClose>
                <Button size={"icon"} variant="outline">
                  <XIcon />
                </Button>
              </DrawerClose>
            </div>
            <pre
              className="overflow-x-auto whitespace-pre-wrap p-5"
              style={{ wordWrap: "break-word" }}
            >
              {clip?.content}
            </pre>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ClipsBoard;

const ClipCard = ({
  clip,
  index,
  onTrigger,
}: {
  clip: Tables<"clipboard">;
  index: number;
  onTrigger?: () => void;
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
        "relative mb-5 cursor-pointer break-inside-avoid overflow-hidden rounded-lg border bg-neutral-50 p-4 transition-all duration-300 ease-in-out hover:border-blue-500 dark:bg-neutral-900",
        {
          "border-green-500 bg-green-50 dark:border-green-500": index === 0,
        },
      )}
    >
      <div className="absolute right-0 top-0 flex flex-row">
        <Button
          size={"icon-xs"}
          variant={"ghost"}
          onClick={(e) => {
            e.stopPropagation();
            onTrigger?.();
          }}
        >
          <Ellipsis size={16} />
        </Button>
      </div>
      <p className="line-clamp-6">{clip.content}</p>
    </div>
  );
};
