import {
    ArticlePreview,
    ArticlePreviewFromQuery,
    ArticlePreviewItem,
} from "@/src/types/ArticlePreview";

const transformItem = (item: ArticlePreviewItem): ArticlePreview => ({
    id: item.sys.id,
    title: item.title,
    perex: item.perex,
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
): ArticlePreview[] | null => {
    const items = data.data.articleCollection.items;

    if (
        (isHomepage && hasExactlyThreeItems(items)) ||
        (!isHomepage && hasAtLeastOneItem(items))
    ) {
        return items.map(transformItem);
    } else {
        return null;
    }
};
