import { generateStaticPropsForSlugs } from "@/src/utils/generateStaticPropsForSlugs";
import { fetchSlugs } from "@/src/api/fetch";

jest.mock("@/api/fetch", () => ({
    fetchSlugs: jest.fn(),
}));

describe("generateStaticPropsForSlugs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns props with parsed content and merged slugs on successful fetch", async () => {
        const mockData = { data: "Mock data" };
        const mockFetchFunction = jest.fn().mockResolvedValue(mockData);
        const mockSlugsResponse = {
            slugsCZ: ["slug-cz-1", "slug-cz-2"],
            slugsSK: ["slug-sk-1", "slug-sk-2"],
        };
        (fetchSlugs as jest.Mock).mockResolvedValue(mockSlugsResponse);

        const result = await generateStaticPropsForSlugs(
            mockFetchFunction,
            "query-string",
        );

        expect(mockFetchFunction).toHaveBeenCalled();
        expect(fetchSlugs).toHaveBeenCalledWith("query-string");
        expect(result).toEqual({
            props: {
                parsedContent: mockData.data,
                slugs: [
                    { cs: "slug-cz-1", sk: "slug-sk-1" },
                    { cs: "slug-cz-2", sk: "slug-sk-2" },
                ],
            },
            revalidate: 1,
        });
    });

    it("returns notFound when fetchFunction returns null", async () => {
        const mockFetchFunction = jest.fn().mockResolvedValue(null);
        (fetchSlugs as jest.Mock).mockResolvedValue({
            slugsCZ: [],
            slugsSK: [],
        });

        const result = await generateStaticPropsForSlugs(
            mockFetchFunction,
            "query-string",
        );

        expect(result).toEqual({ notFound: true });
    });

    it("handles mismatched lengths of slugsCZ and slugsSK arrays gracefully", async () => {
        const mockData = { data: "Mock data for mismatch" };
        const mockFetchFunction = jest.fn().mockResolvedValue(mockData);
        const mockSlugsResponse = {
            slugsCZ: ["slug-cz-1", "slug-cz-2", "slug-cz-3"],
            slugsSK: ["slug-sk-1", "slug-sk-2"],
        };
        (fetchSlugs as jest.Mock).mockResolvedValue(mockSlugsResponse);

        const result = await generateStaticPropsForSlugs(
            mockFetchFunction,
            "query-mismatch",
        );

        expect(result).toEqual({
            props: {
                parsedContent: mockData.data,
                slugs: [
                    { cs: "slug-cz-1", sk: "slug-sk-1" },
                    { cs: "slug-cz-2", sk: "slug-sk-2" },
                    { cs: "slug-cz-3", sk: undefined },
                ],
            },
            revalidate: 1,
        });
    });
});
