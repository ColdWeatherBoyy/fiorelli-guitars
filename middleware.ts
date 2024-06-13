import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.cookies.get("visited")) {
		return NextResponse.next();
	} else {
		return NextResponse.redirect(new URL("/welcome", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|welcome).*)"],
};
