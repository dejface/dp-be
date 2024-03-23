import { render, screen } from "@testing-library/react";
import FreeShippingProgressBar from "@/src/components/cart/FreeShippingProgressBar";
import { getFreeShippingThreshold } from "@/src/utils/getFreeShippingThreshold";
import { SupportedLocale } from "@/src/types/Types";
import { ShoppingCartProvider } from "@/src/contexts/ShoppingCartContext";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.cart.buy_more": "Nakupte este za",
        "app.cart.buy_more_second_part": "a mate dopravu zadarmo",
        "app.cart.shipping_free": "Doprava je zadarmo",
    });
});

jest.mock("@/utils/getFreeShippingThreshold", () => ({
    getFreeShippingThreshold: jest.fn(),
}));

describe("FreeShippingProgressBar", () => {
    beforeEach(() => {
        (getFreeShippingThreshold as jest.Mock).mockReturnValue(200);
    });

    it("renders correctly when hasFreeShipping is true with correct classnames", () => {
        (getFreeShippingThreshold as jest.Mock).mockReturnValue(50);

        render(
            <ShoppingCartProvider>
                <FreeShippingProgressBar totalPrice={120} locale={"cs"} />,
            </ShoppingCartProvider>,
        );

        const text = screen.getByText("Doprava je zadarmo");
        const icon = screen.getByTestId("fast-shipping-icon");

        expect(text).toHaveClass("mr-1");
        expect(text.parentElement).toHaveClass("is-flex is-align-items-center");
        expect(icon.parentElement).toHaveClass(
            "is-size-5 is-flex is-align-items-center",
        );
        expect(icon.parentElement?.parentElement).toHaveClass(
            "is-flex is-align-items-center",
        );
    });

    it("renders correctly when hasFreeShipping is false with correct classnames", () => {
        render(
            <ShoppingCartProvider>
                <FreeShippingProgressBar totalPrice={100} locale={"cs"} />,
            </ShoppingCartProvider>,
        );

        const buyMoreText = screen.getByText("Nakupte este za");
        const remainingPrice = screen.getByText("100,00 Kč");
        const buyMoreSecondPartText = screen.getByText(
            "a mate dopravu zadarmo",
        );
        const progress = screen.getByTestId("shipping-progress");

        expect(progress).toHaveClass("progress cart__shipping-progress mb-1");
        expect(buyMoreText).toHaveClass("is-size-7 mr-1");
        expect(remainingPrice).toHaveClass(
            "is-size-7 has-text-weight-bold mr-1",
        );
        expect(buyMoreSecondPartText).toHaveClass("is-size-7 mr-1");
    });

    it("calls getFreeShippingThreshold with correct locale", () => {
        const locale = "cs";
        render(
            <ShoppingCartProvider>
                <FreeShippingProgressBar totalPrice={100} locale={locale} />,
            </ShoppingCartProvider>,
        );

        expect(getFreeShippingThreshold).toHaveBeenCalledWith(locale);
    });
});
