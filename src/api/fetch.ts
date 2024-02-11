import { TopProductQuery } from "@/src/queries/TopProductQuery";
import { TopProductFromQuery } from "@/src/types/TopProduct";
import { FetchOptions, getFetchOptions } from "@/src/api/fetchOptions";
import { HpTopImagesQuery } from "@/src/queries/HpTopImagesQuery";
import { HpTopImageFromQuery } from "@/src/types/HpTopImage";
import { InstaPostFromQuery } from "@/src/types/InstaPost";
import { InstaPostsQuery } from "@/src/queries/InstaPostsQuery";
import { ReviewFromQuery } from "@/src/types/Review";
import { ReviewsQuery } from "@/src/queries/ReviewsQuery";
import { ArticlePreviewQuery } from "@/src/queries/ArticlePreviewQuery";
import { ArticleCollectionTotalQuery } from "@/src/queries/ArticleCollectionTotalQuery";
import { ArticleContentBySlugQuery } from "@/src/queries/ArticleContentBySlugQuery";
import {
    Data,
    LocalizedSlugs,
    SupportedLocale,
    TransformedData,
} from "@/src/types/Types";
import { ProductCollectionTotalQuery } from "@/src/queries/ProductCollectionTotalQuery";
import { ProductPreviewQuery } from "@/src/queries/ProductPreviewQuery";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import { ProductPreviewParser } from "@/src/parsers/ProductPreviewParser";
import { ProductFromQuery } from "@/src/types/ProductPreview";
import { ProductBySlugQuery } from "@/src/queries/ProductBySlugQuery";
import { ItemDetailParser } from "@/src/parsers/ItemDetailParser";

const ContentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;

const makeFetch = async (fetchOptions: FetchOptions) => {
    return await fetch(ContentfulUrl, fetchOptions).then((response) =>
        response.json(),
    );
};

export const fetchTopProducts = async (
    locale: SupportedLocale,
): Promise<TopProductFromQuery> => {
    const fetchOptions = getFetchOptions(TopProductQuery(locale));
    return await makeFetch(fetchOptions);
};

export const fetchHpTopImages = async (): Promise<HpTopImageFromQuery> => {
    const fetchOptions = getFetchOptions(HpTopImagesQuery);
    return makeFetch(fetchOptions);
};

export const fetchInstaPosts = async (
    locale: SupportedLocale,
): Promise<InstaPostFromQuery> => {
    const fetchOptions = getFetchOptions(InstaPostsQuery(locale));
    return makeFetch(fetchOptions);
};

export const fetchReviews = async (
    locale: SupportedLocale,
): Promise<ReviewFromQuery> => {
    const fetchOptions = getFetchOptions(ReviewsQuery(locale));
    return makeFetch(fetchOptions);
};

export const fetchArticlePreviews = async (
    limit: number,
    locale: SupportedLocale,
    page = 1,
): Promise<TransformedData | null> => {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? limit * skipMultiplier : 0;
    const fetchOptions = getFetchOptions(
        ArticlePreviewQuery(limit, locale, skip),
    );
    const response = await makeFetch(fetchOptions);
    return ArticlePreviewParser({
        total: response.data.articleCollection.total,
        items: response.data.articleCollection.items,
    });
};

export const fetchTotalArticleCount = async (): Promise<number> => {
    const fetchOptions = getFetchOptions(ArticleCollectionTotalQuery);
    const response = await makeFetch(fetchOptions);
    return response.data.articleCollection.total;
};

export const fetchSlugs = async (query: string): Promise<LocalizedSlugs> => {
    const fetchOptions = getFetchOptions(query);
    const response = await makeFetch(fetchOptions);
    return {
        slugsCZ: response.data.slugsCZ.items.map(
            (item: { slug: string }) => item.slug,
        ),
        slugsSK: response.data.slugsSK.items.map(
            (item: { slug: string }) => item.slug,
        ),
    };
};

export const fetchArticleBySlug = async (
    slug: string,
    locale: SupportedLocale,
): Promise<Data | null> => {
    const fetchOptions = getFetchOptions(
        ArticleContentBySlugQuery(slug, locale),
    );
    const response = await makeFetch(fetchOptions);
    return ItemDetailParser({
        items: response.data.articleCollection.items,
    });
};

export const fetchTotalProductCount = async (): Promise<number> => {
    const fetchOptions = getFetchOptions(ProductCollectionTotalQuery);
    const response = await makeFetch(fetchOptions);
    return response.data.productCollection.total;
};

export const fetchProductPreviews = async (
    limit: number,
    locale: SupportedLocale,
    page = 1,
): Promise<TransformedData | null> => {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? limit * skipMultiplier : 0;
    const fetchOptions = getFetchOptions(
        ProductPreviewQuery(limit, locale, skip),
    );
    const response = await makeFetch(fetchOptions);
    return ProductPreviewParser({
        total: response.data.productCollection.total,
        items: response.data.productCollection.items,
    });
};

export const fetchProductBySlug = async (
    slug: string,
    locale: SupportedLocale,
): Promise<Data | null> => {
    const fetchOptions = getFetchOptions(ProductBySlugQuery(slug, locale));
    const response = await makeFetch(fetchOptions);
    return ItemDetailParser({
        items: response.data.productCollection.items,
    });
};
