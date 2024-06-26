import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.url.includes("/welcome") && request.cookies.get("visited")) {
		return NextResponse.redirect(new URL("/", request.url));
	} else if (request.cookies.get("visited")) {
		return NextResponse.next();
	} else if (!request.url.includes("/welcome")) {
		return NextResponse.redirect(new URL("/welcome", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
