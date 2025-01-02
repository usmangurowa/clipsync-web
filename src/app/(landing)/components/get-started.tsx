"use client";
import ShimmerButton from "@/components/ui/shimmer-button";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  const { data, isLoading } = useSession();
  return (
    <Link href={isLoading ? "#" : data ? "/clipboard" : "/auth"}>
      <ShimmerButton className="shadow-2xl dark:text-white">
        Get Started
      </ShimmerButton>
    </Link>
  );
};

export { GetStarted };
