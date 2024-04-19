import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import ShippingNotice from "@/src/components/ShippingNotice";
import { Analytics } from "@vercel/analytics/react";
import { useTranslation } from "@/src/contexts/TransContext";
import Footer from "@/src/components/footer/Footer";

interface LayoutProps {
    children: ReactNode;
    fullWidthBanner?: ReactNode;
}

const Layout = ({ children, fullWidthBanner = false }: LayoutProps) => {
    const trans = useTranslation();

    const content = !fullWidthBanner ? (
        <div className="columns is-gapless is-centered has-background-white">
            <div className="column is-8-desktop is-offset-2-desktop">
                <Navbar />
                {children}
            </div>
        </div>
    ) : (
        <div className="columns is-gapless is-centered has-background-white">
            <div className="column is-12">
                <div className="columns is-gapless is-vcentered is-centered">
                    <div className="column is-8-desktop">
                        <Navbar />
                    </div>
                </div>
                <div className="columns is-gapless">
                    <div className="column is-fullwidth">{fullWidthBanner}</div>
                </div>
                <div className="columns is-gapless is-vcentered is-centered">
                    <div className="column is-8-desktop">{children}</div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <ShippingNotice notice={trans("app.shipping_notice")} />
            <div className="hero is-fullheight">
                {content}
                <Footer />
                <Analytics />
            </div>
        </>
    );
};

export default Layout;
