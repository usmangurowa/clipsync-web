"use client";
import { authenticate } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import React from "react";

const OTPAuth = () => {
  const { execute, status } = useAction(authenticate, {
    onError: (error) => console.log(error),
  });
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (
      event.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    execute({ email });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />
      </div>

      <Button disabled={status === "executing"} className="w-full">
        Continue
      </Button>
    </form>
  );
};

export default OTPAuth;
