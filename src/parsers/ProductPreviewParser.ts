import { ProductPreviewFromQuery, ProductPreview } from "@/src/types/Product";
import { TransformedData } from "@/src/types/Types";
import { getTransformedImageGallery } from "@/src/utils/getTransformedImageGallery";

export const ProductPreviewParser = (
    data: ProductPreviewFromQuery,
): TransformedData | null => {
    const items = data.items;

    if (items.length >= 1) {
        const transformedItems: ProductPreview[] =
            getTransformedImageGallery(items);

        return {
            data: transformedItems,
            total: data.total,
        };
    } else {
        return null;
    }
};
