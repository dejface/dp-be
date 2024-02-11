import { getTotalPages } from "@/src/utils/getTotalPages";

describe("getTotalPages", () => {
    it("returns the correct number of pages when total is perfectly divisible by limit", () => {
        expect(getTotalPages(100, 10)).toBe(10);
    });

    it("rounds up to the next whole number when total is not divisible by limit", () => {
        expect(getTotalPages(101, 10)).toBe(11);
    });

    it("returns 0 when total is 0", () => {
        expect(getTotalPages(0, 10)).toBe(0);
    });

    it("returns 1 when limit is greater than total", () => {
        expect(getTotalPages(9, 10)).toBe(1);
    });
});
