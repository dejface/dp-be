import { render, screen } from "@testing-library/react";
import { FaFacebook } from "react-icons/fa";
import SocialIcon from "./SocialIcon";

describe("SocialIcon", () => {
    it("should have correct href", () => {
        render(<SocialIcon href="https://facebook.com" Icon={FaFacebook} />);

        const linkElement = screen.getByTestId("social-icon").parentElement;
        expect(linkElement).toHaveAttribute("href", "https://facebook.com");
    });
});
