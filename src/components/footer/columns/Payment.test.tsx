import { render, screen } from "@testing-library/react";
import Payment from "@/src/components/footer/columns/Payment";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../../test/helpers/useTransMock");
    return useTransMock({
        "app.footer.afraid_of_us": "Don't be afraid",
    });
});

describe("Payment", () => {
    test("classnames and attributes", () => {
        render(<Payment />);

        const text = screen.getByText(/Don't be afraid/i);
        const stripe = screen.getByAltText("stripe");
        const visa = screen.getByAltText("visa");
        const mastercard = screen.getByAltText("mastercard");
        const ds = screen.getByAltText("3ds");

        expect(text).toHaveClass("has-text-weight-bold ml-1");
        expect(text.parentElement).toHaveClass("column");

        expect(stripe).toHaveAttribute("src", "/stripe.svg");
        expect(stripe).toHaveClass("mt-1");
        expect(stripe.parentElement?.parentElement).toHaveClass("column");

        expect(visa).toHaveAttribute("src", "/visa.svg");
        expect(visa).toHaveClass("mb-2");
        expect(visa.parentElement?.parentElement).toHaveClass("column");

        expect(mastercard).toHaveAttribute("src", "/mastercard.svg");
        expect(mastercard).toHaveClass("ml-2");
        expect(mastercard.parentElement?.parentElement).toHaveClass("column");

        expect(ds).toHaveAttribute("src", "/3ds.svg");
        expect(ds).toHaveClass("ml-2");
        expect(ds.parentElement?.parentElement).toHaveClass("column");
    });
});
