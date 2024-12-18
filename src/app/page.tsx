"use client";
import { Logo } from "@/components/brand";
import { SwitchThemeButton } from "@/components/switch-theme-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";

import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <NavBar />
      <main className="container relative flex h-screen w-screen max-w-3xl flex-col items-center space-y-5 py-10">
        <Badge variant={"outline"} className="mx-auto">
          Clip Sync
        </Badge>
        <p className="text-center text-5xl font-bold leading-normal">
          One clipboard to rule them all. Sync your clipboard across all your
          devices.
        </p>
        <Button size={"lg"} asChild>
          <Link href={"/auth"}>Get Started</Link>
        </Button>
      </main>
    </>
  );
};

export default Home;

const NavBar = () => {
  const { data, isLoading } = useSession();

  return (
    <nav className="border-b">
      <div className="container flex w-full items-center justify-between">
        <Link href={"/"} className="flex items-center">
          <Logo className="scale-50" />
          <h1 className="text-2xl font-semibold">Clip Sync</h1>
        </Link>
        <div className="flex items-center gap-x-2">
          {!isLoading && (
            <>
              <Button size={"sm"} asChild variant={"link"}>
                {data ? (
                  <Link href={"/clipboard"}>Clipboard</Link>
                ) : (
                  <Link href={"/auth"}>Login</Link>
                )}
              </Button>
              <SwitchThemeButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
