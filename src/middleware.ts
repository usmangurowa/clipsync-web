import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";
import { createClient } from "@/supabase/server";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const supabase = await createClient();

  const newUrl = new URL("/", request.url);
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const { data } = await supabase.auth.getSession();

  const session = data?.session || null;

  if (session && pathname === "/auth/reset-password") {
    return NextResponse.next();
  }

  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(newUrl.origin);
  }

  if (!session && pathname.startsWith("/clipboard")) {
    const encodedSearchParams = `${pathname.substring(1)}${newUrl.search}`;

    const url = new URL("/auth/sign-in", request.url);

    if (encodedSearchParams) {
      url.searchParams.append("return_to", encodedSearchParams);
    }

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
