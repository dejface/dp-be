import React from "react";
import { render, screen } from "@testing-library/react";
import ShippingNotice from "./ShippingNotice";

jest.mock("./LanguageSwitch", () => {
    return function DummyLanguageSwitch() {
        return <div data-testid="language-switch">LanguageSwitch</div>;
    };
});

describe("ShippingNotice", () => {
    it("renders correctly with correct notice, classnames, LanguageSwitch component, and shipping icon", () => {
        render(<ShippingNotice notice="Test Notice" />);
        const navElement = screen.getByRole("navigation");
        const textElement = screen.getByText("Test Notice");
        screen.debug();
        expect(navElement).toBeInTheDocument();
        expect(screen.getByText("Test Notice")).toBeInTheDocument();
        expect(screen.getByTestId("language-switch")).toBeInTheDocument();
        expect(screen.getByAltText("Shipping icon")).toBeInTheDocument();
        expect(navElement).toHaveClass(
            "level",
            "shipping-notice",
            "has-text-white",
            "has-background-black",
            "is-size-7",
            "is-mobile",
            "mb-2",
        );
        expect(textElement).toHaveClass(
            "level-item",
            "has-text-centered",
            "shipping-notice__text",
        );
    });
});
