import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { getCurrentPathParts } from "@/src/utils/getCurrentPathParts";

describe("getCurrentPathParts", () => {
    let originalLocation: Location;
    beforeAll(() => {
        const originalLocation = window.location;
        // @ts-ignore
        delete window.location;
        window.location = { ...originalLocation, pathname: "/" };
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    it("returns the correct path parts for an URL without locale", () => {
        Object.defineProperty(window.location, "pathname", {
            writable: true,
            value: "/blog/article/slug",
        });

        const pathParts = getCurrentPathParts();
        expect(pathParts).toEqual(["blog", "article", "slug"]);
    });

    it("strips out the locale prefix and returns the correct path parts", () => {
        Object.defineProperty(window.location, "pathname", {
            writable: true,
            value: `/${LOCALE_CS}/blog/article/slug`,
        });

        let pathParts = getCurrentPathParts();
        expect(pathParts).toEqual(["blog", "article", "slug"]);

        window.location.pathname = `/${LOCALE_SK}/blog/article/slug`;

        pathParts = getCurrentPathParts();
        expect(pathParts).toEqual(["blog", "article", "slug"]);
    });

    it("returns an empty array for a path with only a locale", () => {
        Object.defineProperty(window.location, "pathname", {
            writable: true,
            value: `/${LOCALE_CS}/`,
        });

        let pathParts = getCurrentPathParts();
        expect(pathParts).toEqual([]);

        window.location.pathname = `/${LOCALE_SK}/`;

        pathParts = getCurrentPathParts();
        expect(pathParts).toEqual([]);
    });

    it("returns an empty array for a domain root path", () => {
        window.location.pathname = "/";

        const pathParts = getCurrentPathParts();
        expect(pathParts).toEqual([]);
    });
});
