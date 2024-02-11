import { generatePaths } from "./generatePaths";
import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";

describe("generatePaths", () => {
    it("should correctly create paths", () => {
        const totalPages = 3;
        const expectedOutput = [
            { params: { page: "2" }, locale: LOCALE_CS },
            { params: { page: "2" }, locale: LOCALE_SK },
            { params: { page: "3" }, locale: LOCALE_CS },
            { params: { page: "3" }, locale: LOCALE_SK },
        ];

        const result = generatePaths(totalPages);

        expect(result).toEqual(expectedOutput);
    });

    it("should return an empty array when totalPages is less than 2", () => {
        const totalPages = 1;
        const expectedOutput: any[] = [];

        const result = generatePaths(totalPages);

        expect(result).toEqual(expectedOutput);
    });
});
