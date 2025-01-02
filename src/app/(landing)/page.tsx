import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import BlurIn from "@/components/ui/blur-in";

import Safari from "@/components/ui/safari";

import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { GetStarted } from "@/app/(landing)/components/get-started";
import { NavBar } from "@/app/(landing)/components/nav-bar";

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
        <GetStarted />
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
