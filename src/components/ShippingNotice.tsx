import React from "react";
import Image from "next/image";

interface ShippingNoticeProps {
    notice: string;
}

const ShippingNotice = ({ notice }: ShippingNoticeProps) => {
    return (
        <div className="shipping-notice has-text-white has-background-black has-text-centered is-size-7">
            <Image
                src={"/shipping.svg"}
                alt={"Shipping icon"}
                width={13}
                height={13}
                className={"mr-2 mt-1"}
            />
            {notice}
        </div>
    );
};

export default ShippingNotice;
