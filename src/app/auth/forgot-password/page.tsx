"use client";

import { Button } from "@/components/ui/button";

import { useAction } from "next-safe-action/hooks";
import { forgot_password } from "@/actions/auth";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function VerifyPage() {
  const { execute, status } = useAction(forgot_password, {
    onError: (error) => console.log(error),
  });

  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (
      event.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    execute({ email });
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 md:mt-28 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to reset your password.
              </p>
            </div>

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

            <Button
              className="w-full"
              variant={"link"}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
