import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import { ShoppingCartProvider } from "@/src/contexts/ShoppingCartContext";

jest.mock("@/contexts/TransContext");

describe("Navbar", () => {
    beforeEach(() => {
        (useLanguage as jest.Mock).mockImplementation(() => ["cs"]);
        (useTranslation as jest.Mock).mockImplementation(
            () => (key: string) => key,
        );
    });

    it("contains the correct elements", () => {
        render(
            <ShoppingCartProvider>
                <Navbar />
            </ShoppingCartProvider>,
        );
        const productLinks = screen.getAllByRole("link", {
            name: "app.products",
        });
        expect(productLinks).toHaveLength(2);
        expect(productLinks[0]).toHaveClass("navbar-item is-medium");
        expect(productLinks[1]).toHaveClass(
            "navbar-item is-medium level-item is-hidden-desktop",
        );
        expect(
            screen.getByRole("link", { name: "app.contact" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "app.blog" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: /app.cart/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("img", { name: "Miloui Logo" }),
        ).toBeInTheDocument();
    });

    it("toggles navbar correctly", () => {
        render(
            <ShoppingCartProvider>
                <Navbar />
            </ShoppingCartProvider>,
        );
        const burger = screen.getByRole("button", { name: "menu" });

        fireEvent.click(burger);
        expect(burger).toHaveClass("is-active");
        expect(screen.getByTestId("navbar")).toHaveClass("is-active");

        fireEvent.click(burger);
        expect(burger).not.toHaveClass("is-active");
        expect(screen.getByTestId("navbar")).not.toHaveClass("is-active");
    });
});
