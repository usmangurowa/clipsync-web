import { Logo } from "@/components/brand";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden bg-card md:block">
        <div className="absolute left-4 top-4 md:left-8 md:top-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
