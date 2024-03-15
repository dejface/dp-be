import useCalculatePrices from "@/src/hooks/useCalculatePrices";
import { renderHook } from "@testing-library/react";
import { generateCartItem } from "../../test/helpers/generateCartItem";

describe("useCalculatePrices hook", () => {
    it("calculates total price without discount correctly", () => {
        const items = [
            generateCartItem("1", 100, 2),
            generateCartItem("2", 200, 1),
        ];
        const { result } = renderHook(() => useCalculatePrices(items, 0));

        expect(result.current.totalPriceWithoutDiscount).toBe(400);
    });

    it("calculates total price with discount correctly", () => {
        const items = [
            generateCartItem("1", 100, 2),
            generateCartItem("2", 200, 1),
        ];
        const { result } = renderHook(() => useCalculatePrices(items, 50));

        expect(result.current.totalPriceWithDiscount).toBe(200);
    });

    it("should not crash when discount is 0 (division by zero)", () => {
        const items = [
            generateCartItem("1", 100, 2),
            generateCartItem("2", 200, 1),
        ];
        const { result } = renderHook(() => useCalculatePrices(items, 0));

        expect(result.current.totalPriceWithDiscount).toBe(400);
    });
});
