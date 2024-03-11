import React from "react";
import { render, screen } from "@testing-library/react";
import About from "@/src/components/homepage/About";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.about.title": "About Title",
        "app.about.first_paragraph": "First paragraph",
        "app.about.second_paragraph": "Second paragraph",
        "app.about.third_paragraph": "Third paragraph",
        "app.about.fourth_paragraph": "Fourth paragraph",
    });
});

describe("About", () => {
    it("renders correct classnames for parent elements", () => {
        render(<About />);
        expect(
            document.querySelector(
                ".section.is-paddingless.pt-6.pb-6.px-1-mobile",
            ),
        ).toBeInTheDocument();
        expect(
            document.querySelector(
                ".columns.is-variable.is-8-mobile.is-desktop",
            ),
        ).toBeInTheDocument();
        expect(
            document.querySelector(".column.about__text-column"),
        ).toBeInTheDocument();
        expect(
            document.querySelector(".column.about__image-column"),
        ).toBeInTheDocument();
    });

    it("renders the translated texts", () => {
        render(<About />);
        expect(screen.getByText("About Title")).toHaveClass("title");
        expect(screen.getByText("First paragraph")).toHaveClass("is-italic");
        expect(screen.getByText("Second paragraph")).toHaveClass("is-italic");
        expect(screen.getByText("Third paragraph")).toHaveClass("is-italic");
        expect(screen.getByText("Fourth paragraph")).toHaveClass("is-italic");
    });

    it("renders the image with correct attributes", () => {
        render(<About />);
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "/placeholder.png");
        expect(image).toHaveAttribute("alt", "alt");
        expect(image).toHaveAttribute("width", "474");
        expect(image).toHaveAttribute("height", "483");
        expect(image.parentElement).toHaveClass("image is-paddingless");
    });
});
