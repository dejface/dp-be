import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { useTranslation } from "@/src/contexts/TransContext";

jest.mock("@/contexts/TransContext");
jest.mock("./Navbar", () => {
    return function DummyNavbar() {
        return <div data-testid="navbar">Navbar</div>;
    };
});

jest.mock("@/components/ShippingNotice", () => {
    return function DummyShippingNotice() {
        return <div data-testid="shipping-notice">ShippingNotice</div>;
    };
});

jest.mock("@/components/Footer", () => {
    return function DummyFooter() {
        return <div data-testid="footer">Footer</div>;
    };
});

jest.mock("@vercel/analytics/react", () => ({
    Analytics: function DummyAnalytics() {
        return <div data-testid="analytics">Analytics</div>;
    },
}));

describe("Layout", () => {
    beforeEach(() => {
        (useTranslation as jest.Mock).mockImplementation(
            () => (key: string) => key,
        );
    });

    it("renders with correct class names", () => {
        render(
            <Layout>
                <div data-testid="children" />
            </Layout>,
        );
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("shipping-notice")).toBeInTheDocument();
        expect(screen.getByTestId("children")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
        expect(screen.getByTestId("analytics")).toBeInTheDocument();
        expect(screen.getByTestId("children").parentElement).toHaveClass(
            "column is-8-desktop is-offset-2-desktop",
        );
        expect(
            screen.getByTestId("children").parentElement?.parentElement,
        ).toHaveClass("columns is-gapless is-centered has-background-white");
        expect(
            screen.getByTestId("children").parentElement?.parentElement
                ?.parentElement,
        ).toHaveClass("hero is-fullheight");
    });
});
