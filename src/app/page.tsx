import { Logo } from "@/components/brand";
import React from "react";

const Home = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-5">
      <Logo />
      <h1 className="text-5xl font-bold">Clip Sync</h1>
    </main>
  );
};

export default Home;
