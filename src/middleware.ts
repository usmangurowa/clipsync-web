import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";
import { createClient } from "@/supabase/server";

export async function middleware(request: NextRequest) {
  // update user's auth session
  await updateSession(request);
  const supabase = await createClient();

  const newUrl = new URL("/", request.url);
  const { pathname } = request.nextUrl;

  const {
    data: { session },
  } = await supabase.auth.getSession();



  if (pathname === "/") {
    return NextResponse.next();
  }

  // Authenticated user with name trying to access /auth
  if (
    session &&
    session.user.user_metadata.full_name &&
    pathname.includes("/auth")
  ) {
    return NextResponse.redirect(newUrl.origin);
  }

  // Unauthenticated user trying to access other pages
  if (!session && !pathname.includes("/auth")) {
    const encodedSearchParams = `${pathname.substring(1)}${newUrl.search}`;

    const url = new URL("/auth", request.url);

    if (encodedSearchParams) {
      url.searchParams.append("return_to", encodedSearchParams);
    }

    return NextResponse.redirect(url);
  }

  // Authenticated without full_name and trying to access other pages
  // if (
  //   session &&
  //   !session?.user?.user_metadata?.full_name &&
  //   pathname !== "/auth/setup"
  // ) {
  //   return NextResponse.redirect(`${newUrl.origin}/auth/setup`);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
  ],
};
