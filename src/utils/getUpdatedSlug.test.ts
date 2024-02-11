import { getUpdatedSlug } from "@/src/utils/getUpdatedSlug";

describe("getUpdatedSlug", () => {
    const slugs = [{ cs: "slug-cs-1", sk: "slug-sk-1" }];

    it("returns the correct slug for the target locale when a match is found", () => {
        const currentSlug = "slug-cs-1";
        const result = getUpdatedSlug(slugs, currentSlug, "cs", "sk");
        expect(result).toBe("slug-sk-1");
    });

    it("returns an empty string when no matching current slug is found", () => {
        const nonExistentSlug = "non-existent-slug";
        const result = getUpdatedSlug(slugs, nonExistentSlug, "cs", "sk");
        expect(result).toBe("");
    });
});
