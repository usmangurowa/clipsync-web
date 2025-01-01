"use client";
import { Logo } from "@/components/brand";
import { SwitchThemeButton } from "@/components/switch-theme-button";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import BlurIn from "@/components/ui/blur-in";

import { Button } from "@/components/ui/button";
import Safari from "@/components/ui/safari";
import ShimmerButton from "@/components/ui/shimmer-button";
import { useSession } from "@/hooks/use-session";
import { ArrowRightIcon } from "lucide-react";

import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <NavBar />
      <main className="container relative flex w-screen max-w-3xl flex-col items-center space-y-5 py-10">
        <AnimatedShinyText className="inline-flex items-center justify-center rounded-full border px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Clip Sync</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
        <BlurIn
          word="Sync & Share Seamlessly"
          className="text-center text-3xl font-bold text-black dark:text-white"
        />
        <BlurIn
          word="One clipboard, all your devices. Copy on your phone, paste on your laptop, and keep your workflow uninterrupted across all your screens. No more emailing yourself text or resharing links"
          className="text-center !text-base font-normal"
        />

        <ShimmerButton className="shadow-2xl dark:text-white">
          <Link href={"/auth"}>Get Started</Link>
        </ShimmerButton>
      </main>
      <div className="container relative aspect-video w-full">
        <Safari
          url="clipsync.xyz/clipboard"
          className="size-full"
          imageSrc="/clipboard-dark.png"
        />
      </div>
    </>
  );
};

export default Home;

const NavBar = () => {
  const { data, isLoading } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-md">
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
