import { useVoucher } from "@/src/hooks/useVoucher";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("useVoucher hook", () => {
    it("sets discount and accepts voucher if voucher code is valid", () => {
        const setActiveVoucher = jest.fn();
        const setIsAccepted = jest.fn();
        const voucherCodes = [{ name: "test", value: 10, stripeId: "test" }];

        const { result } = renderHook(() =>
            useVoucher(voucherCodes, setActiveVoucher),
        );

        result.current.handleVoucherSubmit("test")(setIsAccepted);

        expect(setActiveVoucher).toHaveBeenCalledWith({
            name: "test",
            value: 10,
            stripeId: "test",
        });
        expect(setIsAccepted).toHaveBeenCalledWith(true);
        expect(result.current.isModalOpen).toBe(false);
    });

    it("does not set discount and does not accept voucher if voucher code is invalid", () => {
        const setActiveVoucher = jest.fn();
        const setIsAccepted = jest.fn();
        const voucherCodes = [{ name: "test", value: 10, stripeId: "test" }];

        const { result } = renderHook(() =>
            useVoucher(voucherCodes, setActiveVoucher),
        );

        act(() => result.current.handleVoucherSubmit("invalid")(setIsAccepted));

        expect(setActiveVoucher).not.toHaveBeenCalled();
        expect(setIsAccepted).toHaveBeenCalledWith(false);
        expect(result.current.isModalOpen).toBe(true);
    });
});
