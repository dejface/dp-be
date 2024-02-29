import { render, screen } from "@testing-library/react";
import ArticlePreview from "@/src/components/homepage/blog/ArticlePreview";

jest.mock("@/hooks/useTranslation", () => {
    return {
        useLanguage: () => ["cs"],
    };
});

const mockArticle = {
    title: "Test Article",
    perex: "This is a test article.",
    previewImage: {
        url: "/test-image.jpg",
        width: 500,
        height: 300,
    },
    slug: "test-article",
};

describe("ArticlePreview", () => {
    beforeEach(() => {
        render(<ArticlePreview {...mockArticle} />);
    });

    test("correct link and class", () => {
        const link = screen.getByRole("link");
        expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            "/blog/article/test-article",
        );
        expect(link.parentElement).toHaveClass(
            "column is-one-third is-relative",
        );
    });

    test("correct image", () => {
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "/test-image.jpg");
        expect(image).toHaveAttribute("alt", "Test Article preview image");
        expect(image).toHaveAttribute("width", "500");
        expect(image).toHaveAttribute("height", "300");
        expect(image.parentElement).toHaveClass("image is-3by2");
        expect(image.parentElement?.parentElement).toHaveClass("blog__image");
    });

    test("correct title", () => {
        const title = screen.getByText("Test Article");
        expect(title).toHaveClass(
            "blog__title has-text-centered has-text-weight-bold is-size-5",
        );
        expect(title.parentElement).toHaveClass("blog__image");
    });

    test("correct perex", () => {
        expect(screen.getByText("This is a test article.")).toHaveClass(
            "blog__perex pt-4",
        );
    });
});
