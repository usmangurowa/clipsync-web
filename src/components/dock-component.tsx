"use client";
import React from "react";

import { Dock, DockIcon } from "@/components/ui/dock";
import PasteToClipboard from "./paste-to-clipboard";
import { Button } from "./ui/button";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { logout } from "@/actions/auth";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WriteToClipboard from "./write-to-clipboard";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DockComponent = () => {
  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <Dock direction="middle">
        <DockIcon className="relative">
          <ToolTip content="Paste content to clipboard">
            <PasteToClipboard className="relative bottom-auto right-auto size-8" />
          </ToolTip>
        </DockIcon>
        <DockIcon className="relative">
          <ToolTip content="Write content to clipboard">
            <WriteToClipboard className="relative bottom-auto right-auto size-8" />
          </ToolTip>
        </DockIcon>
        <DockIcon className="relative">
          <ToolTip content="Settings">
            <Button
              variant={"outline"}
              className="size-8 rounded-full"
              size={"icon"}
            >
              <SettingsIcon />
            </Button>
          </ToolTip>
        </DockIcon>
        <DockIcon>
          <ToolTip content="Logout">
            <Button
              onClick={() => logout()}
              variant={"outline"}
              className="size-8 rounded-full"
              size={"icon"}
            >
              <LogOutIcon />
            </Button>
          </ToolTip>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default DockComponent;

const ToolTip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
