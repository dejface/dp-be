import React from "react";
import { render, screen } from "@testing-library/react";
import IconColumns from "@/src/components/homepage/IconColumns";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.icon.resistance": "Resistance",
        "app.icon.material": "Material",
        "app.icon.timelessness": "Timelessness",
        "app.description.resistance": "Resistance description",
        "app.description.material": "Material description",
        "app.description.timelessness": "Timelessness description",
    });
});

describe("IconColumns", () => {
    it("renders the correct number of icons and check for layout classes", () => {
        render(<IconColumns />);
        const icons = screen.getAllByTestId("icon-component");
        expect(icons.length).toBe(3);
        expect(
            document.querySelector(".columns.is-variable.is-1.is-mobile.mt-6"),
        ).toBeInTheDocument();
        expect(document.querySelectorAll(".column.is-4")).toHaveLength(3);
        expect(document.querySelectorAll(".card.is-shadowless")).toHaveLength(
            3,
        );
    });

    it("renders the icons with correct classes", () => {
        render(<IconColumns />);
        const icons = screen.getAllByTestId(
            "icon-component",
        ) as HTMLImageElement[];
        icons.forEach((icon) => {
            expect(icon).toHaveClass("fa-icon");
            expect(icon.parentElement).toHaveClass("icon-columns__icon");
            expect(icon.parentElement?.parentElement).toHaveClass(
                "card-content is-paddingless",
            );
        });
    });

    it("renders the translated texts and check classes for one of them", () => {
        render(<IconColumns />);
        const resistance = screen.getByText("Resistance");
        expect(screen.getByText("Material")).toBeInTheDocument();
        expect(screen.getByText("Timelessness")).toBeInTheDocument();

        expect(resistance).toHaveClass(
            "icon-columns__title has-text-weight-bold mb-1",
        );
        expect(resistance.parentElement).toHaveClass(
            "card-content has-text-centered",
        );
        expect(screen.getByText("Resistance description")).toHaveClass(
            "icon-columns__subtitle has-text-beige m-0",
        );
    });
});
