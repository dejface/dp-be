import { ArticleBySlugFromQuery, ArticleContent } from "@/src/types/Article";

export const ArticleParser = (
    data: ArticleBySlugFromQuery,
): ArticleContent | null => {
    if (data.data.articleCollection.items.length !== 1) {
        return null;
    }

    return data.data.articleCollection.items[0];
};
