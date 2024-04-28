import { getDiscount } from "@/src/utils/getDiscount";

describe("getDiscount", () => {
    it("returns the correct discounted price when discount is greater than 0", () => {
        const price = 100;
        const discount = 20;
        const discountedPrice = getDiscount(price, discount);
        expect(discountedPrice).toBe(80);
    });

    it("returns the original price when discount is 0 or less", () => {
        const price = 100;
        const discount = 0;
        const discountedPrice = getDiscount(price, discount);
        expect(discountedPrice).toBe(price);
    });
});
