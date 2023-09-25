import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const response = NextResponse.next();

  console.log("pathName은 ", pathName);

  if (pathName.startsWith("/@")) {
    // console.log("유저 프로필 가져와야해요!");
  }
}

export const config = {
  matcher: "/:path*",
};
