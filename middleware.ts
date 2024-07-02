import { NextResponse, NextRequest } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
	if (req.nextUrl.pathname.includes("/admin")) {
		if (!req.auth && req.nextUrl.pathname.includes("/admin/dashboard")) {
			return NextResponse.redirect(new URL("/admin/signin", req.nextUrl.origin));
		} else if (
			req.auth &&
			(req.nextUrl.pathname.includes("signin") ||
				req.nextUrl.pathname.includes("unauthorized"))
		) {
			return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
		} else if (req.nextUrl.pathname === "/admin") {
			if (req.auth) {
				return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
			} else {
				return NextResponse.redirect(new URL("/admin/signin", req.nextUrl));
			}
		}
	} else {
		if (req.url.includes("/welcome") && req.cookies.get("visited")) {
			return NextResponse.redirect(new URL("/", req.nextUrl));
		} else if (req.cookies.get("visited")) {
			return NextResponse.next();
		} else if (!req.url.includes("/welcome")) {
			return NextResponse.redirect(new URL("/welcome", req.nextUrl));
		}
	}
});

// For Credentials Authentication
// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
// 	matcher: ["/((?!api|_next/static|_next/image|icon.ico|favicon.ico|.*\\.png$).*)"],
// };
