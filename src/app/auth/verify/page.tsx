"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Logo } from "@/components/brand";

import { useAction } from "next-safe-action/hooks";
import { verify_otp } from "@/actions/auth";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import React from "react";

export default function VerifyPage(props: PageProps) {
  const { execute } = useAction(verify_otp, {
    onError: (error) => console.log(error),
  });

  const [otp, setOtp] = React.useState<string>("");

  const { email } = React.use(props.searchParams) as { email: string };

  const handleVerify = () => {
    execute({ email, otp });
  };
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden border-r md:block">
        <div className="absolute left-4 top-4 md:left-8 md:top-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </div>

      {/* Right section - form */}
      <div className="relative flex flex-col">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 md:mt-28 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Verify your email
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter the OTP sent to {email}.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="space-y-2">
                  <InputOTP
                    maxLength={6}
                    className="mx-auto"
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button onClick={handleVerify} className="w-full">
                  Verify
                </Button>
              </div>

              <p className="px-8 text-center text-sm text-muted-foreground">
                Go back to{" "}
                <Link
                  href="/auth"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  login page
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
