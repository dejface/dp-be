import { NextRouter } from "next/router";
import { CartItem } from "@/src/types/Cart";

export const validateCartItemsAndRedirectToPayment = async (
    items: CartItem[],
    locale: string,
    discountId: string,
    router: NextRouter,
) => {
    const response = await fetch("/api/cart_validation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, locale, discountId }),
    });
    if (response.status === 200) {
        const body = await response.json();
        await router.push(body.url);
    }
};
