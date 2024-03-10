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
});
