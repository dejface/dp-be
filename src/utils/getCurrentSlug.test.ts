import { getCurrentSlug } from "@/src/utils/getCurrentSlug";

describe("getCurrentSlug", () => {
    it("returns the third element of an array when present", () => {
        const input = ["part1", "part2", "slug", "part4"];
        const result = getCurrentSlug(input);
        expect(result).toBe("slug");
    });

    it("returns undefined when the array has fewer than three elements", () => {
        const inputShort = ["part1"];
        const resultShort = getCurrentSlug(inputShort);
        const resultEmpty = getCurrentSlug([]);

        expect(resultShort).toBe("");
        expect(resultEmpty).toBe("");
    });
});
