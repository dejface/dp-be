import { render, act, screen } from "@testing-library/react";
import VoucherDeniedModal from "@/src/components/cart/VoucherDeniedModal";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.cart.voucher_denied": "Voucher denied",
    });
});

describe("VoucherDeniedModal", () => {
    it("closes modal after 2000ms", async () => {
        const setIsModalOpen = jest.fn();
        jest.useFakeTimers();

        render(<VoucherDeniedModal setIsModalOpen={setIsModalOpen} />);

        expect(setIsModalOpen).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(setIsModalOpen).toHaveBeenCalledWith(false);

        jest.useRealTimers();
    });

    describe("correct classnames", () => {
        test("icon", () => {
            render(<VoucherDeniedModal setIsModalOpen={jest.fn()} />);
            const icon = screen.getByTestId("voucher-denied-icon");
            expect(icon).toHaveClass("is-size-1 has-text-danger mb-4");
            expect(icon.parentElement).toHaveClass(
                "box cart-modal__box has-background-off-white",
            );
            expect(icon.parentElement?.parentElement).toHaveClass(
                "modal-content has-text-centered",
            );
            expect(
                icon.parentElement?.parentElement?.parentElement,
            ).toHaveClass("modal is-active left-corner-modal");
        });
    });

    test("text", () => {
        render(<VoucherDeniedModal setIsModalOpen={jest.fn()} />);
        const text = screen.getByText("Voucher denied");
        expect(text).toHaveClass("is-size-4 has-text-weight-semibold mb-4");
        expect(text.parentElement).toHaveClass(
            "box cart-modal__box has-background-off-white",
        );
        expect(text.parentElement?.parentElement).toHaveClass(
            "modal-content has-text-centered",
        );
        expect(text.parentElement?.parentElement?.parentElement).toHaveClass(
            "modal is-active left-corner-modal",
        );
    });
});
