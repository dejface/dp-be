import React from "react";
import { render, screen } from "@testing-library/react";
import QuantityChanger from "@/src/components/QuantityChanger";
import { userEvent } from "@testing-library/user-event";

describe("QuantityChanger", () => {
    describe("functionality", () => {
        it.each([
            [7, 8],
            [11, 10],
        ])(
            'increases the quantity when "+" button is clicked, but not above 10',
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
                await userEvent.click(screen.getByText("+"));
                expect(mockSetQuantity).toHaveBeenCalledWith(
                    expect.any(Function),
                );
                expect(testQuantity).toBe(expected);
            },
        );

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
                expect(mockSetQuantity).toHaveBeenCalledWith(
                    expect.any(Function),
                );
                expect(testQuantity).toBe(expected);
            },
        );
    });

    describe("classnames", () => {
        test("correct class names are applied when quantity under maximum", () => {
            render(<QuantityChanger quantity={1} setQuantity={jest.fn()} />);

            expect(screen.getByText("-")).toHaveClass(
                "product__quantity-button mr-2 has-text-weight-semibold",
            );
            expect(screen.getByText("+")).toHaveClass(
                "product__quantity-button has-text-weight-semibold",
            );
            expect(screen.getByDisplayValue("1")).toHaveClass(
                "product__quantity-value",
            );
        });

        test("correct class names for + button are applied when quantity is maximum", () => {
            render(<QuantityChanger quantity={10} setQuantity={jest.fn()} />);

            expect(screen.getByText("+")).toHaveClass(
                "product__quantity-button ml-2 has-text-weight-semibold is-invisible",
            );
        });
    });
});
