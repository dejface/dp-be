import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/:path*"],
};

export async function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname === "/miloui.png" ||
        req.nextUrl.pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    if (process.env.UNDER_CONSTRUCTION === "true") {
        req.nextUrl.pathname = `/maintenance`;
        return NextResponse.rewrite(req.nextUrl);
    }
}
