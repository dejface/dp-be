import CheckoutProcess from "@/src/components/cart/checkoutProccessIndication/CheckoutProcess";
import ShippingOptions from "@/src/components/shipping/ShippingOptions";
import { validateCartItemsAndRedirectToPayment } from "@/src/utils/validateCartItemsAndRedirectToPayment";
import { ShippingOption } from "@/src/types/Types";
import React, { useState } from "react";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import { useRouter } from "next/router";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";
import { getEmptyVoucher } from "@/src/utils/getEmptyVoucher";
import useCalculatePrices from "@/src/hooks/useCalculatePrices";
import { useFetchAndUpdateCartItems } from "@/src/hooks/useFetchAndUpdateCartItems";
import { getShippingPrice } from "@/src/utils/getShippingPrice";
import CartPriceSummary from "@/src/components/cart/cartPrice/CartPriceSummary";
import Link from "next/link";
import {
    PRIVACY_POLICY_PATH,
    TERMS_AND_CONDITIONS_PATH,
} from "@/src/utils/constants";

interface ShippingPageProps {
    shippingOptions: ShippingOption[];
}

const generateLink = (href: string, locale: string, text: string) => {
    return (
        <Link href={`/${href}`} locale={locale}>
            {text}
        </Link>
    );
};

const ShippingPageLayout = ({ shippingOptions }: ShippingPageProps) => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const router = useRouter();
    const { items, setItems, voucher, hasFreeShipping } = useShoppingCart();
    const activeVoucher = voucher ?? getEmptyVoucher();
    const { totalPriceWithDiscount } = useCalculatePrices(
        items,
        activeVoucher.value,
    );
    useFetchAndUpdateCartItems(items, setItems, locale);
    const [selectedShippingOption, setSelectedShippingOption] =
        useState<ShippingOption | null>(null);

    const shippingPrice = getShippingPrice(
        shippingOptions,
        selectedShippingOption,
        hasFreeShipping,
    );

    const handleSelectShippingOption = (option: ShippingOption) => {
        setSelectedShippingOption(option);
    };

    return (
        <div className="shipping-container px-1-mobile">
            <CheckoutProcess />
            <div className="columns">
                <div className="column is-two-thirds">
                    <ShippingOptions
                        shippingOptions={shippingOptions}
                        selectedOption={selectedShippingOption}
                        onSelectOption={handleSelectShippingOption}
                    />
                </div>
                <div className="column is-one-third is-paddingless cart__price-container px-1-mobile">
                    <div className={"is-align-self-stretch"}>
                        <CartPriceSummary
                            totalPrice={
                                totalPriceWithDiscount + (shippingPrice ?? 0)
                            }
                            locale={locale}
                            shippingPrice={shippingPrice}
                        />
                    </div>
                    <div className="shipping__terms-and-conditions">
                        {trans("app.cart.accept_terms_intro")}
                        {generateLink(
                            TERMS_AND_CONDITIONS_PATH,
                            locale,
                            trans("app.cart.accept_terms"),
                        )}
                        {" a "}
                        {generateLink(
                            PRIVACY_POLICY_PATH,
                            locale,
                            trans("app.cart.accept_terms_privacy"),
                        )}
                        {"."}
                    </div>
                    <div
                        className={
                            "is-align-self-flex-end mt-6 mt-4-mobile mr-3 mr-0-mobile"
                        }
                    >
                        <button
                            className="confirm-button"
                            disabled={!selectedShippingOption}
                            onClick={() =>
                                validateCartItemsAndRedirectToPayment(
                                    items,
                                    locale,
                                    activeVoucher.stripeId,
                                    router,
                                    selectedShippingOption as ShippingOption,
                                    hasFreeShipping,
                                )
                            }
                        >
                            {trans("app.cart.continue_to_payment")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPageLayout;
