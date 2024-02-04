import { SupportedLocale } from "@/src/types/Types";

export const ArticlePreviewQuery = (
    limit: number,
    locale: SupportedLocale,
    skip = 0,
) => `{
  articleCollection(limit: ${limit}, skip: ${skip}, order: published_DESC, locale: "${locale}") {
    total,
    items {
        sys {
            id
        }
        slug,
        title,
        perex,
        published,
        readTime,
        previewImage {
            url
            width
            height
        }
    }
  }
}`;
