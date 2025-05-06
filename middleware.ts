import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url))
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    if (token?.role === "medico") {
      if (
        req.nextUrl.pathname.startsWith("/usuarios")
      ) {
        return NextResponse.redirect(
          new URL("/pacientes", req.url)
        );
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
);

export const config = {
  matcher: ["/usuarios/:path*", "/login","/pacientes/:path*","/enfermedades/:path*","/signos/:path*","/sintomas/:path*","/historial/:path*","/diagnostico/:path*"],
};

