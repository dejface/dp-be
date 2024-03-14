import React from "react";
import { render, screen } from "@testing-library/react";
import PriceFormatter from "@/src/components/PriceFormatter";
import { SupportedLocale } from "@/src/types/Types";

describe("PriceFormatter", () => {
    it.each([
        [100, "cs", "100,00 Kč"],
        [100, "sk", "100,00 €"],
    ])(
        "displays the formatted price",
        (price: number, locale: string, expected: string) => {
            render(
                <PriceFormatter
                    price={price}
                    locale={locale as SupportedLocale}
                />,
            );
            expect(screen.getByText(expected)).toBeInTheDocument();
        },
    );

    it.each([
        [100, "cs", "82,64 Kč"],
        [100, "sk", "83,33 €"],
    ])(
        "displays the formatted price without tax",
        (price: number, locale: string, expected: string) => {
            render(
                <PriceFormatter
                    price={price}
                    locale={locale as SupportedLocale}
                    calculateTax={true}
                />,
            );
            expect(screen.getByText(expected)).toBeInTheDocument();
        },
    );
});
