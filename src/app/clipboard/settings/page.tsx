"use client";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import React from "react";

const Settings = () => {
  const { execute } = useAction(logout);
  return (
    <div className="container py-20">
      <Button onClick={() => execute()}>Log out</Button>
    </div>
  );
};

export default Settings;
