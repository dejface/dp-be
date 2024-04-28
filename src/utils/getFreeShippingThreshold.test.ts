import { getFreeShippingThreshold } from "@/src/utils/getFreeShippingThreshold";

describe("getFreeShippingThreshold", () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        originalEnv = process.env;
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("returns the correct free shipping threshold for 'cs' locale", () => {
        process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_CZ = "100";
        const threshold = getFreeShippingThreshold("cs");
        expect(threshold).toBe(100);
    });

    it("returns the correct free shipping threshold for 'sk' locale", () => {
        process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_SK = "200";
        const threshold = getFreeShippingThreshold("sk");
        expect(threshold).toBe(200);
    });
});
