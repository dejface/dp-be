import { getTotalPages } from "@/src/utils/getTotalPages";
import { generatePaths } from "@/src/utils/generatePaths";
import { generateStaticPaths } from "@/src/utils/generateStaticPaths";

jest.mock("@/utils/getTotalPages");
jest.mock("@/utils/generatePaths");

describe("generateStaticPaths", () => {
    it("should correctly generate static paths", async () => {
        const mockFetchFunction = jest.fn().mockResolvedValue(100);
        const mockLimit = 10;
        const mockTotalPages = 10;
        const mockPaths = [{ params: { page: "1" }, locale: "en" }];

        (getTotalPages as jest.Mock).mockReturnValue(mockTotalPages);
        (generatePaths as jest.Mock).mockReturnValue(mockPaths);

        const result = await generateStaticPaths(mockFetchFunction, mockLimit);

        expect(mockFetchFunction).toHaveBeenCalled();
        expect(getTotalPages).toHaveBeenCalledWith(100, mockLimit);
        expect(generatePaths).toHaveBeenCalledWith(mockTotalPages);
        expect(result).toEqual({
            paths: mockPaths,
            fallback: false,
        });
    });
});
