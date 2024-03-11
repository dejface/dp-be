import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { useTranslation } from "@/src/contexts/TransContext";

jest.mock("@/contexts/TransContext");
jest.mock("./Navbar", () => {
    const {
        generateDummyFunction,
    } = require("../../test/helpers/generateDummyFunction");
    return generateDummyFunction("navbar", "Navbar");
});

jest.mock("@/components/ShippingNotice", () => {
    const {
        generateDummyFunction,
    } = require("../../test/helpers/generateDummyFunction");
    return generateDummyFunction("shipping-notice", "ShippingNotice");
});

jest.mock("@/components/Footer", () => {
    const {
        generateDummyFunction,
    } = require("../../test/helpers/generateDummyFunction");
    return generateDummyFunction("footer", "Footer");
});

jest.mock("@vercel/analytics/react", () => {
    const {
        generateDummyFunction,
    } = require("../../test/helpers/generateDummyFunction");
    return { Analytics: generateDummyFunction("analytics", "Analytics") };
});

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
