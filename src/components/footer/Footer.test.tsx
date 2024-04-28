import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/src/components/footer/Footer";

jest.mock("./columns/Address", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("address", "Address");
});

jest.mock("./columns/Logo", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("logo", "Logo");
});

jest.mock("./columns/Links", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("links", "Links");
});

jest.mock("./columns/Info", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("info", "Info");
});

jest.mock("./columns/Payment", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("payment", "Payment");
});

jest.mock("./columns/Socials", () => {
    const {
        generateDummyFunction,
    } = require("../../../test/helpers/generateDummyFunction");
    return generateDummyFunction("socials", "Socials");
});

describe("Footer", () => {
    test("classnames", () => {
        render(<Footer />);

        const logo = screen.getByTestId("logo");
        const address = screen.getByTestId("address");
        const links = screen.getByTestId("links");
        const info = screen.getByTestId("info");
        const payment = screen.getByTestId("payment");
        const socials = screen.getByTestId("socials");
        const copyright = screen.getByText(/miloui.cz © 2024/i);

        [address, info, links, payment, socials].forEach((elem) =>
            expect(elem.parentElement).toHaveClass("columns"),
        );
        expect(logo.parentElement).toHaveClass(
            "column is-8-desktop is-offset-2-desktop",
        );
        expect(logo.parentElement?.parentElement).toHaveClass(
            "columns is-flex is-flex-direction-column",
        );
        expect(logo.parentElement?.parentElement?.parentElement).toHaveClass(
            "footer has-background-black has-text-white footer__container",
        );
        expect(copyright).toHaveClass("has-text-centered");
        expect(copyright.parentElement).toHaveClass("footer__copyright");
    });
});
