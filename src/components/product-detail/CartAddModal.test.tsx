import React from "react";
import { render, screen } from "@testing-library/react";
import CartAddModal from "@/src/components/product-detail/CartAddModal";
import { userEvent } from "@testing-library/user-event";

const setIsModalOpen = jest.fn();
const title = "Test Product";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.cart": "Kosik",
        "app.cart.added": "Přidáno do košíku",
    });
});

describe("CartAddModal", () => {
    beforeEach(() => {
        render(<CartAddModal title={title} setIsModalOpen={setIsModalOpen} />);
    });

    describe("setIsModalOpen correctly", () => {
        test("correct call on modal background click", async () => {
            await userEvent.click(screen.getByTestId("modal-background"));
            expect(setIsModalOpen).toHaveBeenCalledWith(false);
        });

        test("correct call on close button click", async () => {
            await userEvent.click(screen.getByTestId("cart-modal__close"));
            expect(setIsModalOpen).toHaveBeenCalledWith(false);
        });
    });

    describe("classnames", () => {
        test("modal background", () => {
            const modalBackground = screen.getByTestId("modal-background");

            expect(modalBackground).toHaveClass("modal-background");
            expect(modalBackground.parentElement).toHaveClass(
                "modal is-active",
            );
        });

        test("modal close button", () => {
            const modalClose = screen.getByTestId("cart-modal__close");

            expect(modalClose).toHaveClass("delete cart-modal__close");
            expect(modalClose.parentElement).toHaveClass("box cart-modal__box");
            expect(modalClose.parentElement?.parentElement).toHaveClass(
                "modal-content has-text-centered",
            );
        });

        test("heading", () => {
            const heading = screen.getByText("Přidáno do košíku");

            expect(heading).toHaveClass(
                "is-size-4 has-text-weight-semibold mb-4",
            );
            expect(heading.parentElement).toHaveClass("box cart-modal__box");
            expect(heading.parentElement?.parentElement).toHaveClass(
                "modal-content has-text-centered",
            );
        });

        test("product title", () => {
            const productTitle = screen.getByText(title);

            expect(productTitle).toHaveClass("is-size-5 mb-4");
            expect(productTitle.parentElement).toHaveClass(
                "box cart-modal__box",
            );
            expect(productTitle.parentElement?.parentElement).toHaveClass(
                "modal-content has-text-centered",
            );
        });

        test("link to cart", () => {
            const cartButton = screen.getByText("Kosik");
            screen.debug();
            expect(cartButton).toHaveClass(
                "confirm-button has-one-quarter-width",
            );
            expect(cartButton.parentElement).toHaveAttribute("href", "/cart");
            expect(cartButton.parentElement?.parentElement).toHaveClass(
                "box cart-modal__box",
            );
            expect(
                cartButton.parentElement?.parentElement?.parentElement,
            ).toHaveClass("modal-content has-text-centered");
        });
    });
});
