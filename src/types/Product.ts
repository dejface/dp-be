import { ProductImage } from "@/src/types/Image";

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
            id: string;
        };
        title: string;
    };
    lastPiecesText?: string;
    bestSeller?: boolean;
    newArrival?: boolean;
};

export type Product = ProductPreview & {
    description: string;
};

export type TopProduct = {
    title: string;
    slug: string;
    image: ProductImage;
};
