import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ShowMore from "./ShowMore";

jest.mock("@/contexts/TransContext", () => ({
    useLanguage: () => ["cs"],
}));

describe("ShowMore", () => {
    it("renders the passed text, href and icon", () => {
        const { getByText, getByTestId } = render(
            <ShowMore text="Show More" href="/more" className={"custom"} />,
        );
        expect(getByText("Show More")).toBeInTheDocument();

        const linkElement = getByText("Show More").closest("a");
        expect(linkElement).toHaveAttribute("href", "/more");
        expect(linkElement).toHaveClass("has-text-black custom");
        expect(getByTestId("icon-svg")).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <ShowMore text="Show More" href="/more" onClick={handleClick} />,
        );
        fireEvent.click(getByText("Show More"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
