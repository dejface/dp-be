import React from "react";
import { render, screen } from "@testing-library/react";
import ProductDetail from "@/src/components/product-detail/ProductDetail";
import { userEvent } from "@testing-library/user-event";
import { generateMockProduct } from "../../../test/helpers/generateMockProduct";

jest.mock("@/contexts/TransContext", () => ({
    useLanguage: () => ["cs"],
    useTranslation: () => (key: string) => key,
}));

jest.mock("@/contexts/ShoppingCartContext");
jest.mock("@/components/product-detail/ProductThumbnails", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("product-thumbnails", "ProductThumbnails");
});
jest.mock("@/components/product-detail/CartAddModal", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("cart-add-modal", "CartAddModal");
});

const setItems = jest.fn();
let itemsMock: any[] = [];
jest.mock("@/contexts/ShoppingCartContext", () => ({
    useShoppingCart: () => [itemsMock, setItems],
}));

describe("ProductDetail", () => {
    describe("add to cart", () => {
        beforeEach(() => {
            itemsMock = [];
            setItems.mockImplementation((newItems) => {
                itemsMock = newItems;
            });

            render(<ProductDetail product={generateMockProduct("12345")} />);
        });

        test("add to cart without changing quantity", async () => {
            await userEvent.click(screen.getByText("app.add_to_cart"));

            expect(setItems).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: "12345",
                        quantity: 1,
                    }),
                ]),
            );
        });

        test("add to cart with adding quantity", async () => {
            await userEvent.click(screen.getByText("+"));
            await userEvent.click(screen.getByText("app.add_to_cart"));

            expect(setItems).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: "12345",
                        quantity: 2,
                    }),
                ]),
            );
        });

        test("add to cart with decreasing quantity", async () => {
            await userEvent.click(screen.getByText("+"));
            await userEvent.click(screen.getByText("+"));
            await userEvent.click(screen.getByText("+"));
            await userEvent.click(screen.getByText("+"));
            await userEvent.click(screen.getByText("-"));
            await userEvent.click(screen.getByText("app.add_to_cart"));

            expect(setItems).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: "12345",
                        quantity: 4,
                    }),
                ]),
            );
        });

        test("add to cart with existing item", async () => {
            await userEvent.click(screen.getByText("app.add_to_cart"));
            await userEvent.click(screen.getByText("app.add_to_cart"));

            expect(setItems).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: "12345",
                        quantity: 2,
                    }),
                ]),
            );
        });

        test("opens modal on add to cart click", async () => {
            await userEvent.click(screen.getByText("app.add_to_cart"));
            expect(screen.getByTestId("cart-add-modal")).toBeInTheDocument();
        });
    });

    describe("classnames tests", () => {
        beforeEach(() => {
            render(<ProductDetail product={generateMockProduct("12345")} />);
        });

        test("correct classnames for ProductThumbnails", () => {
            expect(
                screen.getByTestId("product-thumbnails").parentElement,
            ).toHaveClass("columns");
        });

        test("correct classnames for image", () => {
            const image = screen.getByRole("img");
            expect(image.parentElement).toHaveClass("selected-image");
            expect(image.parentElement?.parentElement).toHaveClass(
                "column is-6",
            );
        });

        test("correct classnames for title", () => {
            const title = screen.getByText("Test Product 12345");
            expect(title).toHaveClass("title product__title is-4 mb-5");
            expect(title.parentElement).toHaveClass(
                "column is-4 is-flex-direction-column is-justify-content-flex-start",
            );
        });

        test("correct classnames for price", () => {
            const price = screen.getByText("100,00 Kč");
            expect(price).toHaveClass("product__price is-6 mb-5 is-size-4");
            expect(price.parentElement).toHaveClass(
                "column is-4 is-flex-direction-column is-justify-content-flex-start",
            );
        });

        test("correct classnames for description", () => {
            const description = screen.getByText("This is a test product");
            expect(description).toHaveClass("content product__description");
            expect(description.parentElement).toHaveClass(
                "column is-4 is-flex-direction-column is-justify-content-flex-start",
            );
        });

        test("correct classnames for quantity changer", () => {
            const quantityChanger = screen.getByText("-");
            expect(quantityChanger.parentElement?.parentElement).toHaveClass(
                "field has-addons is-flex is-align-items-center mt-6",
            );
            expect(
                quantityChanger.parentElement?.parentElement?.parentElement,
            ).toHaveClass(
                "column is-4 is-flex-direction-column is-justify-content-flex-start",
            );
        });

        test("correct classnames for add to cart button", () => {
            const addToCartButton = screen.getByText("app.add_to_cart");
            expect(addToCartButton).toHaveClass(
                "product__add-to-cart is-radiusless has-text-weight-bold is-size-7",
            );
            expect(addToCartButton.parentElement).toHaveClass(
                "field has-addons is-flex is-align-items-center mt-6",
            );
            expect(addToCartButton.parentElement?.parentElement).toHaveClass(
                "column is-4 is-flex-direction-column is-justify-content-flex-start",
            );
        });
    });
});
