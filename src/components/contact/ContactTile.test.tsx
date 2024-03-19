import { render, screen } from "@testing-library/react";
import ContactTile from "@/src/components/contact/ContactTile";
import { INFO_MAIL, INFO_PHONE } from "@/src/utils/constants";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.contact": "Kontakt",
    });
});

describe("ContactTile", () => {
    it("should have correct classnames", () => {
        render(<ContactTile />);

        const icon = screen.getByTestId("contact-tile-icon");
        expect(icon).toHaveClass("is-size-3");
        expect(icon.parentElement).toHaveClass(
            "column has-text-centered is-8 is-offset-2 my-4",
        );
        expect(screen.getByText("KONTAKT")).toHaveClass(
            "is-size-6 has-text-weight-semibold",
        );
        expect(screen.getByText(INFO_MAIL)).toHaveClass("is-size-6 mt-4 mb-4");
        expect(screen.getByText(INFO_PHONE)).toHaveClass(
            "is-size-6 mt-4 contact-tile-title",
        );
    });
});
