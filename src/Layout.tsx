import Navbar from '@/src/components/Navbar';
import {ReactNode} from "react";
import ShippingNotice from "@/src/components/ShippingNotice";
import {useTranslation} from "@/src/hooks/useTranslation";
import LanguageSwitch from "@/src/components/LanguageSwitch";
import {Analytics} from "@vercel/analytics/react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const trans = useTranslation();
    return (
        <div className="main-container">
            <div className="side-column"></div>
            <div className="main-content">
                <ShippingNotice notice={trans('app.shipping_notice')}/>
                <LanguageSwitch/>
                <Navbar/>
                <div className="container">{children}</div>
            </div>
            <div className="side-column"></div>
            {/* Add a footer or other components as needed */}
            <Analytics />
        </div>
    );
};

export default Layout;