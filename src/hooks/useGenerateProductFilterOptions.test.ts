import {
    CATEGORY,
    BESTSELLER,
    NEW_ARRIVAL,
    EARRINGS_ID,
    RINGS_ID,
    NECKLACES_ID,
    BRACELETS_ID,
} from "@/src/utils/constants";
import { renderHook } from "@testing-library/react";
import useGenerateProductFilterOptions from "@/src/hooks/useGenerateProductFilterOptions";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../test/helpers/useTransMock");
    return useTransMock({
        "app.earrings": "Earrings",
        "app.rings": "Rings",
        "app.necklaces": "Necklaces",
        "app.bracelets": "Bracelets",
        "app.best_seller": "Best Seller",
        "app.new_arrivals": "New Arrivals",
    });
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

        expect(filterOptions["Bracelets"]).toEqual({
            type: CATEGORY,
            id: BRACELETS_ID,
            name: "Bracelets",
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
