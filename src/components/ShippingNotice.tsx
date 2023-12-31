import React from "react";

interface ShippingNoticeProps {
    notice: string;
}

const ShippingNotice = ({ notice }: ShippingNoticeProps) => {
    return (
        <div className="shipping-notice has-text-white has-background-black has-text-centered is-size-7">
            {notice}
        </div>
    );
}

export default ShippingNotice;