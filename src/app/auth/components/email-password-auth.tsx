"use client";
import {
  login_with_email_and_password,
  register_with_email_and_password,
} from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppConfigStore } from "@/lib/store";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const EmailPasswordAuth = ({
  type = "sign-in",
}: {
  type?: "sign-in" | "sign-up";
}) => {
  const { execute, status } = useAction(
    type === "sign-in"
      ? login_with_email_and_password
      : register_with_email_and_password,
    {
      onError: ({ error }) => {
        const { serverError, validationErrors } = error;
        const errors = serverError || validationErrors?.formErrors[0];
        toast.error(errors);
      },
    },
  );
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (
      event.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    const password = (
      event.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;
    useAppConfigStore.getState().update({ lastLoginOption: "email-password" });
    execute({ email, password });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          placeholder="email"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />
        <Input
          id="password"
          placeholder="password"
          type="password"
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect="off"
        />
        <div className="flex justify-end">
          <Button variant={"link"} className="!h-fit px-0">
            <Link href="/auth/forgot-password">Forgot password?</Link>
          </Button>
        </div>
      </div>

      <Button disabled={status === "executing"} className="w-full">
        Continue
      </Button>
    </form>
  );
};

export { EmailPasswordAuth };
