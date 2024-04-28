import { render, screen } from "@testing-library/react";
import Socials from "@/src/components/footer/columns/Socials";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/src/utils/constants";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../../test/helpers/useTransMock");
    return useTransMock({
        "app.follow_us": "Follow us",
    });
});

describe("Socials", () => {
    test("classnames", () => {
        render(<Socials />);

        const text = screen.getByText(/Follow us/i);
        const tiktokIcon = screen.getAllByTestId("social-icon")[0];
        const instagramIcon = screen.getAllByTestId("social-icon")[1];

        expect(text).toHaveClass("has-text-weight-bold mb-2");
        expect(text.parentElement).toHaveClass("column");

        expect(tiktokIcon).toHaveClass("is-size-4");
        expect(tiktokIcon.parentElement).toHaveAttribute("href", TIKTOK_URL);
        expect(tiktokIcon.parentElement).toHaveClass(
            "contact-social-icon mr-3",
        );
        expect(tiktokIcon.parentElement?.parentElement).toHaveClass(
            "has-text-beige",
        );
        expect(
            tiktokIcon.parentElement?.parentElement?.parentElement,
        ).toHaveClass("column");

        expect(instagramIcon).toHaveClass("is-size-4");
        expect(instagramIcon.parentElement).toHaveAttribute(
            "href",
            INSTAGRAM_URL,
        );
        expect(instagramIcon.parentElement).toHaveClass("contact-social-icon");
        expect(instagramIcon.parentElement?.parentElement).toHaveClass(
            "has-text-beige",
        );
        expect(
            instagramIcon.parentElement?.parentElement?.parentElement,
        ).toHaveClass("column");
    });
});
