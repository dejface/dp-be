import { render, screen } from "@testing-library/react";
import React from "react";
import CartPriceSummary from "@/src/components/cart/CartPriceSummary";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.total_price": "Cena",
        "app.total_price_without_tax": "Cena bez DPH",
    });
});

describe("CartPriceSummary", () => {
    beforeEach(() => {
        render(<CartPriceSummary totalPrice={100} locale="cs" />);
    });

    test("price with tax classnames", () => {
        const totalPrice = screen.getByText("Cena:");

        expect(totalPrice).toHaveClass("is-6 mr-2");
        expect(totalPrice.parentElement).toHaveClass(
            "cart__price-with-tax is-flex is-justify-content-space-between",
        );
        expect(totalPrice.parentElement?.parentElement).toHaveClass(
            "box is-shadowless cart__total-price is-justify-content-flex-start is-paddingless pt-6",
        );
        expect(totalPrice.parentElement?.lastElementChild).toHaveClass(
            "has-text-weight-bold mr-3",
        );
        expect(totalPrice.parentElement?.lastElementChild).toHaveTextContent(
            "100,00 Kč",
        );
    });

    test("price without tax classnames", () => {
        const totalPriceWithoutTax = screen.getByText("Cena bez DPH:");

        expect(totalPriceWithoutTax).toHaveClass("is-6 mr-2");
        expect(totalPriceWithoutTax.parentElement).toHaveClass(
            "cart__price-without-tax is-flex is-justify-content-space-between",
        );
        expect(totalPriceWithoutTax.parentElement?.parentElement).toHaveClass(
            "box is-shadowless cart__total-price is-justify-content-flex-start is-paddingless pt-6",
        );
        expect(
            totalPriceWithoutTax.parentElement?.lastElementChild,
        ).toHaveClass("has-text-weight-bold mr-3");
        expect(
            totalPriceWithoutTax.parentElement?.lastElementChild,
        ).toHaveTextContent("82,64 Kč");
    });
});
