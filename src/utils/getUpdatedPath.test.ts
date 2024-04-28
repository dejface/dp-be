import { getUpdatedPath } from "@/src/utils/getUpdatedPath";
import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";

describe("getUpdatedPath", () => {
    it("returns the original path when updating to the default locale", () => {
        const pathParts = ["blog", "article"];
        const result = getUpdatedPath(LOCALE_CS, pathParts);
        expect(result).toBe("/blog/article");
    });

    it("adds the locale prefix for non-default locales", () => {
        const pathParts = ["blog", "article"];
        const result = getUpdatedPath(LOCALE_SK, pathParts);
        expect(result).toBe("/sk/blog/article");
    });

    it("handles empty path parts correctly", () => {
        const result = getUpdatedPath(LOCALE_SK, []);
        expect(result).toBe("/sk");
    });

    it("preserves the original path without changes for the default locale even with empty path parts", () => {
        const result = getUpdatedPath(LOCALE_CS, []);
        expect(result).toBe("");
    });

    it("correctly constructs paths with multiple parts for non-default locales", () => {
        const pathParts = ["blog", "article", "slug"];
        const result = getUpdatedPath(LOCALE_SK, pathParts);
        expect(result).toBe("/sk/blog/article/slug");
    });

    it("preserves query parameters when updating the locale", () => {
        const pathParts = ["blog", "article"];
        const queryString = "?param1=value1&param2=value2";
        const result = getUpdatedPath(LOCALE_SK, pathParts, queryString);
        expect(result).toBe("/sk/blog/article?param1=value1&param2=value2");
    });
});
