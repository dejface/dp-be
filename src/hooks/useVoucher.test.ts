import { useVoucher } from "@/src/hooks/useVoucher";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("useVoucher hook", () => {
    it("sets discount and accepts voucher if voucher code is valid", () => {
        const setDiscount = jest.fn();
        const setIsAccepted = jest.fn();
        const voucherCodes = [{ name: "test", value: 10 }];

        const { result } = renderHook(() =>
            useVoucher(voucherCodes, setDiscount, "test"),
        );

        result.current.handleVoucherSubmit("test")(setIsAccepted);

        expect(setDiscount).toHaveBeenCalledWith(10);
        expect(setIsAccepted).toHaveBeenCalledWith(true);
        expect(result.current.isModalOpen).toBe(false);
    });

    it("does not set discount and does not accept voucher if voucher code is invalid", () => {
        const setDiscount = jest.fn();
        const setIsAccepted = jest.fn();
        const voucherCodes = [{ name: "test", value: 10 }];

        const { result } = renderHook(() =>
            useVoucher(voucherCodes, setDiscount),
        );

        act(() => result.current.handleVoucherSubmit("invalid")(setIsAccepted));

        expect(setDiscount).not.toHaveBeenCalled();
        expect(setIsAccepted).toHaveBeenCalledWith(false);
        expect(result.current.isModalOpen).toBe(true);
    });

    it("sets discount if initial voucher code is valid", () => {
        const setDiscount = jest.fn();
        const voucherCodes = [{ name: "test", value: 10 }];

        renderHook(() => useVoucher(voucherCodes, setDiscount, "test"));

        expect(setDiscount).toHaveBeenCalledWith(10);
    });
});
