import React, { use } from "react";
import Link from "next/link";

import { Logo } from "@/components/brand";

import { OTPAuth } from "../components/otp-auth";
import { GithubAuth } from "../components/github-auth";

const AuthPage = ({ params }: PageProps) => {
  const { auth } = use(params);

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden bg-card md:block">
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
                  Clip Sync
                </h1>
                <p className="text-sm text-muted-foreground">
                  {auth === "login" ? "Welcome Back" : "Create account."}
                </p>
              </div>

              <OTPAuth />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              <GithubAuth />

              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
