import { Image } from "@/src/types/Types";

export type ProductPreviewFromQuery = {
    total: number;
    items: ProductPreview[];
};

export type ProductPreview = {
    title: string;
    slug: string;
    image: Image;
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
