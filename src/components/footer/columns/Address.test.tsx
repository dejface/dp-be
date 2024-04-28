import { render, screen } from "@testing-library/react";
import Address from "@/src/components/footer/columns/Address";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../../test/helpers/useTransMock");
    return useTransMock({
        "app.footer.return_address": "Adresa pro vraceni",
    });
});

describe("Address", () => {
    beforeEach(() => {
        render(<Address />);
    });

    test("footer address container", () => {
        const address = screen.getByText(/CREONATION s.r.o./i);
        const par1 = screen.getByText(/Adresa sídla:/i);
        const par2 = screen.getByText(/Mládeže 373\/79/i);
        const par3 = screen.getByText(/013 41, Dolný Hričov/i);
        const par4 = screen.getByText(/IČO: 53988281/i);
        const par5 = screen.getByText(/DIČ: 2121541081/i);

        expect(address).toHaveClass("has-text-weight-bold");
        [address, par1, par2, par3, par4, par5].forEach((el) => {
            expect(el.parentElement).toHaveClass("footer__address");
            expect(el.parentElement?.parentElement).toHaveClass("column");
        });
    });

    test("footer return address container", () => {
        const title = screen.getByText(/Adresa pro vraceni/i);
        const par1 = screen.getByText(/Miloui.cz Olicon Logistic s.r.o./i);
        const par2 = screen.getByText(/Trabantská 692/i);
        const par3 = screen.getByText(/190 15 Praha-Satalice/i);

        expect(title).toHaveClass("has-text-weight-bold");
        [title, par1, par2, par3].forEach((el) => {
            expect(el.parentElement).toHaveClass("footer__return-address");
            expect(el.parentElement?.parentElement).toHaveClass("column");
        });
    });
});
