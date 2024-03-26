import { SupportedLocale } from "@/src/types/Types";
import Link from "next/link";
import { SHIPPING_PATH } from "@/src/utils/constants";
import React from "react";
import CartPriceSummary from "@/src/components/cart/cartPrice/CartPriceSummary";

interface CartPriceContainerProps {
    totalPriceWithDiscount: number;
    locale: SupportedLocale;
    label: string;
}

const CartPriceContainer = ({
    totalPriceWithDiscount,
    locale,
    label,
}: CartPriceContainerProps) => {
    return (
        <div className="column is-one-third-desktop is-paddingless cart__price-container">
            <div className={"is-align-self-stretch"}>
                <CartPriceSummary
                    totalPrice={totalPriceWithDiscount}
                    locale={locale}
                />
            </div>
            <div className={"is-align-self-flex-end mt-4 mr-3 mt-6-mobile"}>
                <Link href={`${SHIPPING_PATH}`}>
                    <button className={"confirm-button confirm-button__cart"}>
                        {label}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CartPriceContainer;
