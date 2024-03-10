import React from "react";
import { render, screen } from "@testing-library/react";
import QuantityChanger from "@/src/components/QuantityChanger";
import { userEvent } from "@testing-library/user-event";

describe("QuantityChanger", () => {
    it('increases the quantity when "+" button is clicked', async () => {
        let testQuantity = 1;
        const mockSetQuantity = jest.fn((func) => {
            testQuantity = func(testQuantity);
        });
        render(<QuantityChanger quantity={1} setQuantity={mockSetQuantity} />);
        await userEvent.click(screen.getByText("+"));
        expect(mockSetQuantity).toHaveBeenCalledWith(expect.any(Function));
        expect(testQuantity).toBe(2);
    });

    it.each([
        [1, 1],
        [2, 1],
    ])(
        'decreases the quantity when "-" button is clicked, but not below 1',
        async (quantity: number, expected: number) => {
            let testQuantity = quantity;
            const mockSetQuantity = jest.fn((func) => {
                testQuantity = func(testQuantity);
            });
            render(
                <QuantityChanger
                    quantity={quantity}
                    setQuantity={mockSetQuantity}
                />,
            );
            await userEvent.click(screen.getByText("-"));
            expect(mockSetQuantity).toHaveBeenCalledWith(expect.any(Function));
            expect(testQuantity).toBe(expected);
        },
    );

    test("correct class names are applied", () => {
        render(<QuantityChanger quantity={1} setQuantity={jest.fn()} />);

        const minusButton = screen.getByText("-");
        const plusButton = screen.getByText("+");
        const quantityValue = screen.getByDisplayValue("1");

        expect(minusButton).toHaveClass(
            "product__quantity-button mr-2 has-text-weight-semibold",
        );
        expect(minusButton.parentElement).toHaveClass("control");
        expect(plusButton).toHaveClass(
            "product__quantity-button has-text-weight-semibold",
        );
        expect(plusButton.parentElement).toHaveClass("control mr-6 ml-2");
        expect(quantityValue).toHaveClass("product__quantity-value");
        expect(quantityValue.parentElement).toHaveClass("control");
    });
});
