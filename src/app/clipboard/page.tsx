"use client";
import React from "react";
import ClipsBoard from "./components/clipsboard";
import { SwitchThemeButton } from "@/components/switch-theme-button";

const Clipboard = () => {
  return (
    <main className="relative h-screen flex-grow">
      <nav className="flex h-20 items-center justify-between border-b px-5">
        <h1 className="text-2xl font-semibold">Clipboard</h1>
        <SwitchThemeButton />
      </nav>
      <section className="p-5">
        <ClipsBoard />
      </section>
    </main>
  );
};

export default Clipboard;
