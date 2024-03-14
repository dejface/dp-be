import useOverflowStyle from "@/src/hooks/useOverflowStyle";
import { renderHook } from "@testing-library/react";

describe("useOverflowStyle hook", () => {
    let originalOverflowX: string;
    let originalOverflowY: string;

    beforeEach(() => {
        originalOverflowX = document.documentElement.style.overflowX;
        originalOverflowY = document.documentElement.style.overflowY;
        document.documentElement.style.overflowX = "hidden";
        document.documentElement.style.overflowY = "hidden";
    });

    afterEach(() => {
        document.documentElement.style.overflowX = originalOverflowX;
        document.documentElement.style.overflowY = originalOverflowY;
    });

    it("sets overflow style to visible", () => {
        renderHook(() => useOverflowStyle());
        expect(document.documentElement.style.overflowX).toBe("visible");
        expect(document.documentElement.style.overflowY).toBe("visible");
    });

    it("resets overflow style on unmount", () => {
        const { unmount } = renderHook(() => useOverflowStyle());

        unmount();

        expect(document.documentElement.style.overflowX).toBe("hidden");
        expect(document.documentElement.style.overflowY).toBe("hidden");
    });
});
