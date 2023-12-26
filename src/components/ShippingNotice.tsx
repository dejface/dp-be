import React from "react";

interface ShippingNoticeProps {
    notice: string;
}

const ShippingNotice = ({ notice }: ShippingNoticeProps) => {
    return <div className="shipping-notice">{notice}</div>
}

export default ShippingNotice;