import { createCookieSessionStorage } from "@remix-run/node";

const cookieSecret = process.env.COOKIE_SECRET ?? "default-secret"

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "_session",
      secrets: [cookieSecret],
      maxAge: 60 * 60 * 24 , // 1 day
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });