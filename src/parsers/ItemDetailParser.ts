import { ProductFromQuery, ProductWithImageGallery } from "@/src/types/Product";
import { ProductImage } from "@/src/types/Image";
import { ArticleBySlugFromQuery } from "@/src/types/Article";
import { Data } from "@/src/types/Types";
import { getTransformedImageGallery } from "@/src/utils/getTransformedImageGallery";

export const ItemDetailParser = (
    data: ProductFromQuery | ArticleBySlugFromQuery,
): Data | null => {
    if (data.items.length !== 1) {
        return null;
    }

    if ("imageGalleryCollection" in data.items[0]) {
        const transformedItem = getTransformedImageGallery([data.items[0]]);

        return {
            data: transformedItem[0],
        };
    }

    return {
        data: data.items[0],
    };
};
