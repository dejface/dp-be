import React from "react";
import { render, screen } from "@testing-library/react";
import WaterproofSection from "./WaterproofSection";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.waterproof_section.title": "Title",
        "app.waterproof_section.description": "Description",
    });
});

describe("WaterproofSection", () => {
    beforeEach(() => {
        render(<WaterproofSection />);
    });

    test("correct layout classes", () => {
        expect(
            document.querySelector(".section.is-paddingless.pl-3.pr-3.pt-6"),
        ).toBeInTheDocument();
        expect(
            document.querySelector(".columns.is-vcentered"),
        ).toBeInTheDocument();
    });

    test("correct title", () => {
        const title = screen.getByText("Title");
        expect(title).toHaveClass("waterproof__title pb-3");
        expect(title.parentElement).toHaveClass(
            "column is-full-mobile is-paddingless pb-3-mobile px-1-mobile",
        );
    });

    test("correct description", () => {
        const description = screen.getByText("Description");
        expect(description).toHaveClass("waterproof__subtitle");
        expect(description.parentElement).toHaveClass(
            "column is-full-mobile is-paddingless pb-3-mobile px-1-mobile",
        );
    });

    test("correct image", () => {
        const image = screen.getByRole("img");
        expect(image).toHaveClass("waterproof__image");
        expect(image).toHaveAttribute("src", "/water.avif");
        expect(image).toHaveAttribute("alt", "Water avif");
        expect(image).toHaveAttribute("width", "718");
        expect(image).toHaveAttribute("height", "180");
        expect(image.parentElement).toHaveClass(
            "column is-two-thirds is-paddingless is-full-mobile pl-3-desktop px-1-tablet",
        );
        expect(image.parentElement?.parentElement).toHaveClass(
            "columns is-vcentered",
        );
    });
});
