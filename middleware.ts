// import { NextResponse, NextRequest } from "next/server";

// No Auth
// export function middleware(request: NextRequest) {
// 	if (request.url.includes("/admin")) {
// 	} else if (request.url.includes("/welcome") && request.cookies.get("visited")) {
// 		return NextResponse.redirect(new URL("/", request.url));
// 	} else if (request.cookies.get("visited")) {
// 		return NextResponse.next();
// 	} else if (!request.url.includes("/welcome")) {
// 		return NextResponse.redirect(new URL("/welcome", request.url));
// 	}
// }

// With Google
// export default auth((req) => {
// 	if (req.nextUrl.pathname.includes("/admin")) {
// 		if (
// 			!req.auth &&
// 			req.nextUrl.pathname.includes("/admin") &&
// 			!req.nextUrl.pathname.includes("signin")
// 		) {
// 			return NextResponse.redirect(new URL("/admin/signin", req.nextUrl.origin));
// 		} else if (req.auth && req.nextUrl.pathname.includes("signin")) {
// 			return NextResponse.redirect(new URL("/admin", req.nextUrl));
// 		}
// 	} else {
// 		if (req.url.includes("/welcome") && req.cookies.get("visited")) {
// 			return NextResponse.redirect(new URL("/", req.nextUrl));
// 		} else if (req.cookies.get("visited")) {
// 			return NextResponse.next();
// 		} else if (!req.url.includes("/welcome")) {
// 			return NextResponse.redirect(new URL("/welcome", req.nextUrl));
// 		}
// 	}
// });

// For Credentials Authentication
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|icon.ico|favicon.ico|.*\\.png$).*)"],
};
