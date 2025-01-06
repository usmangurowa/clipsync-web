"use client";
import Link from "next/link";

import { Logo } from "@/components/brand";

import { EmailAuth } from "../components/email-auth";
import { GithubAuth } from "../components/github-auth";
import { EmailPasswordAuth } from "../components/email-password-auth";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { useAppConfigStore } from "@/lib/store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

export default function AuthPage(props: PageProps) {
  const { auth } = use(props.params) as { auth: "sign-in" | "sign-up" };
  const { lastLoginOption } = useAppConfigStore();
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
                  {auth === "sign-in"
                    ? "Sign in to your account"
                    : "Create an account"}
                </p>
              </div>
              {auth === "sign-up" ? (
                <>
                  <EmailPasswordAuth type={auth} />
                </>
              ) : (
                <>
                  {lastLoginOption === "email" && <EmailAuth />}
                  {lastLoginOption === "github" && <GithubAuth />}
                  {(lastLoginOption === "email-password" ||
                    lastLoginOption === "") && (
                    <EmailPasswordAuth type={auth} />
                  )}
                </>
              )}

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger
                    className="justify-center"
                    indicator={false}
                  >
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex w-full items-center">
                        <span className="w-full border-t" />
                      </div>
                      <span className="relative mx-auto flex w-fit justify-center gap-x-2 bg-background px-2 text-center text-xs uppercase text-muted-foreground">
                        More options{" "}
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-5">
                    {auth === "sign-up" ? (
                      <>
                        <GithubAuth />
                        <TextSeparator text={"Email only"} />
                        <EmailAuth />
                      </>
                    ) : (
                      <>
                        {lastLoginOption === "email" && (
                          <>
                            <GithubAuth />
                            <TextSeparator text={"Email and password"} />
                            <EmailPasswordAuth type={auth} />
                          </>
                        )}
                        {lastLoginOption === "github" && (
                          <>
                            <TextSeparator text={"Email and password"} />
                            <EmailPasswordAuth type={auth} />
                            <TextSeparator text={"Email only"} />
                            <EmailAuth />
                          </>
                        )}
                        {lastLoginOption === "email-password" && (
                          <>
                            <GithubAuth />
                            <TextSeparator text={"Email only"} />
                            <EmailAuth />
                          </>
                        )}
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button asChild className="w-full" variant={"link"}>
                <Link
                  href={`/auth/${auth === "sign-in" ? "sign-up" : "sign-in"}`}
                >
                  {auth === "sign-in" ? "Sign up" : "Sign in"}
                </Link>
              </Button>

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
}

const TextSeparator = ({ text = null }: { text?: string | null }) => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      {text && (
        <span className="bg-background px-2 text-muted-foreground">{text}</span>
      )}
    </div>
  </div>
);
