import React from "react";
import { render, screen } from "@testing-library/react";
import PaginatedPageLayout from "@/src/components/pagination/PaginatedPageLayout";

describe("PaginatedPageLayout", () => {
    it("renders with correct class names", () => {
        render(
            <PaginatedPageLayout
                itemComponent={"ItemComponent"}
                paginationComponent={"PaginationComponent"}
            />,
        );
        const itemComponent = screen.getByText("ItemComponent");

        expect(itemComponent).toHaveClass(
            "columns is-multiline mt-2 is-variable is-2",
        );
    });
});
