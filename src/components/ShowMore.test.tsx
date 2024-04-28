import React from "react";
import { render } from "@testing-library/react";
import ShowMore from "./ShowMore";
import { userEvent } from "@testing-library/user-event";

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
        expect(linkElement).toHaveClass("show-more__text custom");
        expect(getByTestId("icon-svg")).toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <ShowMore text="Show More" href="/more" onClick={handleClick} />,
        );
        await userEvent.click(getByText("Show More"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should render icon on the right side", () => {
        const { container, getByText } = render(
            <ShowMore text="Show More" href="/more" iconPosition="right" />,
        );

        const linkElement = getByText("Show More").closest("a");
        const iconElement = container.querySelector("[data-testid='icon-svg']");

        expect(container.firstChild?.firstChild).toBe(linkElement);
        expect(container.lastChild).toBe(iconElement);
    });

    it("should render icon on the left side", () => {
        const { container, getByText } = render(
            <ShowMore text="Show More" href="/more" iconPosition="left" />,
        );

        const linkElement = getByText("Show More").closest("a");
        const iconElement = container.querySelector("[data-testid='icon-svg']");

        expect(container.firstChild?.firstChild).toBe(iconElement);
        expect(container.lastChild?.lastChild).toBe(linkElement);
    });
});
