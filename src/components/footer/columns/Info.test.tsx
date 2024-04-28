import { render, screen } from "@testing-library/react";
import Info from "@/src/components/footer/columns/Info";
import { INFO_MAIL } from "@/src/utils/constants";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../../test/helpers/useTransMock");
    return useTransMock({
        "app.footer.info_text": "Info text",
    });
});

describe("Info", () => {
    test("classnames", () => {
        render(<Info />);

        const infoText = screen.getByText(/Info text/i);
        const infoMail = screen.getByText(INFO_MAIL);
        const starsImage = screen.getByTestId("footer-stars");

        expect(infoText).toHaveClass("is-italic");
        expect(infoText.parentElement).toHaveClass("column");
        expect(infoMail).toHaveClass("has-text-weight-bold");
        expect(infoMail.parentElement).toHaveClass("column");
        expect(starsImage).toHaveClass("footer__stars");
        expect(starsImage.parentElement).toHaveClass(
            "is-hidden-mobile is-flex is-justify-content-flex-end",
        );
        expect(starsImage.parentElement?.parentElement).toHaveClass("column");
    });
});
