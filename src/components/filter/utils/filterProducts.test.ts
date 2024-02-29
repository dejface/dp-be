import { filterProducts } from "./filterProducts";
import { BESTSELLER, CATEGORY, NEW_ARRIVAL } from "@/src/utils/constants";
import { generateMockProduct } from "../../../../test/helpers/generateMockProduct";

const mockProducts = [
    generateMockProduct("productId1", "category1", undefined, false, false),
    generateMockProduct("productId2", "category1", undefined, true, false),
    generateMockProduct("productId3", "category2", undefined, true, true),
    generateMockProduct("productId4", "category3", undefined, false, true),
];

describe("filterProducts", () => {
    it("filters by category", () => {
        const filterCriteria = {
            type: CATEGORY,
            id: "category1",
            name: "category1",
        };

        const filtered = filterProducts(mockProducts, filterCriteria);
        expect(filtered).toHaveLength(2);
        expect(filtered).toEqual([mockProducts[0], mockProducts[1]]);
    });

    it("filters by bestSeller", () => {
        const filterCriteria = {
            type: BESTSELLER,
            id: "bestseller",
            name: "bestseller",
        };

        const filtered = filterProducts(mockProducts, filterCriteria);
        expect(filtered).toHaveLength(2);
        expect(filtered).toEqual([mockProducts[1], mockProducts[2]]);
    });

    it("filters by newArrival", () => {
        const filterCriteria = {
            type: NEW_ARRIVAL,
            id: "newArrival",
            name: "newArrival",
        };

        const filtered = filterProducts(mockProducts, filterCriteria);
        expect(filtered).toHaveLength(2);
        expect(filtered).toEqual([mockProducts[2], mockProducts[3]]);
    });

    it("returns all products if no filter criteria is provided", () => {
        const filtered = filterProducts(mockProducts, null);
        expect(filtered).toHaveLength(4);
        expect(filtered).toEqual(mockProducts);
    });

    it("returns all products if filter criteria with unknown type provided", () => {
        const filterCriteria = {
            type: "unknown",
            id: "unknown",
            name: "unknown",
        };

        const filtered = filterProducts(mockProducts, filterCriteria);
        expect(filtered).toHaveLength(4);
        expect(filtered).toEqual(mockProducts);
    });
});
