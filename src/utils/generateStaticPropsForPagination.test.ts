import { generateStaticPropsForPagination } from "@/src/utils/generateStaticPropsForPagination";
import { getTotalPages } from "@/src/utils/getTotalPages";

jest.mock("@/utils/getTotalPages");

describe("generateStaticProps", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return props with fetchedItems and pagination details on successful fetch", async () => {
        const mockFetchFunction = jest.fn().mockResolvedValue({
            total: 100,
            data: [{ id: 1, name: "Item 1" }],
        });
        const mockTotalPages = 10;
        const locale = "cs";
        (getTotalPages as jest.Mock).mockReturnValue(mockTotalPages);

        const result = await generateStaticPropsForPagination(
            () => mockFetchFunction(locale, 1, 10),
            1,
            10,
        );

        expect(mockFetchFunction).toHaveBeenCalledWith("cs", 1, 10);
        expect(getTotalPages).toHaveBeenCalledWith(100, 10);
        expect(result).toEqual({
            props: {
                fetchedItems: [{ id: 1, name: "Item 1" }],
                totalPages: mockTotalPages,
                currentPage: 1,
            },
        });
    });

    it("should return notFound when fetchFunction returns null", async () => {
        const mockFetchFunction = jest.fn().mockResolvedValue(null);
        const result = await generateStaticPropsForPagination(
            () => mockFetchFunction("cs", 1, 10),
            1,
            10,
        );
        expect(result).toEqual({ notFound: true });
    });
});
