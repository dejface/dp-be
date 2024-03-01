import { ProductImage } from "@/src/types/Image";

export type ProductPreviewFromQuery = {
    total: number;
    items: ProductPreviewWithImageGallery[];
};

export type ProductFromQuery = {
    items: Product[];
};

export type ProductPreview = {
    title: string;
    slug: string;
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
    imageGallery: ProductImage[];
};

export type TopProduct = {
    title: string;
    slug: string;
    category: {
        sys: {
            id: string;
        };
        title: string;
    };
    imageGallery: ProductImage[];
};

export type ProductPreviewWithImageGallery = ProductPreview & {
    imageGalleryCollection: {
        items: ProductImage[];
    };
};

export type TopProductWithImageGallery = ProductPreview & {
    imageGalleryCollection: {
        items: ProductImage[];
    };
};
