import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const publicpaths= ["/signin", "/register", "/forgot-password"];

    // If the request is for a public path, continue to the next middleware
    if (publicpaths.includes(pathname)) {
        return NextResponse.next();
    }

    // Read the session from the cookie
    const session = request.cookies.get("rentcar-auth.session-token")
        || request.cookies.get("__Secure-rentcar-auth.session-token");

    if(session?.value && pathname === "/signin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // const role = request.headers.get("x-role");
    // console.log(role);
    // if(request.nextUrl.pathname === "/dashboard" && role !== "ADMIN") {
    //     return NextResponse.redirect(new URL("/unauthorized", request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/profile"]
}