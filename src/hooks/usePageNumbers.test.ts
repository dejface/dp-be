import usePageNumbers from "./usePageNumbers";
import { renderHook } from "@testing-library/react";

describe("usePageNumbers", () => {
    it.each([
        [3, 1, [1, 2, 3]],
        [5, 1, [1, 2, -1, 5]],
        [5, 5, [1, -2, 4, 5]],
        [9, 3, [1, 2, 3, 4, -2, 9]],
        [5, 3, [1, 2, 3, 4, 5]],
    ])(
        "returns correct page numbers for total pages: %d, selected page: %d",
        (totalPages, selectedPage, expected) => {
            const { result } = renderHook(() =>
                usePageNumbers(totalPages, selectedPage),
            );
            expect(result.current).toEqual(expected);
        },
    );
});
