import React, { Suspense } from "react";
import ClipsBoard from "./components/clipsboard";

import NavBar from "./components/nav-bar";

const Clipboard = () => {
  return (
    <main className="relative flex h-screen flex-grow flex-col">
      <Suspense>
        <NavBar />
      </Suspense>
      <section className="flex-grow p-5">
        <Suspense>
          <ClipsBoard />
        </Suspense>
      </section>
    </main>
  );
};

export default Clipboard;
