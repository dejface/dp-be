import { render, screen } from "@testing-library/react";
import Links from "@/src/components/footer/columns/Links";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../../test/helpers/useTransMock");
    return useTransMock({
        "app.footer.order_info": "Order info",
        "app.terms_and_conditions": "Terms and conditions",
        "app.privacy_policy": "Privacy policy",
        "app.return_policy": "Return policy",
        "app.contact": "Contact",
    });
});

describe("Links", () => {
    test("classnames and attributes", () => {
        render(<Links />);

        const orderInfo = screen.getByText(/Order info/i);
        const termsAndConditions = screen.getByText(/Terms and conditions/i);
        const privacyPolicy = screen.getByText(/Privacy policy/i);
        const returnPolicy = screen.getByText(/Return policy/i);
        const contact = screen.getByText(/Contact/i);

        expect(orderInfo).toHaveClass("has-text-weight-bold");
        expect(orderInfo.parentElement).toHaveClass("column");

        expect(termsAndConditions).toHaveAttribute("href", "/terms-conditions");
        expect(termsAndConditions.parentElement?.parentElement).toHaveClass(
            "column",
        );

        expect(privacyPolicy).toHaveAttribute("href", "/privacy-policy");
        expect(privacyPolicy.parentElement?.parentElement).toHaveClass(
            "column",
        );

        expect(returnPolicy).toHaveAttribute("href", "/return-policy");
        expect(returnPolicy.parentElement?.parentElement).toHaveClass("column");

        expect(contact).toHaveAttribute("href", "/contact");
        expect(contact.parentElement?.parentElement).toHaveClass("column");
    });
});
