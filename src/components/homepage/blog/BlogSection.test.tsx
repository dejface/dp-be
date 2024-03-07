import { render, screen } from "@testing-library/react";
import BlogSection from "@/src/components/homepage/blog/BlogSection";
import { generateMockArticlePreview } from "../../../../test/helpers/generateMockArticlePreview";

jest.mock("@/contexts/TransContext", () => {
    return {
        useTranslation: () => {
            const mockTranslations: { [key: string]: string } = {
                "app.blog": "Blog",
                "app.blog.show_more": "Show more",
            };
            return (key: string) => mockTranslations[key] || key;
        },
        useLanguage: () => ["cs"],
    };
});

jest.mock("@/components/homepage/blog/ArticlePreview", () => {
    return function DummyArticlePreview() {
        return <div>Article preview here</div>;
    };
});

describe("BlogSection", () => {
    test("correct layout classes", () => {
        render(<BlogSection previews={[generateMockArticlePreview("1")]} />);

        expect(
            document.querySelector(
                ".blog__section.is-paddingless.pt-6.pb-6.px-1-mobile",
            ),
        ).toBeInTheDocument();
        expect(
            document.querySelector(".level.is-mobile.is-align-items-baseline"),
        ).toBeInTheDocument();
    });

    test("correct title", () => {
        render(<BlogSection previews={[generateMockArticlePreview("1")]} />);

        const title = screen.getByText("Blog");
        expect(title).toHaveClass("title is-3 has-text-weight-bold");
        expect(title.parentElement).toHaveClass("level-left");
    });

    test("correct show more link", () => {
        render(<BlogSection previews={[generateMockArticlePreview("1")]} />);

        const link = screen.getByText("Show more");
        expect(link).toHaveAttribute("href", "/blog");
        expect(link.parentElement).toHaveClass("show-more");
        expect(link.parentElement?.parentElement).toHaveClass("level-right");
    });

    test("correct count of previews components", () => {
        render(
            <BlogSection
                previews={[
                    generateMockArticlePreview("1"),
                    generateMockArticlePreview("2"),
                    generateMockArticlePreview("3"),
                ]}
            />,
        );
        const previews = screen.getAllByText("Article preview here");

        expect(previews).toHaveLength(3);
        expect(previews[0].parentElement).toHaveClass("columns is-multiline");
    });
});
