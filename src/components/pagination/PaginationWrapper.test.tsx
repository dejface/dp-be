import React from "react";
import { render, screen } from "@testing-library/react";
import PaginationWrapper from "@/src/components/pagination/PaginationWrapper";

describe("PaginationWrapper", () => {
    it("renders with correct class names", () => {
        render(<PaginationWrapper>Test</PaginationWrapper>);
        const childElement = screen.getByText("Test");

        expect(childElement).toHaveClass("level-item has-text-centered");
        expect(childElement.parentElement).toHaveClass("level");
        expect(childElement.parentElement?.parentElement).toHaveClass(
            "column is-full",
        );
        expect(
            childElement.parentElement?.parentElement?.parentElement,
        ).toHaveClass("columns is-centered");
    });
});
