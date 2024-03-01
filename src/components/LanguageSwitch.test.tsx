import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useLanguage } from "../hooks/useTranslation";
import { useArticleSlugs } from "@/src/hooks/useArticleSlugsWithLocale";
import LanguageSwitch from "../components/LanguageSwitch";
import { useProductSlugs } from "@/src/hooks/useProductSlugsWithLocale";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/hooks/useTranslation", () => ({
    useLanguage: jest.fn(),
}));

jest.mock("@/hooks/useArticleSlugsWithLocale", () => ({
    useArticleSlugs: jest.fn(),
}));

jest.mock("@/hooks/useProductSlugsWithLocale", () => ({
    useProductSlugs: jest.fn(),
}));

const mockSetLanguage = jest.fn();
const mockPush = jest.fn();

describe("LanguageSwitch", () => {
    beforeAll(() => {
        Object.defineProperty(window, "location", {
            value: {
                pathname: "",
            },
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        (useLanguage as jest.Mock).mockImplementation(() => [
            "cs",
            mockSetLanguage,
        ]);
    });

    it("changes language on select change", () => {
        (useArticleSlugs as jest.Mock).mockImplementation(() => [[]]);
        (useProductSlugs as jest.Mock).mockImplementation(() => [[]]);
        (useRouter as jest.Mock).mockImplementation(() => ({
            push: mockPush,
        }));

        const { getByTestId } = render(<LanguageSwitch />);

        const select = getByTestId("language-select");
        fireEvent.change(select, { target: { value: "sk" } });

        expect(mockSetLanguage).toHaveBeenCalledWith("sk");
        expect(mockPush).toHaveBeenCalled();
    });

    it.each([
        ["/cs/blog/article/slug-czech", [], [], "/sk/blog/article/"],
        ["/cs/products/earrings/slug-czech", [], [], "/sk/products/earrings/"],
        [
            "/cs/blog/article/slug-czech",
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            [],
            "/sk/blog/article/slug-slovak",
        ],
        [
            "/cs/products/earrings/slug-czech",
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            [],
            "/sk/products/earrings/slug-slovak",
        ],
        [
            "/cs/blog/article/slug-czech",
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            "/sk/blog/article/slug-slovak",
        ],
        [
            "/cs/products/earrings/slug-czech",
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            "/sk/products/earrings/slug-slovak",
        ],
        [
            "/cs/products/rings/slug-czech",
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            "/sk/products/rings/slug-slovak",
        ],
        [
            "/cs/products/necklaces/slug-czech",
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            "/sk/products/necklaces/slug-slovak",
        ],
        [
            "/cs/products/unknown/slug-czech",
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            [{ cs: "slug-czech", sk: "slug-slovak" }],
            "/sk/products/unknown/slug-czech",
        ],
    ])(
        "changes language and updates the slug correctly",
        (path: string, articleSlugs, productsSlugs, expectedPath) => {
            window.location.pathname = path;
            (useArticleSlugs as jest.Mock).mockImplementation(() => [
                articleSlugs,
            ]);
            (useProductSlugs as jest.Mock).mockImplementation(() => [
                productsSlugs,
            ]);

            (useRouter as jest.Mock).mockImplementation(() => ({
                push: mockPush,
                asPath: path,
            }));

            const { getByTestId } = render(<LanguageSwitch />);

            const select = getByTestId("language-select");
            fireEvent.change(select, { target: { value: "sk" } });

            expect(mockSetLanguage).toHaveBeenCalledWith("sk");
            expect(mockPush).toHaveBeenCalledWith(expectedPath, expectedPath, {
                locale: "sk",
            });
        },
    );
});
