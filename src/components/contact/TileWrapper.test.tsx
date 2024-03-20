import { render, screen } from "@testing-library/react";
import TileWrapper from "@/src/components/contact/TileWrapper";

describe("TileWrapper", () => {
    it("should have correct classnames", () => {
        render(<TileWrapper>Test Child</TileWrapper>);
        const wrapper = screen.getByText("Test Child");

        expect(wrapper).toHaveClass("columns is-gapless is-centered");
        expect(wrapper.parentElement).toHaveClass("content");
        expect(wrapper.parentElement?.parentElement).toHaveClass(
            "card-content",
        );
        expect(wrapper.parentElement?.parentElement?.parentElement).toHaveClass(
            "card is-shadowless contact-tile",
        );
        expect(
            wrapper.parentElement?.parentElement?.parentElement?.parentElement,
        ).toHaveClass("column is-6");
    });
});
