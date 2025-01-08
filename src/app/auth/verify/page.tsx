"use client";

import { Button } from "@/components/ui/button";

import { useAction } from "next-safe-action/hooks";
import { verify_otp } from "@/actions/auth";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import React from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage(props: PageProps) {
  const { execute, status } = useAction(verify_otp, {
    onError: (error) => console.log(error),
  });

  const [otp, setOtp] = React.useState<string>("");

  const { email } = React.use(props.searchParams) as { email: string };

  const router = useRouter();

  const handleVerify = () => {
    execute({ email, otp });
  };
  return (
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

              <Button
                onClick={handleVerify}
                className="w-full"
                disabled={status === "executing"}
              >
                Verify
              </Button>
            </div>

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
