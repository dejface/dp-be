import React, { useEffect, useState } from "react";
import { SupportedLocale } from "@/src/types/Types";
import { getFreeShippingThreshold } from "@/src/utils/getFreeShippingThreshold";
import { useTranslation } from "@/src/contexts/TransContext";
import { FaShippingFast } from "react-icons/fa";
import PriceFormatter from "@/src/components/PriceFormatter";

interface FreeShippingProgressBarProps {
    totalPrice: number;
    locale: SupportedLocale;
}

const FreeShippingProgressBar = ({
    totalPrice,
    locale,
}: FreeShippingProgressBarProps) => {
    const trans = useTranslation();
    const [updatedThreshold, setUpdatedThreshold] = useState(
        getFreeShippingThreshold(locale),
    );
    const hasFreeShipping = totalPrice >= updatedThreshold;

    useEffect(() => {
        setUpdatedThreshold(getFreeShippingThreshold(locale));
    }, [totalPrice]);

    const remainingPrice = (
        <PriceFormatter price={updatedThreshold - totalPrice} locale={locale} />
    );

    return hasFreeShipping ? (
        <div className={"is-flex is-align-items-center"}>
            <span
                className={"mr-1"}
                dangerouslySetInnerHTML={{
                    __html: trans("app.cart.shipping_free"),
                }}
            ></span>
            <span className={"is-size-5 is-flex is-align-items-center"}>
                <FaShippingFast data-testid={"fast-shipping-icon"} />
            </span>
        </div>
    ) : (
        <div>
            <progress
                className="progress cart__shipping-progress mb-1"
                value={totalPrice}
                max={updatedThreshold}
                data-testid={"shipping-progress"}
            ></progress>
            <span className={"is-size-7 mr-1"}>
                {trans("app.cart.buy_more")}
            </span>
            <span className={"is-size-7 has-text-weight-bold mr-1"}>
                {remainingPrice}
            </span>
            <span
                className={"is-size-7 mr-1"}
                dangerouslySetInnerHTML={{
                    __html: trans("app.cart.buy_more_second_part"),
                }}
            />
        </div>
    );
};

export default FreeShippingProgressBar;