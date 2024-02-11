import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { ArticlePreview } from "@/src/types/ArticlePreview";
import { Product, ProductPreview } from "@/src/types/ProductPreview";
import { ArticleContent } from "@/src/types/Article";

export type SupportedLocale = typeof LOCALE_CS | typeof LOCALE_SK;

export type SlugPair = {
    cs: string;
    sk: string;
};

export type Image = {
    url: string;
    description: string;
    width: number;
    height: number;
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
export type ProductPageProps = PageProps<ProductPreview>;

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
