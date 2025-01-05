"use client";
import { Logo } from "@/components/brand";
import { SwitchThemeButton } from "@/components/switch-theme-button";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";

const NavBar = () => {
  const { data, isLoading } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container flex w-full items-center justify-between">
        <Link href={"/"} className="flex items-center">
          <Logo className="scale-50" />
          <h1 className="text-2xl font-semibold">Clip Sync</h1>
        </Link>
        <div className="flex items-center gap-x-2">
          {!isLoading && (
            <>
              <Button size={"sm"} asChild variant={"link"}>
                {data && <Link href={"/clipboard"}>Clipboard</Link>}
              </Button>
              <SwitchThemeButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
