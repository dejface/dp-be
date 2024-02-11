import { getFormattedPrice } from "@/src/utils/getFormattedPrice";

describe("getFormattedPrice", () => {
    it("formats price correctly for the CS locale", () => {
        const price = 1234.56;
        const locale = "cs";
        const formattedPrice = getFormattedPrice(price, locale);
        expect(formattedPrice).toBe("1 234,56 Kč");
    });

    it("formats price correctly for the SK locale", () => {
        const price = 1234.56;
        const locale = "sk";
        const formattedPrice = getFormattedPrice(price, locale);
        expect(formattedPrice).toBe("1 234,56 €");
    });

    it("handles very high prices correctly", () => {
        const price = 123456789.01;
        const locale = "cs";
        const formattedPrice = getFormattedPrice(price, locale);
        expect(formattedPrice).toBe("123 456 789,01 Kč");
    });

    it("handles zero prices correctly", () => {
        const price = 0;
        const locale = "sk";
        const formattedPrice = getFormattedPrice(price, locale);
        expect(formattedPrice).toBe("0,00 €");
    });

    it("handles negative prices correctly", () => {
        const price = -1234.56;
        const locale = "cs";
        const formattedPrice = getFormattedPrice(price, locale);
        expect(formattedPrice).toBe("-1 234,56 Kč");
    });
});
