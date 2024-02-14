import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { ArticleContent, ArticlePreview } from "@/src/types/Article";
import { Product, ProductPreview } from "@/src/types/Product";

export type SupportedLocale = typeof LOCALE_CS | typeof LOCALE_SK;

export type TransformedData = {
    data: ArticlePreview[] | ProductPreview[];
    total: number;
};

export type Data = {
    data: ArticleContent | Product;
};
