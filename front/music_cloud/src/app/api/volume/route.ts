import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const TEN_YEARS_IN_SECONDS = 60 * 60 * 24 * 365 * 10;

export const POST = async (request: Request) => {
  const { volume } = await request.json();

  let response = new NextResponse(volume);

  response.cookies.set("volume", volume, {
    expires: new Date(Date.now() + TEN_YEARS_IN_SECONDS),
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
};

export const GET = async (request: Request, response: Response) => {
  const cookiesStore = cookies();
  const volumeCookie = cookiesStore.get("volume") || { value: 100 };
  const volumeCookieValue = Number(volumeCookie.value) || 100;

  return NextResponse.json({ volume: volumeCookieValue });
};
