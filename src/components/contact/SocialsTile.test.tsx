import { render, screen } from "@testing-library/react";
import SocialsTile from "@/src/components/contact/SocialsTile";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/src/utils/constants";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.contact.socials_title": "Socials title",
        "app.contact.socials_description": "Socials description",
    });
});
describe("SocialsTile", () => {
    it("should check for correct classnames", () => {
        render(<SocialsTile />);

        const icon = screen.getByTestId("socials-tile-icon");
        expect(icon).toHaveClass("is-size-3");
        expect(icon.parentElement).toHaveClass(
            "column has-text-centered is-8 is-offset-2 my-4",
        );
        expect(screen.getByText("SOCIALS TITLE")).toHaveClass(
            "is-size-6 has-text-weight-semibold",
        );
        expect(screen.getByText("Socials description")).toHaveClass(
            "is-size-6 mt-4 mb-4",
        );
    });

    it("should display the correct social media icons", () => {
        render(<SocialsTile />);
        const icons = screen.getAllByTestId("social-icon");
        const instagramIcon = icons[0];
        const tiktokIcon = icons[1];

        expect(instagramIcon).toHaveClass("is-size-4");
        expect(instagramIcon.parentElement).toHaveAttribute(
            "href",
            INSTAGRAM_URL,
        );
        expect(instagramIcon.parentElement).toHaveAttribute("target", "_blank");
        expect(instagramIcon.parentElement).toHaveClass("contact-social-icon");
        expect(instagramIcon.parentElement?.parentElement).toHaveClass(
            "social-icon-column",
        );
        expect(
            instagramIcon.parentElement?.parentElement?.parentElement,
        ).toHaveClass("columns is-centered is-mobile");

        expect(tiktokIcon).toHaveClass("is-size-4");
        expect(tiktokIcon.parentElement).toHaveAttribute("href", TIKTOK_URL);
        expect(tiktokIcon.parentElement).toHaveAttribute("target", "_blank");
        expect(tiktokIcon.parentElement).toHaveClass("contact-social-icon");
        expect(tiktokIcon.parentElement?.parentElement).toHaveClass(
            "social-icon-column",
        );
        expect(
            tiktokIcon.parentElement?.parentElement?.parentElement,
        ).toHaveClass("columns is-centered is-mobile");
    });
});
