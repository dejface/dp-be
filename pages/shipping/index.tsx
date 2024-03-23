import React, { useState } from "react";
import Layout from "@/src/components/Layout";
import ShippingOptions from "@/src/components/shipping/ShippingOptions";
import { validateCartItemsAndRedirectToPayment } from "@/src/utils/validateCartItemsAndRedirectToPayment";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import { useRouter } from "next/router";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";
import CheckoutProcess from "@/src/components/cart/checkoutProccessIndication/CheckoutProcess";
import CartPriceSummary from "@/src/components/cart/CartPriceSummary";
import { getEmptyVoucher } from "@/src/utils/getEmptyVoucher";
import useCalculatePrices from "@/src/hooks/useCalculatePrices";
import { ShippingOption, SupportedLocale } from "@/src/types/Types";
import { fetchShippingOptions } from "@/src/api/fetch";
import { useFetchAndUpdateCartItems } from "@/src/hooks/useFetchAndUpdateCartItems";
import { getShippingPrice } from "@/src/utils/getShippingPrice";

interface ShippingIndexProps {
    shippingOptions: ShippingOption[];
}

const CheckoutIndex = ({ shippingOptions }: ShippingIndexProps) => {
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
        <Layout>
            <CheckoutProcess />
            <div className="columns">
                <div className="column is-two-thirds">
                    <ShippingOptions
                        shippingOptions={shippingOptions}
                        selectedOption={selectedShippingOption}
                        onSelectOption={handleSelectShippingOption}
                    />
                </div>
                <div className="column is-one-third is-paddingless cart__price-container">
                    <div className={"is-align-self-stretch"}>
                        <CartPriceSummary
                            totalPrice={
                                totalPriceWithDiscount + (shippingPrice ?? 0)
                            }
                            locale={locale}
                            shippingPrice={shippingPrice}
                        />
                    </div>
                    <div className={"is-align-self-flex-end mt-6"}>
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
        </Layout>
    );
};

export async function getStaticProps({ locale }: { locale: SupportedLocale }) {
    const fetchedItems = await fetchShippingOptions(locale);
    if (!fetchedItems) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            shippingOptions: fetchedItems,
        },
        revalidate: 30,
    };
}

export default CheckoutIndex;
