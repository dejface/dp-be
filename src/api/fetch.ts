import { TopProductQuery } from "@/src/queries/TopProductQuery";
import { TopProductFromQuery } from "@/src/types/TopProduct";
import { FetchOptions, getFetchOptions } from "@/src/api/fetchOptions";
import { HpTopImagesQuery } from "@/src/queries/HpTopImagesQuery";
import { HpTopImageFromQuery } from "@/src/types/HpTopImage";
import { InstaPostFromQuery } from "@/src/types/InstaPost";
import { InstaPostsQuery } from "@/src/queries/InstaPostsQuery";
import { ReviewFromQuery } from "@/src/types/Review";
import { ReviewsQuery } from "@/src/queries/ReviewsQuery";
import { ArticlePreviewFromQuery } from "@/src/types/ArticlePreview";
import { ArticlePreviewQuery } from "@/src/queries/ArticlePreviewQuery";
import { ARTICLE_COUNT_BLOG_PAGE_LIMIT } from "@/src/utils/constants";
import { ArticleCollectionTotalQuery } from "@/src/queries/ArticleCollectionTotalQuery";
import { ArticleSlugsQuery } from "@/src/queries/ArticleSlugsQuery";
import { ArticleBySlugFromQuery } from "@/src/types/Article";
import { ArticleContentBySlugQuery } from "@/src/queries/ArticleContentBySlugQuery";

const ContentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;

const makeFetch = async (fetchOptions: FetchOptions) => {
    return await fetch(ContentfulUrl, fetchOptions).then((response) =>
        response.json(),
    );
};

export const fetchTopProducts = async (): Promise<TopProductFromQuery> => {
    const fetchOptions = getFetchOptions(TopProductQuery);
    return await makeFetch(fetchOptions);
};

export const fetchHpTopImages = async (): Promise<HpTopImageFromQuery> => {
    const fetchOptions = getFetchOptions(HpTopImagesQuery);
    return makeFetch(fetchOptions);
};

export const fetchInstaPosts = async (): Promise<InstaPostFromQuery> => {
    const fetchOptions = getFetchOptions(InstaPostsQuery);
    return makeFetch(fetchOptions);
};

export const fetchReviews = async (): Promise<ReviewFromQuery> => {
    const fetchOptions = getFetchOptions(ReviewsQuery);
    return makeFetch(fetchOptions);
};

export const fetchArticlePreviews = async (
    limit = 0,
    page = 1,
): Promise<ArticlePreviewFromQuery> => {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
        skipMultiplier > 0 ? ARTICLE_COUNT_BLOG_PAGE_LIMIT * skipMultiplier : 0;
    const fetchOptions = getFetchOptions(ArticlePreviewQuery(limit, skip));
    return makeFetch(fetchOptions);
};

export const fetchTotalArticleCount = async (): Promise<number> => {
    const fetchOptions = getFetchOptions(ArticleCollectionTotalQuery);
    const response = await makeFetch(fetchOptions);
    return response.data.articleCollection.total;
};

export const fetchArticleSlugs = async (): Promise<string[]> => {
    const fetchOptions = getFetchOptions(ArticleSlugsQuery);
    const response = await makeFetch(fetchOptions);
    return response.data.articleCollection.items.map(
        (item: { slug: string }) => item.slug,
    );
};

export const fetchArticleBySlug = async (
    slug: string,
): Promise<ArticleBySlugFromQuery> => {
    const fetchOptions = getFetchOptions(ArticleContentBySlugQuery(slug));
    return makeFetch(fetchOptions);
};
