import React from "react";
import { render } from "@testing-library/react";
import BlogPageLayout from "@/src/components/page/BlogPageLayout";
import { screen } from "@testing-library/react";

jest.mock("@/components/ShowMore", () => {
    return function DummyShowMore() {
        return <div data-testid="show-more">ShowMore</div>;
    };
});

jest.mock("@/hooks/useTranslation", () => {
    return {
        useTranslation: () => {
            const mockTranslations: { [key: string]: string } = {
                "app.blog.minutes": "min.",
            };
            return (key: string) => mockTranslations[key] || key;
        },
    };
});

jest.mock("@/utils/getDate", () => ({
    getDate: jest.fn(() => "26.02.2024"),
}));

const generateArticles = (count: number = 1) => {
    const articles = [];
    for (let i = 0; i < count; i++) {
        articles.push({
            id: `${i}`,
            title: `Test Article`,
            published: "26.02.2023",
            readTime: 5,
            perex: `This is a test article.`,
            slug: `test-article`,
            previewImage: {
                url: "/test-image.jpg",
                width: 500,
                height: 500,
            },
        });
    }
    return articles;
};

describe("BlogPageArticlePreview", () => {
    it("renders correctly multiple articles", () => {
        render(<BlogPageLayout articles={generateArticles(3)} />);

        const articles = screen.queryAllByText("Test Article");
        expect(articles).toHaveLength(3);
    });

    describe("Individual parts of article preview", () => {
        beforeEach(() => {
            render(<BlogPageLayout articles={generateArticles()} />);
        });

        test("correct layout", () => {
            expect(
                document.querySelector(".column.is-one-third"),
            ).toBeInTheDocument();
            expect(
                document.querySelector(
                    ".card.is-shadowless.blog__article-preview",
                ),
            ).toBeInTheDocument();
            expect(document.querySelector(".card-image")).toBeInTheDocument();
            expect(document.querySelector(".card-content")).toBeInTheDocument();
        });

        test("correct title", () => {
            const articleTitle = screen.getByText("Test Article");
            expect(articleTitle).toBeInTheDocument();
            expect(articleTitle).toHaveClass(
                "title is-size-6 has-text-centered",
            );
            expect(articleTitle.parentElement).toHaveClass(
                "blog__article-preview__title",
            );
            expect(articleTitle.parentElement?.parentElement).toHaveClass(
                "blog__article-preview__overlay",
            );
        });

        test("correct image", () => {
            const image = screen.getByRole("img");

            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute("src", "/test-image.jpg");
            expect(image).toHaveAttribute("alt", "alt");
            expect(image).toHaveAttribute("width", "500");
            expect(image).toHaveAttribute("height", "500");
            expect(image.parentElement).toHaveClass("image is-2by1");
        });

        test("correct date", () => {
            const date = screen.getByText("26.02.2024");
            expect(date).toBeInTheDocument();
            expect(date.parentElement).toHaveClass("level-left is-italic");
            expect(date.parentElement?.parentElement).toHaveClass(
                "level is-mobile",
            );
        });

        test("correct read time", () => {
            const readTime = screen.getByText("5 min.");
            expect(readTime).toBeInTheDocument();
            expect(readTime).toHaveClass("is-italic");
            expect(readTime.parentElement).toHaveClass("level-right");
        });

        test("correct icon", () => {
            const icon = screen.getByTestId("clock-icon");

            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass("mr-1");
            expect(icon.parentElement).toHaveClass("level-right");
        });

        test("correct perex", () => {
            const perex = screen.getByText("This is a test article.");

            expect(perex).toBeInTheDocument();
            expect(perex).toHaveClass("blog__article-preview__perex");
        });

        test("correct show more", () => {
            const showMore = screen.getByTestId("show-more");

            expect(showMore).toBeInTheDocument();
            expect(showMore.parentElement).toHaveClass(
                "is-flex is-align-items-center mt-4",
            );
        });
    });
});