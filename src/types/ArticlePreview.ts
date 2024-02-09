export type ArticlePreviewFromQuery = {
    total: number;
    items: ArticlePreviewItem[];
};

export type ArticleProperties = {
    title: string;
    perex: string;
    slug: string;
    previewImage: {
        url: string;
        width: number;
        height: number;
    };
};

type ArticleBlogPage = ArticleProperties & {
    published: string;
    readTime: number;
};

export type ArticlePreviewItem = ArticleProperties &
    ArticleBlogPage & {
        sys: {
            id: string;
        };
    };

export type ArticlePreview = ArticleProperties &
    ArticleBlogPage & {
        id: string;
    };
