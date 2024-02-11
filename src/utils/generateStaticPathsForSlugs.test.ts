import { fetchSlugs } from "@/src/api/fetch";
import { generateStaticPathsForSlugs } from "@/src/utils/generateStaticPathsForSlugs";

jest.mock("@/api/fetch");

describe("generateStaticPathsForSlugs", () => {
    it("should return correct paths when slugs are provided", async () => {
        const mockSlugs = {
            slugsCZ: ["slug1", "slug2"],
            slugsSK: ["slug3", "slug4"],
        };

        (fetchSlugs as jest.Mock).mockResolvedValue(mockSlugs);

        const query = "test query";
        const result = await generateStaticPathsForSlugs(query);

        const expected = [
            { params: { slug: "slug1" }, locale: "cs" },
            { params: { slug: "slug2" }, locale: "cs" },
            { params: { slug: "slug3" }, locale: "sk" },
            { params: { slug: "slug4" }, locale: "sk" },
        ];

        expect(fetchSlugs).toHaveBeenCalledWith(query);
        expect(result).toEqual({
            paths: expected,
            fallback: true,
        });
    });
});
