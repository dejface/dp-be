import React from "react";
import { render, screen } from "@testing-library/react";
import WaterproofSection from "./WaterproofSection";

jest.mock("@/contexts/TransContext", () => {
    return {
        useTranslation: () => {
            const mockTranslations: { [key: string]: string } = {
                "app.waterproof_section.title": "Title",
                "app.waterproof_section.description": "Description",
            };
            return (key: string) => mockTranslations[key] || key;
        },
    };
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
        expect(title).toHaveClass("title is-6 pb-3");
        expect(title.parentElement).toHaveClass(
            "column is-full-mobile is-paddingless mr-6 pb-3-mobile px-1-mobile",
        );
    });

    test("correct description", () => {
        const description = screen.getByText("Description");
        expect(description).toHaveClass("subtitle is-6");
        expect(description.parentElement).toHaveClass(
            "column is-full-mobile is-paddingless mr-6 pb-3-mobile px-1-mobile",
        );
    });

    test("correct image", () => {
        const image = screen.getByRole("img");
        expect(image).toHaveClass("waterproof__image");
        expect(image).toHaveAttribute("src", "/water.avif");
        expect(image).toHaveAttribute("alt", "Water avif");
        expect(image).toHaveAttribute("width", "718");
        expect(image).toHaveAttribute("height", "180");
        expect(image.parentElement).toHaveClass("image");
        expect(image.parentElement?.parentElement).toHaveClass(
            "column is-two-thirds is-paddingless is-full-mobile pl-3-desktop",
        );
    });
});
