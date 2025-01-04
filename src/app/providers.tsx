"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";
import { Toaster } from "sonner";
import { SWRConfig } from "swr";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
      </NuqsAdapter>
      <Toaster />
    </ThemeProvider>
  );
};

export { Providers };
