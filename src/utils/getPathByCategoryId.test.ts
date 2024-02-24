import { getPathByCategoryId } from "./getPathByCategoryId";
import {
    EARRINGS_ID,
    EARRINGS_PATH,
    NECKLACES_ID,
    NECKLACES_PATH,
    RINGS_ID,
    RINGS_PATH,
} from "@/src/utils/constants";

describe("getPathByCategoryId", () => {
    it("should return the correct path for earrings", () => {
        const result = getPathByCategoryId(EARRINGS_ID);
        expect(result).toEqual(EARRINGS_PATH);
    });

    it("should return the correct path for necklaces", () => {
        const result = getPathByCategoryId(NECKLACES_ID);
        expect(result).toEqual(NECKLACES_PATH);
    });

    it("should return the correct path for rings", () => {
        const result = getPathByCategoryId(RINGS_ID);
        expect(result).toEqual(RINGS_PATH);
    });

    it("should return an empty string for an unknown category", () => {
        const result = getPathByCategoryId("unknown");
        expect(result).toEqual("");
    });
});
