import { NextResponse } from "next/server";

const COOKIE_NAME = "ab_admin_auth";

export async function GET(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || token !== expected) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true }, { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const password = typeof body?.password === "string" ? body.password : "";
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        { success: false, message: ".env.local mein ADMIN_PASSWORD set nahi hai." },
        { status: 500 }
      );
    }

    if (password !== expected) {
      return NextResponse.json(
        { success: false, message: "Galat password! Dobara try karein." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.set(COOKIE_NAME, expected, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err?.message || "Auth error aaya." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.delete(COOKIE_NAME);
  return res;
}