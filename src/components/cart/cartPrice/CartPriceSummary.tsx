import PriceFormatter from "@/src/components/PriceFormatter";
import React from "react";
import { useTranslation } from "@/src/contexts/TransContext";
import { SupportedLocale } from "@/src/types/Types";

interface CartPriceSummaryProps {
    totalPrice: number;
    locale: SupportedLocale;
    shippingPrice?: number | null;
}

const CartPriceSummary = ({
    totalPrice,
    locale,
    shippingPrice = null,
}: CartPriceSummaryProps) => {
    const trans = useTranslation();

    return (
        <div className="box is-shadowless cart__total-price is-justify-content-flex-start is-paddingless pt-6">
            <div className="cart__price-with-tax is-flex is-justify-content-space-between">
                <span className={"is-6 mr-2"}>
                    {`${trans("app.total_price")}:`}
                </span>
                <span className={"has-text-weight-bold mr-3 mr-0-mobile"}>
                    <PriceFormatter price={totalPrice} locale={locale} />
                </span>
            </div>
            <div className="cart__price-without-tax is-flex is-justify-content-space-between">
                <span className={"is-6 mr-2"}>
                    {`${trans("app.total_price_without_tax")}:`}
                </span>
                <span className={"has-text-weight-bold mr-3 mr-0-mobile"}>
                    <PriceFormatter
                        price={totalPrice}
                        locale={locale}
                        calculateTax={true}
                    />
                </span>
            </div>
            {shippingPrice !== null && (
                <div className="cart__shipping-price is-flex is-justify-content-space-between">
                    <span className="">{`${trans("app.shipping")}:`}</span>
                    <span className={"has-text-weight-bold mr-3 mr-0-mobile"}>
                        <PriceFormatter price={shippingPrice} locale={locale} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default CartPriceSummary;
