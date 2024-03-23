import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import CheckoutProcess from "@/src/components/cart/checkoutProccessIndication/CheckoutProcess";
import {
    CART_PATH,
    ORDER_SUMMARY_PATH,
    SHIPPING_PATH,
} from "@/src/utils/constants";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../../test/helpers/useTransMock");
    return useTransMock({
        "app.cart.full_name": "Nakupny kosik",
        "app.cart.shipping_and_payment": "Doprava a platba",
        "app.cart.order_summary": "Zhrnutie objednavky",
    });
});

const renderComponentAndReturnSteps = (pathname: string) => {
    (useRouter as jest.Mock).mockReturnValue({
        pathname: pathname,
    });

    render(<CheckoutProcess />);

    return {
        cartStep: screen.getByText("Nakupny kosik"),
        shippingStep: screen.getByText("Doprava a platba"),
        orderSummaryStep: screen.getByText("Zhrnutie objednavky"),
    };
};

describe("CheckoutProcess", () => {
    it("should test parent classes of steps", () => {
        const { cartStep, orderSummaryStep, shippingStep } =
            renderComponentAndReturnSteps("/");

        [cartStep, shippingStep, orderSummaryStep].forEach((step) => {
            expect(step.parentElement).toHaveClass(
                "cart__checkout-step is-flex is-align-items-center is-justify-content-space-between mt-6 mb-2",
            );
            expect(step.parentElement?.parentElement).toHaveClass(
                "column is-flex is-narrow",
            );
            expect(
                step.parentElement?.parentElement?.parentElement,
            ).toHaveClass("columns");
        });
    });

    it("renders with cart path as current page", () => {
        const { cartStep, orderSummaryStep, shippingStep } =
            renderComponentAndReturnSteps(`/${CART_PATH}`);

        expect(cartStep).toHaveClass(
            "cart__checkout-step__active-page has-text-weight-bold",
        );
        expect(shippingStep).not.toHaveClass(
            "cart__checkout-step__active-page",
        );
        expect(shippingStep).toHaveClass("cart__checkout-step__link");
        expect(shippingStep).toHaveAttribute("href", `/${SHIPPING_PATH}`);
        expect(orderSummaryStep).not.toHaveClass(
            "cart__checkout-step__active-page",
        );
        expect(orderSummaryStep).toHaveClass(
            "cart__checkout-step__inactive-page",
        );
    });

    it("renders with shipping path as current page", () => {
        const { cartStep, orderSummaryStep, shippingStep } =
            renderComponentAndReturnSteps(`/${SHIPPING_PATH}`);

        expect(cartStep).toHaveClass("cart__checkout-step__link");
        expect(cartStep).not.toHaveClass("cart__checkout-step__active-page");
        expect(cartStep).toHaveAttribute("href", `/${CART_PATH}`);
        expect(shippingStep).toHaveClass(
            "cart__checkout-step__active-page has-text-weight-bold",
        );
        expect(orderSummaryStep).not.toHaveClass(
            "cart__checkout-step__active-page",
        );
        expect(orderSummaryStep).toHaveClass(
            "cart__checkout-step__inactive-page",
        );
    });

    it("renders with order summary path as current page", () => {
        const { cartStep, orderSummaryStep, shippingStep } =
            renderComponentAndReturnSteps(`/${ORDER_SUMMARY_PATH}`);

        expect(cartStep).toHaveClass("cart__checkout-step__link");
        expect(cartStep).not.toHaveClass("cart__checkout-step__active-page");
        expect(cartStep).toHaveAttribute("href", `/${CART_PATH}`);
        expect(shippingStep).toHaveClass("cart__checkout-step__link");
        expect(shippingStep).not.toHaveClass(
            "cart__checkout-step__active-page",
        );
        expect(shippingStep).toHaveAttribute("href", `/${SHIPPING_PATH}`);
        expect(orderSummaryStep).toHaveClass(
            "cart__checkout-step__active-page has-text-weight-bold",
        );
    });
});
