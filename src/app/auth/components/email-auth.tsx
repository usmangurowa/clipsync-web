"use client";
import { login_with_email } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppConfigStore } from "@/lib/store";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";

const EmailAuth = () => {
  const { execute, status } = useAction(login_with_email, {
    onError: ({ error }) => {
      const { serverError, validationErrors } = error;
      const errors = serverError || validationErrors?.formErrors[0];
      toast.error(errors);
    },
  });
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (
      event.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    useAppConfigStore.getState().update({ lastLoginOption: "email" });
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

export { EmailAuth };
