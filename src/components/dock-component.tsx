"use client";
import React from "react";

import { Dock, DockIcon } from "@/components/ui/dock";
import AddToClipboard from "./add-to-clipboard";
import { Button } from "./ui/button";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { logout } from "@/actions/auth";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DockComponent = () => {
  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <Dock direction="middle">
        <DockIcon className="relative">
          <AddToClipboard className="relative bottom-auto right-auto size-8" />
        </DockIcon>
        <DockIcon>
          <Button
            variant={"outline"}
            className="size-8 rounded-full"
            size={"icon"}
          >
            <SettingsIcon />
          </Button>
        </DockIcon>
        <DockIcon>
          <Button
            onClick={() => logout()}
            variant={"outline"}
            className="size-8 rounded-full"
            size={"icon"}
          >
            <LogOutIcon />
          </Button>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default DockComponent;
