import React from "react";
import { render, screen } from "@testing-library/react";
import { ShippingOption } from "@/src/types/Types";
import ShippingOptions from "@/src/components/shipping/ShippingOptions";
import { userEvent } from "@testing-library/user-event";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.cart.choose_shipping_method": "Choose shipping",
    });
});

jest.mock("@/contexts/ShoppingCartContext", () => ({
    useShoppingCart: () => ({ hasFreeShipping: false }),
}));

const mockOnSelectOption = jest.fn();
const shippingOptions: ShippingOption[] = [
    { sys: { id: "1" }, type: "Option 1", price: 10 },
    { sys: { id: "2" }, type: "Option 2", price: 20 },
];

describe("ShippingOptions", () => {
    it("renders without selected option and check classnames", () => {
        render(
            <ShippingOptions
                shippingOptions={shippingOptions}
                selectedOption={null}
                onSelectOption={mockOnSelectOption}
            />,
        );
        const title = screen.getByText("Choose shipping");
        expect(title).toHaveClass("shipping__title");
        expect(title.parentElement).toHaveClass(
            "box is-shadowless is-paddingless",
        );

        const shippingOptionsButtons = screen.getAllByRole("radio");
        shippingOptions.forEach((option, index) => {
            const currentOption = shippingOptionsButtons[index];
            expect(currentOption).toHaveClass("radio mt-2");
            expect(currentOption).not.toBeChecked();
            expect(currentOption.parentElement).toHaveClass("column is-narrow");

            const column = screen.getByText(option.type);
            expect(column).toHaveClass("column shipping__type m-0");
            expect(column.parentElement).toHaveClass(
                "columns is-vcentered is-mobile mb-2",
            );

            const price = screen.getByText(`${option.price.toString()},00 Kč`);
            expect(price).toHaveClass(
                "column is-narrow shipping__price mb-0 mr-6 mr-0-mobile",
            );
            expect(price.parentElement).toHaveClass(
                "columns is-vcentered is-mobile mb-2",
            );
        });
    });

    it("should correctly call on select option when clicked", async () => {
        render(
            <ShippingOptions
                shippingOptions={shippingOptions}
                selectedOption={null}
                onSelectOption={mockOnSelectOption}
            />,
        );

        const shippingOptionsButtons = screen.getAllByRole("radio");
        await userEvent.click(shippingOptionsButtons[0]);

        expect(mockOnSelectOption).toHaveBeenCalledWith(shippingOptions[0]);
    });

    it("renders with selected option", () => {
        render(
            <ShippingOptions
                shippingOptions={shippingOptions}
                selectedOption={shippingOptions[0]}
                onSelectOption={mockOnSelectOption}
            />,
        );

        const shippingOptionsButtons = screen.getAllByRole("radio");
        expect(shippingOptionsButtons[0]).toBeChecked();
        expect(shippingOptionsButtons[1]).not.toBeChecked();
    });
});
