import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { useTranslation } from "@/src/hooks/useTranslation";
import ShippingNotice from "@/src/components/ShippingNotice";
import Footer from "@/src/components/Footer";
import { Analytics } from "@vercel/analytics/react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const trans = useTranslation();

    return (
        <>
            <ShippingNotice notice={trans("app.shipping_notice")} />
            <div className="columns is-gapless is-centered has-background-white">
                <div className="column is-8 is-offset-2">
                    <Navbar />
                    {children}
                    <Footer />
                    <Analytics />
                </div>
            </div>
        </>
    );
};

export default Layout;