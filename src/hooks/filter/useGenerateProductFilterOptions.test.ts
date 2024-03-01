import useGenerateProductFilterOptions from "./useGenerateProductFilterOptions";
import {
    CATEGORY,
    BESTSELLER,
    NEW_ARRIVAL,
    EARRINGS_ID,
    RINGS_ID,
    NECKLACES_ID,
} from "@/src/utils/constants";
import { renderHook } from "@testing-library/react";

jest.mock("@/hooks/useTranslation", () => {
    return {
        useTranslation: () => {
            const mockTranslations: { [key: string]: string } = {
                "app.earrings": "Earrings",
                "app.rings": "Rings",
                "app.necklaces": "Necklaces",
                "app.best_seller": "Best Seller",
                "app.new_arrivals": "New Arrivals",
            };
            return (key: string) => mockTranslations[key] || key;
        },
    };
});

describe("useGenerateProductFilterOptions hook", () => {
    it("returns correct filter options", () => {
        const { result } = renderHook(() => useGenerateProductFilterOptions());
        const filterOptions = result.current;

        expect(filterOptions["Earrings"]).toEqual({
            type: CATEGORY,
            id: EARRINGS_ID,
            name: "Earrings",
        });

        expect(filterOptions["Rings"]).toEqual({
            type: CATEGORY,
            id: RINGS_ID,
            name: "Rings",
        });

        expect(filterOptions["Necklaces"]).toEqual({
            type: CATEGORY,
            id: NECKLACES_ID,
            name: "Necklaces",
        });

        expect(filterOptions["Best Seller"]).toEqual({
            type: BESTSELLER,
            id: "bestSeller",
            name: "Best Seller",
        });

        expect(filterOptions["New Arrivals"]).toEqual({
            type: NEW_ARRIVAL,
            id: "newArrival",
            name: "New Arrivals",
        });
    });
});
