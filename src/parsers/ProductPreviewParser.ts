import { ProductPreviewFromQuery } from "@/src/types/Product";
import { TransformedData } from "@/src/types/Types";

export const ProductPreviewParser = (
    data: ProductPreviewFromQuery,
): TransformedData | null => {
    const items = data.items;

    if (items.length >= 1) {
        return {
            data: items,
            total: data.total,
        };
    } else {
        return null;
    }
};
