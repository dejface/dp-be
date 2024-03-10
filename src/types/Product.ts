import { ProductImage } from "@/src/types/Image";

type BaseProduct = {
    sys: {
        id: string;
    };
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

export type ProductPreview = BaseProduct & {
    shortDescription: string;
    price: number;
    topProduct: boolean;
    lastPiecesText?: string;
    bestSeller?: boolean;
    newArrival?: boolean;
};

export type Product = ProductPreview & {
    description: string;
};

export type TopProduct = BaseProduct;

export type ProductPreviewFromQuery = {
    total: number;
    items: (ProductPreview & WithImageGalleryCollection)[];
};

export type ProductFromQuery = {
    items: (Product & WithImageGalleryCollection)[];
};

export interface WithImageGalleryCollection {
    imageGalleryCollection: {
        items: ProductImage[];
    };
}

export type ProductPreviewWithImageGallery = ProductPreview &
    WithImageGalleryCollection;

export type ProductWithImageGallery = Product & WithImageGalleryCollection;
