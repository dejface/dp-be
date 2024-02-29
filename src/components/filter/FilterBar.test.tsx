import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import FilterBar from "@/src/components/filter/FilterBar";

const mockOnFilterSelect = jest.fn();
const filters = ["filter1", "filter2", "filter3"];

describe("FilterBar", () => {
    it("renders the component with filters", () => {
        render(
            <FilterBar
                filters={filters}
                onFilterSelect={mockOnFilterSelect}
                activeFilter={undefined}
            />,
        );

        expect(screen.getByText("filter1")).toBeInTheDocument();
        expect(screen.getByText("filter2")).toBeInTheDocument();
        expect(screen.getByText("filter3")).toBeInTheDocument();
        expect(
            document.querySelector(".buttons.has-addons.pt-2"),
        ).toBeInTheDocument();
        expect(
            document.querySelector(".filterButton.filterButton__active"),
        ).not.toBeInTheDocument();
        expect(document.querySelectorAll(".filterButton")).toHaveLength(3);
    });

    it("calls onFilterSelect with filter name when filter button is clicked", async () => {
        render(
            <FilterBar
                filters={filters}
                onFilterSelect={mockOnFilterSelect}
                activeFilter={undefined}
            />,
        );
        await userEvent.click(screen.getByText("filter1"));
        expect(mockOnFilterSelect).toHaveBeenCalledWith("filter1");
    });

    it("calls onFilterSelect with empty string when active filter button is clicked", async () => {
        render(
            <FilterBar
                filters={filters}
                onFilterSelect={mockOnFilterSelect}
                activeFilter={"filter1"}
            />,
        );
        await userEvent.click(screen.getByText("filter1"));
        expect(mockOnFilterSelect).toHaveBeenCalledWith("");
        expect(screen.getByText("filter1")).toHaveClass(
            "filterButton filterButton__active",
        );
    });
});
