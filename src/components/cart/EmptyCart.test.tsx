import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyCart from "@/src/components/cart/EmptyCart";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.cart.empty": "Vas kosik je prazdny",
        "app.cart.browse_products": "Spat na produkty",
    });
});

jest.mock("@/components/ShowMore", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("show-more", "ShowMore");
});

describe("EmptyCart", () => {
    it("renders correctly with correct classnames", () => {
        render(<EmptyCart />);

        const emptyCartText = screen.getByText("Vas kosik je prazdny");
        const emptyCartIcon = screen.getByTestId("empty-cart-icon");
        const showMoreComponent = screen.getByTestId("show-more");

        expect(emptyCartText).toHaveClass("cart__empty-container__empty-text");
        expect(emptyCartText.parentElement).toHaveClass(
            "cart__empty-container has-text-centered",
        );
        expect(emptyCartIcon).toHaveClass("cart__empty-container__basket-icon");
        expect(emptyCartIcon.parentElement).toHaveClass(
            "cart__empty-container has-text-centered",
        );
        expect(showMoreComponent.parentElement).toHaveClass(
            "is-flex is-justify-content-flex-start",
        );
    });
});
