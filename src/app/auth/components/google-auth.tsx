"use client";
import { login_with_google } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useAppConfigStore } from "@/lib/store";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { Google } from "iconsax-react";

const GoogleAuth = () => {
  const { execute, status } = useAction(login_with_google, {
    onSuccess: () => {
      useAppConfigStore.getState().update({ lastLoginOption: "google" });
    },
  });
  return (
    <Button
      onClick={() => execute()}
      variant="outline"
      className="w-full"
      type="button"
      disabled={status === "executing"}
    >
      <Google size={24} className="fill-neutral-950 dark:fill-neutral-50" />
      Google
    </Button>
  );
};

export { GoogleAuth };
