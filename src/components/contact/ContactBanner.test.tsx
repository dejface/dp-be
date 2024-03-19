import { render, screen } from "@testing-library/react";
import ContactBanner from "@/src/components/contact/ContactBanner";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.contact.banner_title": "Test title",
    });
});

describe("ContactBanner", () => {
    it("should render the title correctly and have correct classnames", () => {
        render(<ContactBanner />);

        const title = screen.getByText("TEST TITLE");
        expect(title).toHaveClass("subtitle is-size-2");
        expect(title.parentElement).toHaveClass(
            "contact-banner has-text-centered",
        );
        expect(title.parentElement?.parentElement).toHaveClass(
            "container has-text-centered",
        );
        expect(title.parentElement?.parentElement?.parentElement).toHaveClass(
            "hero-body",
        );
        expect(
            title.parentElement?.parentElement?.parentElement?.parentElement,
        ).toHaveClass("hero is-medium hero-contact-banner");
    });
});
