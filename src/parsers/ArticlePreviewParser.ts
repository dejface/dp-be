import {
    ArticlePreview,
    ArticlePreviewFromQuery,
    ArticlePreviewItem,
} from "@/src/types/ArticlePreview";
import { TransformedData } from "@/src/types/Types";

const transformItem = (item: ArticlePreviewItem): ArticlePreview => ({
    id: item.sys.id,
    title: item.title,
    perex: item.perex,
    slug: item.slug,
    previewImage: item.previewImage,
    published: item.published,
    readTime: item.readTime,
});

const hasAtLeastOneItem = (items: ArticlePreviewItem[]): boolean =>
    items.length >= 1;

const hasExactlyThreeItems = (items: ArticlePreviewItem[]): boolean =>
    items.length === 3;

export const ArticlePreviewParser = (
    data: ArticlePreviewFromQuery,
    isHomepage = false,
): TransformedData | null => {
    const items = data.items;

    if (
        (isHomepage && hasExactlyThreeItems(items)) ||
        (!isHomepage && hasAtLeastOneItem(items))
    ) {
        return {
            data: items.map(transformItem),
            total: data.total,
        };
    } else {
        return null;
    }
};
