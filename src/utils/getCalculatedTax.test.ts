import { getCalculatedTax } from "@/src/utils/getCalculatedTax";

describe("getCalculatedTax", () => {
    it("returns the correct calculated tax for 'cs' locale", () => {
        const price = 121;
        const tax = getCalculatedTax(price, "cs");
        expect(tax).toBeCloseTo(100);
    });

    it("returns the correct calculated tax for 'sk' locale", () => {
        const price = 121;
        const tax = getCalculatedTax(price, "sk");
        expect(tax).toBeCloseTo(100);
    });
});
