import React from "react";
import { useRouter } from "next/router";
import { CART_PATH } from "@/src/utils/constants";
import { CheckoutStep } from "@/src/types/Types";
import CheckoutStage from "@/src/components/cart/checkoutProccessIndication/CheckoutStage";

const getCheckoutSteps = (currentPagePath: string): CheckoutStep[] => {
    return [
        {
            translationKey: "app.cart.full_name",
            link: CART_PATH,
            isActive: currentPagePath === `/${CART_PATH}`,
            isClickable: true,
        },
        {
            translationKey: "app.cart.shipping_and_payment",
            link: "",
            isActive: currentPagePath === "",
            isClickable: true,
        },
        {
            translationKey: "app.cart.order_summary",
            link: "",
            isActive: currentPagePath === "",
            isClickable: false,
        },
    ];
};

const CheckoutProcess = () => {
    const router = useRouter();
    const currentPagePath = router.pathname;

    const checkoutSteps = getCheckoutSteps(currentPagePath);

    return (
        <div className={"columns"}>
            <div className="column is-flex is-narrow">
                {checkoutSteps.map((step, index) => (
                    <CheckoutStage key={index} step={step} />
                ))}
            </div>
        </div>
    );
};

export default CheckoutProcess;
