import { Logo } from "@/components/brand";
import Link from "next/link";
import React from "react";

const AuthErrorCode = () => {
  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-center space-y-5">
      <Logo />
      <h1 className="text-5xl font-bold">Authentication Error</h1>
      <p>
        There was an error with the authentication process. Please try again.
      </p>
      <Link href={"/auth"}>Login</Link>
    </main>
  );
};

export default AuthErrorCode;
