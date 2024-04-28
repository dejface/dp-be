import { render, screen } from "@testing-library/react";
import Logo from "@/src/components/footer/columns/Logo";

describe("Logo", () => {
    test("classnames", () => {
        render(<Logo />);

        const logo = screen.getByTestId("logo");

        expect(logo).toHaveAttribute("src", "/miloui_white.svg");
        expect(logo).toHaveAttribute("alt", "Miloui logo");
        expect(logo.parentElement).toHaveClass(
            "column is-12 has-text-centered is-paddingless mb-5",
        );
    });
});
