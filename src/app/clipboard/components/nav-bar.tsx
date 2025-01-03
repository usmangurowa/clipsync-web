"use client";
import SearchInput from "@/components/search-input";
import { SwitchThemeButton } from "@/components/switch-theme-button";
import Link from "next/link";
import { useQueryState } from "nuqs";
import React from "react";

const NavBar = () => {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  return (
    <>
      <nav className="sticky top-0 z-50 grid w-full grid-flow-dense grid-cols-12 items-center justify-between gap-3 border-b px-5 py-3 backdrop-blur-md">
        <h1 className="col-span-6 text-xl font-semibold md:col-span-2 md:text-2xl">
          <Link href={"/"}>Clipboard</Link>
        </h1>
        <div className="col-span-12 flex items-center justify-center md:col-span-8">
          <SearchInput value={q} onChange={setQ} />
        </div>
        <div className="col-span-6 flex justify-end md:col-span-2">
          <SwitchThemeButton />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
