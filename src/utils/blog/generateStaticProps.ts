import { fetchArticlePreviews } from "@/src/api/fetch";
import { ARTICLE_COUNT_BLOG_PAGE_LIMIT } from "@/src/utils/constants";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import { getTotalPages } from "@/src/utils/getTotalPages";
import { SupportedLocale } from "@/src/types/Types";

export const generateStaticProps = async (
    locale: SupportedLocale,
    page: number,
) => {
    const articlePreviews = await fetchArticlePreviews(
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
        locale,
        page,
    );
    const parsedArticlePreviews = articlePreviews
        ? ArticlePreviewParser(articlePreviews)
        : null;
    const totalPages = getTotalPages(
        articlePreviews.data.articleCollection.total,
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    );

    return {
        props: {
            parsedArticlePreviews,
            totalPages,
            currentPage: page,
        },
    };
};
