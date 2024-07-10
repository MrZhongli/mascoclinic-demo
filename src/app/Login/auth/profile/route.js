import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
  const cookieStore = cookies(request.headers);
  const token = cookieStore.get("myTokenName");

  if (!token) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    const { email, username } = jwt.verify(token, "secret");

    return NextResponse.json({
      email,
      username,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
