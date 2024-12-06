import { type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";
// import { createClient } from "@/supabase/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
  // const response = await updateSession(request);

  // const newUrl = new URL("/", request.url);
  // const { pathname } = request.nextUrl;

  // if (pathname === "/") {
  //   return response;
  // }
  // const supabase = await createClient();
  // const { data } = await supabase.auth.getSession();

  // const session = data?.session || null;

  // if (session && pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(newUrl.origin);
  // }

  // if (!session && pathname.startsWith("/clipboard")) {
  //   const encodedSearchParams = `${pathname.substring(1)}${newUrl.search}`;

  //   const url = new URL("/auth", request.url);

  //   if (encodedSearchParams) {
  //     url.searchParams.append("return_to", encodedSearchParams);
  //   }

  //   return NextResponse.redirect(url);
  // }

  // return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
