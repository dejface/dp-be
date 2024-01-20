import {
    ArticlePreview,
    ArticlePreviewFromQuery,
} from "@/src/types/ArticlePreview";

export const ArticlePreviewParser = (
    data: ArticlePreviewFromQuery,
): ArticlePreview[] | null => {
    if (data.data.articleCollection.items.length !== 3) {
        return null;
    }

    return data.data.articleCollection.items;
};
