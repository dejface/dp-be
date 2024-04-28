import { NextRequest, NextResponse } from "next/server";
import { CART_PATH, SHIPPING_PATH } from "@/src/utils/constants";

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

    if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true") {
        req.nextUrl.pathname = `/maintenance`;
        return NextResponse.rewrite(req.nextUrl);
    }

    const referer = req.headers.get("Referer");
    const refererUrl = referer ? new URL(referer) : null;
    if (
        req.nextUrl.pathname === `/${SHIPPING_PATH}` &&
        (!refererUrl || !refererUrl.pathname.includes(`/${CART_PATH}`)) &&
        (!refererUrl || !refererUrl.pathname.includes(`/${SHIPPING_PATH}`))
    ) {
        return NextResponse.redirect(new URL(`/${CART_PATH}`, req.url));
    }
}
