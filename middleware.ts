import { NextResponse } from "next/server";
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
			return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl.origin));
		}
	} else {
		if (
			req.nextUrl.pathname.includes("/welcome") &&
			req.cookies.get("visited")?.value === "true"
		) {
			return NextResponse.redirect(new URL("/", req.nextUrl.origin));
		} else if (
			!req.nextUrl.pathname.includes("/welcome") &&
			req.cookies.get("visited")?.value !== "true"
		) {
			return NextResponse.redirect(new URL("/welcome", req.nextUrl.origin));
		}
	}
});

// export function middleware(request: NextRequest) {
// 	if (request.nextUrl.pathname.includes("/welcome") && request.cookies.get("visited")) {
// 		return NextResponse.redirect(new URL("/", request.url));
// 	} else if (request.cookies.get("visited")) {
// 		return NextResponse.next();
// 	} else if (!request.nextUrl.pathname.includes("/welcome")) {
// 		return NextResponse.redirect(new URL("/welcome", request.url));
// 	}
// }

// export const config = {
// 	matcher: ["/((?!api|admin|_next/static|_next/image|icon.ico|favicon.ico|.*\\.png$).*)"],
// };
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|icon.ico|favicon.ico|.*\\.png$).*)"],
};
