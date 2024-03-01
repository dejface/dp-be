import { ArticlePreview } from "@/src/types/Article";

export const generateMockArticlePreview = (
    articleId: string,
): ArticlePreview => {
    return {
        id: articleId,
        title: "Test Article",
        perex: "This is a test article.",
        previewImage: {
            url: "/test-image.jpg",
            width: 500,
            height: 300,
        },
        slug: "test-article",
        published: "2021-01-01T00:00:00.000Z",
        readTime: 5,
    };
};
