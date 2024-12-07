"use client";
import { Logo } from "@/components/brand";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";
import React from "react";

const Home = () => {
  const { data } = useSession();
  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-center space-y-5">
      <Logo />
      <h1 className="text-5xl font-bold">Clip Sync</h1>
      {data ? (
        <Link href={"/clipboard"}>Clips</Link>
      ) : (
        <Link href={"/auth"}>Login</Link>
      )}
    </main>
  );
};

export default Home;
