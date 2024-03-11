import React from "react";
import { render, screen } from "@testing-library/react";
import NumberedPagination from "@/src/components/pagination/NumberedPagination";
import { PAGINATION_PATH } from "@/src/utils/constants";
import usePageNumbers from "@/src/hooks/usePageNumbers";
import { useLanguage } from "@/src/contexts/TransContext";

jest.mock("@/hooks/usePageNumbers");
jest.mock("@/contexts/TransContext");

describe("NumberedPagination", () => {
    beforeEach(() => {
        (usePageNumbers as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);
        (useLanguage as jest.Mock).mockReturnValue(["cs"]);
    });

    it("renders correct number of page links", () => {
        render(
            <NumberedPagination totalPages={5} currentPage={1} path="/test" />,
        );
        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(4);
        links.forEach((link, index) =>
            expect(link).toHaveClass("has-text-black mr-3"),
        );
    });

    it("renders correct link href", () => {
        render(
            <NumberedPagination totalPages={5} currentPage={1} path="/test" />,
        );
        expect(screen.getByText("2")).toHaveAttribute(
            "href",
            `/test/${PAGINATION_PATH}/2`,
        );
    });

    it("renders current page without link", () => {
        render(
            <NumberedPagination totalPages={5} currentPage={1} path="/test" />,
        );
        expect(screen.getByText("1")).not.toHaveAttribute("href");
    });

    it("renders dots without link", () => {
        (usePageNumbers as jest.Mock).mockReturnValue([1, 2, -1, 4, 5]);
        render(
            <NumberedPagination totalPages={5} currentPage={1} path="/test" />,
        );
        const dots = screen.getByText("...");

        expect(dots).not.toHaveAttribute("href");
        expect(dots).toHaveClass("mr-3");
    });
});
