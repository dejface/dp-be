import { ArticlePreview } from "@/src/types/Article";
import { Product } from "@/src/types/Product";
import { LegalDocument } from "./Types";

export interface StaticProps<T, U> {
    params: {
        page: T;
    };
    locale: U;
}

interface PageProps<T> {
    fetchedItems: T[] | null;
    totalPages: number;
    currentPage: number;
}

export type ArticlePageProps = PageProps<ArticlePreview>;
export type ProductPageProps = PageProps<Product> & {
    path?: string;
};

export interface LegalDocumentPageProps {
    document: LegalDocument;
}
