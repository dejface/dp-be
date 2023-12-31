import ShippingNotice from "@/src/components/ShippingNotice";
import LanguageSwitch from "@/src/components/LanguageSwitch";
import Navbar from "@/src/components/Navbar";
import {useTranslation} from "@/src/hooks/useTranslation";

const Header = () => {
    const trans = useTranslation();
    return (
        <div className="header">
            <ShippingNotice notice={trans('app.shipping_notice')}/>
            <LanguageSwitch/>
            <Navbar/>
        </div>
    )
}

export default Header;