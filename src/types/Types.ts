import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { ArticleContent, ArticlePreview } from "@/src/types/Article";
import { InstaPost } from "@/src/types/InstaPost";
import { Review } from "@/src/types/Review";
import { Product, ProductPreview } from "@/src/types/Product";

export type SupportedLocale = typeof LOCALE_CS | typeof LOCALE_SK;

export type SlugPair = {
    cs: string;
    sk: string;
};

type Image = {
    url: string;
    width: number;
    height: number;
};

export type ProductImage = Image & {
    description: string;
};

export type HpTopImage = Image & {
    title: string;
};

export interface PaginatedStaticProps {
    params: {
        page: number;
    };
    locale: SupportedLocale;
}

export interface StaticPathsWithLocale {
    params: {
        page: string;
    };
    locale: string;
}

export interface SlugProps {
    params: {
        slug: string;
        slugs: SlugPair[];
    };
    locale: SupportedLocale;
}

interface PageProps<T> {
    fetchedItems: T[] | null;
    totalPages: string;
    currentPage: string;
}

export type ArticlePageProps = PageProps<ArticlePreview>;
export type ProductPageProps = PageProps<Product>;

export type TransformedData = {
    data: ArticlePreview[] | ProductPreview[];
    total: number;
};

export type LocalizedSlugs = {
    slugsCZ: string[];
    slugsSK: string[];
};

export type Data = {
    data: ArticleContent | Product;
};

interface Collection<T> {
    total: number;
    items: T;
}

export type FetchResponse<T> = T;

export type ProductFetchResponse<T> = FetchResponse<{
    data: { productCollection: Collection<T> };
}>;

export type ArticleFetchResponse<T> = FetchResponse<{
    data: { articleCollection: Collection<T> };
}>;

export type AssetFetchResponse = FetchResponse<{
    data: { assetCollection: Collection<HpTopImage[]> };
}>;

export type InstaPostFetchResponse = FetchResponse<{
    data: { instaPostCollection: Collection<InstaPost[]> };
}>;

export type ReviewFetchResponse = FetchResponse<{
    data: { reviewCollection: Collection<Review[]> };
}>;

export type SlugsFetchResponse = FetchResponse<{
    data: {
        slugsCZ: Collection<{ slug: string }[]>;
        slugsSK: Collection<{ slug: string }[]>;
    };
}>;
