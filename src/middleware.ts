import { NextResponse } from "next/server";
// import { updateSession } from "./supabase/middleware";

// export async function middleware(request: NextRequest) {
//   // return await updateSession(request);
//   return new NextResponse.next(request);
// }

export function middleware() {
  // if (request.nextUrl.pathname === "/blocked") {

  // }
  return new NextResponse();
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
  ],
};
