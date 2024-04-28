import { NextRouter } from "next/router";
import { CartItem } from "@/src/types/Cart";
import { ShippingOption } from "../types/Types";

export const validateCartItemsAndRedirectToPayment = async (
    items: CartItem[],
    locale: string,
    discountId: string,
    router: NextRouter,
    shipping: ShippingOption,
    hasFreeShipping: boolean,
) => {
    const shippingObject = hasFreeShipping
        ? { ...shipping, price: 0 }
        : shipping;
    const response = await fetch("/api/cart_validation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, locale, discountId, shippingObject }),
    });
    if (response.status === 200) {
        const body = await response.json();
        await router.push(body.url);
    }
};
