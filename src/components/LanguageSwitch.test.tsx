import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useLanguage } from "../hooks/useTranslation";
import { useArticleSlugs } from "@/src/hooks/useArticleSlugsWithLocale";
import LanguageSwitch from "../components/LanguageSwitch";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/hooks/useTranslation", () => ({
    useLanguage: jest.fn(),
}));

jest.mock("@/hooks/useArticleSlugsWithLocale", () => ({
    useArticleSlugs: jest.fn(),
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
        (useRouter as jest.Mock).mockImplementation(() => ({
            push: mockPush,
        }));

        const { getByTestId } = render(<LanguageSwitch />);

        const select = getByTestId("language-select");
        fireEvent.change(select, { target: { value: "sk" } });

        expect(mockSetLanguage).toHaveBeenCalledWith("sk");
        expect(mockPush).toHaveBeenCalled();
    });

    it("changes language and updates the slug correctly", () => {
        window.location.pathname = "/cs/blog/article/slug-czech";
        (useArticleSlugs as jest.Mock).mockImplementation(() => [
            [{ cs: "slug-czech", sk: "slug-slovak" }],
        ]);

        (useRouter as jest.Mock).mockImplementation(() => ({
            push: mockPush,
            asPath: "/cs/blog/article/slug-czech",
        }));

        const { getByTestId } = render(<LanguageSwitch />);

        const select = getByTestId("language-select");
        fireEvent.change(select, { target: { value: "sk" } });

        expect(mockSetLanguage).toHaveBeenCalledWith("sk");
        expect(mockPush).toHaveBeenCalledWith(
            "/sk/blog/article/slug-slovak",
            "/sk/blog/article/slug-slovak",
            { locale: "sk" },
        );
    });
});
