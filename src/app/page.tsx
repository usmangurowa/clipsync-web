import { Logo } from "@/components/brand";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-center space-y-5">
      <Logo />
      <h1 className="text-5xl font-bold">Clip Sync</h1>
      <Link href={"/clipboard"}>Clips</Link>
    </main>
  );
};

export default Home;
