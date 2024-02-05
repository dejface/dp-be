import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { ArticlePreview } from "@/src/types/ArticlePreview";

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

export interface BlogProps {
    parsedArticlePreviews: ArticlePreview[] | null;
    totalPages: string;
    currentPage: string;
}
