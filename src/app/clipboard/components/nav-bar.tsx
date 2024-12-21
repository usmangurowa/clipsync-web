"use client";
import SearchInput from "@/components/search-input";
import { SwitchThemeButton } from "@/components/switch-theme-button";
import { useQueryState } from "nuqs";
import React from "react";

const NavBar = () => {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  return (
    <>
      <nav className="fixed z-50 flex h-16 w-full items-center justify-between border-b bg-background px-5">
        <h1 className="text-2xl font-semibold">Clipboard</h1>
        <SearchInput value={q} onChange={setQ} />
        <SwitchThemeButton />
      </nav>
      <div className="h-16" />
    </>
  );
};

export default NavBar;
