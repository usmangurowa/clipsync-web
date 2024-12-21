"use client";
import React from "react";
import ClipsBoard from "./components/clipsboard";
import { SwitchThemeButton } from "@/components/switch-theme-button";

import { useQueryState } from "nuqs";
import SearchInput from "@/components/search-input";

const Clipboard = () => {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  return (
    <main className="relative h-screen flex-grow">
      <nav className="fixed flex h-16 w-full items-center justify-between border-b bg-background px-5">
        <h1 className="text-2xl font-semibold">Clipboard</h1>
        <SearchInput value={q} onChange={setQ} />
        <SwitchThemeButton />
      </nav>
      <div className="h-16" />
      <section className="p-5">
        <ClipsBoard />
      </section>
    </main>
  );
};

export default Clipboard;
