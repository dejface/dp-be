import React from "react";
import Image from "next/image";
import LanguageSwitch from "./LanguageSwitch";

interface ShippingNoticeProps {
    notice: string;
}

const ShippingNotice = ({ notice }: ShippingNoticeProps) => {
    return (
        <nav className="level shipping-notice has-text-white has-background-black is-size-7 is-mobile mb-2">
            <div className="level-left">
                <div className="level-item">
                    <LanguageSwitch />
                </div>
            </div>
            <div className="level-item has-text-centered shipping-notice__text">
                <Image
                    src={"/shipping.svg"}
                    alt={"Shipping icon"}
                    width={13}
                    height={13}
                    className={"mr-2"}
                />
                {notice}
            </div>
        </nav>
    );
};

export default ShippingNotice;
