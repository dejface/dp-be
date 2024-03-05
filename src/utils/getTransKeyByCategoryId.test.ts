import { EARRINGS_ID, NECKLACES_ID, RINGS_ID } from "@/src/utils/constants";
import { getTransKeyByCategoryId } from "@/src/utils/getTransKeyByCategoryId";

describe("getTransKeyByCategoryId", () => {
    it("should return the correct trans key for earrings", () => {
        const result = getTransKeyByCategoryId(EARRINGS_ID);
        expect(result).toEqual("app.earrings");
    });

    it("should return the correct trans key for necklaces", () => {
        const result = getTransKeyByCategoryId(NECKLACES_ID);
        expect(result).toEqual("app.necklaces");
    });

    it("should return the correct trans key for rings", () => {
        const result = getTransKeyByCategoryId(RINGS_ID);
        expect(result).toEqual("app.rings");
    });

    it("should return null for an unknown category", () => {
        const result = getTransKeyByCategoryId("unknown");
        expect(result).toBeNull();
    });
});
