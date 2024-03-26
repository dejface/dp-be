import React from "react";
import { render, screen } from "@testing-library/react";
import ProductDetail from "@/src/components/product-detail/ProductDetail";
import { userEvent } from "@testing-library/user-event";
import { generateMockProduct } from "../../../test/helpers/generateMockProduct";

jest.mock("@/contexts/TransContext", () => ({
    useLanguage: () => ["cs"],
    useTranslation: () => (key: string) => key,
}));

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
    useShoppingCart: () => ({
        items: itemsMock,
        setItems: setItems,
    }),
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
            expect(image.parentElement).toHaveClass(
                "column is-8-desktop is-9-mobile selected-image",
            );
            expect(image.parentElement?.parentElement).toHaveClass(
                "columns is-mobile product-detail__images px-1-mobile",
            );
            expect(
                image.parentElement?.parentElement?.parentElement,
            ).toHaveClass("columns product-detail__container is-flex px-3");
        });

        test("correct classnames for title", () => {
            const title = screen.getByText("Test Product 12345");
            expect(title).toHaveClass("product-detail__title mb-3");
            expect(title.parentElement).toHaveClass(
                "column is-5 is-offset-1-desktop text__column",
            );
        });

        test("correct classnames for price", () => {
            const price = screen.getByText("100,00 Kč");
            expect(price).toHaveClass("product-detail__price mb-3");
            expect(price.parentElement).toHaveClass(
                "column is-5 is-offset-1-desktop text__column",
            );
        });

        test("correct classnames for description", () => {
            const description = screen.getByText("This is a test product");
            expect(description).toHaveClass(
                "content product-detail__description",
            );
            expect(description.parentElement).toHaveClass(
                "column is-5 is-offset-1-desktop text__column",
            );
        });

        test("correct classnames for quantity changer", () => {
            const quantityChanger = screen.getByText("-");
            expect(quantityChanger.parentElement).toHaveClass(
                "quantity-changer__product",
            );
            expect(quantityChanger.parentElement?.parentElement).toHaveClass(
                "product-detail__actions",
            );
            expect(
                quantityChanger.parentElement?.parentElement?.parentElement,
            ).toHaveClass("column is-5 is-offset-1-desktop text__column");
        });

        test("correct classnames for add to cart button", () => {
            const addToCartButton = screen.getByText("app.add_to_cart");
            expect(addToCartButton).toHaveClass("confirm-button");
            expect(addToCartButton.parentElement).toHaveClass(
                "product-detail__actions",
            );
            expect(addToCartButton.parentElement?.parentElement).toHaveClass(
                "column is-5 is-offset-1-desktop text__column",
            );
        });
    });
});
