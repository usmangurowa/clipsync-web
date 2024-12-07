"use client";
import React from "react";
import ClipsBoard from "./components/clipsboard";

const Clipboard = () => {
  return (
    <main className="relative h-screen flex-grow">
      <nav className="container flex h-20 items-center border-b">
        <h1 className="text-2xl font-semibold">Clipboard</h1>
      </nav>
      <section className="container py-5">
        <ClipsBoard />
      </section>
    </main>
  );
};

export default Clipboard;
