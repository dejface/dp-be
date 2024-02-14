import { ProductImage } from "@/src/types/Types";

export type ProductPreviewFromQuery = {
    total: number;
    items: ProductPreview[];
};

export type ProductFromQuery = {
    items: Product[];
};

export type ProductPreview = {
    title: string;
    slug: string;
    image: ProductImage;
    shortDescription: string;
    price: number;
    topProduct: boolean;
    category: {
        sys: {
            id: number;
        };
        title: string;
    };
    lastPiecesText: string | null;
};

export type Product = ProductPreview & {
    description: string;
};

export type TopProduct = {
    title: string;
    slug: string;
    image: ProductImage;
};
