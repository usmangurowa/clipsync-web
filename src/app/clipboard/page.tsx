import React, { Suspense } from "react";
import ClipsBoard from "./components/clipsboard";

import NavBar from "./components/nav-bar";

const Clipboard = () => {
  return (
    <main className="relative h-screen flex-grow">
      <Suspense>
        <NavBar />
      </Suspense>
      <section className="p-5">
        <Suspense>
          <ClipsBoard />
        </Suspense>
      </section>
    </main>
  );
};

export default Clipboard;
