import { TopProductQuery } from "@/src/queries/TopProductQuery";
import { FetchOptions, getFetchOptions } from "@/src/api/fetchOptions";
import { HpTopImagesQuery } from "@/src/queries/HpTopImagesQuery";
import { InstaPost } from "@/src/types/InstaPost";
import { InstaPostsQuery } from "@/src/queries/InstaPostsQuery";
import { Review } from "@/src/types/Review";
import { ReviewsQuery } from "@/src/queries/ReviewsQuery";
import { ArticlePreviewQuery } from "@/src/queries/ArticlePreviewQuery";
import { ArticleCollectionTotalQuery } from "@/src/queries/ArticleCollectionTotalQuery";
import { ArticleContentBySlugQuery } from "@/src/queries/ArticleContentBySlugQuery";
import { Data, SupportedLocale, TransformedData } from "@/src/types/Types";
import { ProductCollectionTotalQuery } from "@/src/queries/ProductCollectionTotalQuery";
import { ProductPreviewQuery } from "@/src/queries/ProductPreviewQuery";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import { ProductPreviewParser } from "@/src/parsers/ProductPreviewParser";
import { ProductBySlugQuery } from "@/src/queries/ProductBySlugQuery";
import { ItemDetailParser } from "@/src/parsers/ItemDetailParser";
import { HpTopImageParser } from "@/src/parsers/HpTopImageParser";
import { ArticleContent, ArticlePreviewItem } from "@/src/types/Article";
import {
    ProductCartInfo,
    ProductPreviewWithImageGallery,
    ProductWithImageGallery,
    TopProduct,
} from "@/src/types/Product";
import {
    ArticleFetchResponse,
    AssetFetchResponse,
    CategoryFetchResponse,
    FetchResponse,
    InstaPostFetchResponse,
    ProductFetchResponse,
    ReviewFetchResponse,
    SlugsFetchResponse,
} from "@/src/types/Fetch";
import { HpTopImage } from "@/src/types/Image";
import { LocalizedSlugs } from "@/src/types/Slugs";
import { ProductByCategoryTotalQuery } from "@/src/queries/ProductByCategoryTotalQuery";
import { getTransformedImageGallery } from "@/src/utils/getTransformedImageGallery";
import { ProductsInCartQuery } from "@/src/queries/ProductsInCartQuery";

const ContentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;

const makeFetch = async <T>(
    fetchOptions: FetchOptions,
): Promise<FetchResponse<T> | null> => {
    try {
        const response = await fetch(ContentfulUrl, fetchOptions);
        return response.json();
    } catch (error) {
        console.error("An error occurred while fetching:", error);
        return null;
    }
};

export const fetchTopProducts = async (
    locale: SupportedLocale,
): Promise<TopProduct[] | null> => {
    const fetchOptions = getFetchOptions(TopProductQuery(locale));
    const response =
        await makeFetch<ProductFetchResponse<ProductPreviewWithImageGallery[]>>(
            fetchOptions,
        );

    if (response && response.data.productCollection.items.length >= 3) {
        return getTransformedImageGallery(
            response.data.productCollection.items,
        );
    } else {
        return null;
    }
};

export const fetchHpTopImages = async (): Promise<
    [HpTopImage, HpTopImage] | null
> => {
    const fetchOptions = getFetchOptions(HpTopImagesQuery);
    const response = await makeFetch<AssetFetchResponse>(fetchOptions);
    if (!response) return null;
    return HpTopImageParser({
        items: response.data.assetCollection.items,
    });
};

export const fetchInstaPosts = async (
    locale: SupportedLocale,
): Promise<InstaPost[] | null> => {
    const fetchOptions = getFetchOptions(InstaPostsQuery(locale));
    const response = await makeFetch<InstaPostFetchResponse>(fetchOptions);
    if (
        !response ||
        response.data.instaPostCollection.items.length < 4 ||
        response.data.instaPostCollection.items.length > 6
    ) {
        return null;
    }
    return response.data.instaPostCollection.items;
};

export const fetchReviews = async (
    locale: SupportedLocale,
): Promise<Review[] | null> => {
    const fetchOptions = getFetchOptions(ReviewsQuery(locale));
    const response = await makeFetch<ReviewFetchResponse>(fetchOptions);
    if (!response || response.data.reviewCollection.items.length < 3) {
        return null;
    }
    return response.data.reviewCollection.items;
};

export const fetchArticlePreviews = async (
    limit: number,
    locale: SupportedLocale,
    page = 1,
    isHomepage = false,
): Promise<TransformedData | null> => {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? limit * skipMultiplier : 0;
    const fetchOptions = getFetchOptions(
        ArticlePreviewQuery(limit, locale, skip),
    );
    const response =
        await makeFetch<ArticleFetchResponse<ArticlePreviewItem[]>>(
            fetchOptions,
        );
    if (!response) return null;
    return ArticlePreviewParser(
        {
            total: response.data.articleCollection.total,
            items: response.data.articleCollection.items,
        },
        isHomepage,
    );
};

export const fetchTotalArticleCount = async (): Promise<number> => {
    const fetchOptions = getFetchOptions(ArticleCollectionTotalQuery);
    const response =
        await makeFetch<ArticleFetchResponse<number>>(fetchOptions);
    if (!response) return 0;
    return response.data.articleCollection.total;
};

export const fetchSlugs = async (query: string): Promise<LocalizedSlugs> => {
    const fetchOptions = getFetchOptions(query);
    const response = await makeFetch<SlugsFetchResponse>(fetchOptions);
    if (!response) return { slugsCZ: [], slugsSK: [] };
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
    const response =
        await makeFetch<ArticleFetchResponse<ArticleContent[]>>(fetchOptions);
    if (!response) return null;
    return ItemDetailParser({
        items: response.data.articleCollection.items,
    });
};

export const fetchTotalProductCount = async (): Promise<number> => {
    const fetchOptions = getFetchOptions(ProductCollectionTotalQuery);
    const response =
        await makeFetch<ProductFetchResponse<number>>(fetchOptions);
    if (!response) return 0;
    return response.data.productCollection.total;
};

export const fetchProductPreviews = async (
    limit: number,
    locale: SupportedLocale,
    page = 1,
    categoryId?: string,
): Promise<TransformedData | null> => {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? limit * skipMultiplier : 0;
    const fetchOptions = getFetchOptions(
        ProductPreviewQuery(limit, locale, skip, categoryId),
    );
    const response =
        await makeFetch<ProductFetchResponse<ProductPreviewWithImageGallery[]>>(
            fetchOptions,
        );
    if (!response) return null;
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
    const response =
        await makeFetch<ProductFetchResponse<ProductWithImageGallery[]>>(
            fetchOptions,
        );
    if (!response) return null;
    return ItemDetailParser({
        items: response.data.productCollection.items,
    });
};

export const fetchTotalProductCountByCategory = async (
    categoryId: string,
): Promise<number> => {
    const fetchOptions = getFetchOptions(
        ProductByCategoryTotalQuery(categoryId),
    );
    const response = await makeFetch<CategoryFetchResponse>(fetchOptions);
    if (!response) return 0;
    return response.data.categoryCollection.items[0].linkedFrom.entryCollection
        .total;
};

export const fetchProductInCartLocalizedInfo = async (
    ids: string[],
    locale: SupportedLocale,
): Promise<ProductCartInfo[] | null> => {
    const fetchOptions = getFetchOptions(ProductsInCartQuery(ids, locale));
    const response =
        await makeFetch<ProductFetchResponse<ProductCartInfo[]>>(fetchOptions);
    if (!response) return null;
    return response.data.productCollection.items;
};
